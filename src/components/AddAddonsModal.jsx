import { useContext, useEffect, useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";
import { useAddAddons } from "../hooks/useAddAddons";
import { useGetMembers } from "../hooks/useGetMembers";
import UserContext from "../context/UserContext";
import Select from "react-select";
import { useGetNamespace } from "../hooks/useGetNamespace";
import useNotification from "../hooks/useNotification";

const AddAddonsModal = ({ toggleModal }) => {
  const { userRole, user } = useContext(UserContext);
  const [projectOwner, setProjectOwner] = useState(null);
  useEffect(() => {
    if (userRole !== "admin" && user) {
      setProjectOwner(user.username);
    }
  }, [userRole, user]);

  const addonsServiceNameRef = useRef(null);
  const imagesRef = useRef(null);
  const volumeMountPathRef = useRef(null);
  const targetPortRef = useRef(null);
  const [namespace, setNamespace] = useState(null);
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);

  const addAddonsMutation = useAddAddons();

  // this options is for admin only
  const { data: membersData } = useGetMembers(userRole);
  const membersOptions = membersData?.data?.map((member) => ({
    value: member.username,
    label: member.username,
  }));

  const { data: namespaceData } = useGetNamespace(userRole);
  // admin can choose all namespace from endpoint, but user can only choose namespace that they have in their jwt token
  const namespaceOptions =
    userRole === "admin"
      ? (namespaceData?.data?.namespaces || []).map((namespace) => ({
          value: namespace,
          label: namespace,
        }))
      : (user?.namespaces || []).map((namespace) => ({
          value: namespace,
          label: namespace,
        }));

  const handleCloseModal = () => {
    // Check if there are unsaved changes
    if (
      addonsServiceNameRef.current.value ||
      imagesRef.current.value ||
      volumeMountPathRef.current.value ||
      targetPortRef.current.value ||
      namespace ||
      envVariables.some((envVar) => envVar.key || envVar.value) ||
      (userRole === "admin" && projectOwner)
    ) {
      if (
        window.confirm(
          "All unsaved changes will be lost if you close this form. Are you sure you want to continue?"
        )
      ) {
        toggleModal();
        setEnvVariables([{ key: "", value: "" }]);
        if (userRole === "admin") setProjectOwner(null);
        setNamespace(null);
      }
    } else {
      // If there are no unsaved changes, simply close the modal
      toggleModal();
    }
  };

  const handleInputTargetPortsChange = () => {
    let inputValue = targetPortRef.current.value;
    inputValue = inputValue.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }
    targetPortRef.current.value = inputValue;
  };

  const handleInputAddonsServiceNameChange = () => {
    // no whitespace not symbol except - and all lowercase
    let inputValue = addonsServiceNameRef.current.value;
    inputValue = inputValue.replace(/\s/g, "");
    inputValue = inputValue.replace(/[^a-zA-Z0-9-]/g, "");
    inputValue = inputValue.toLowerCase();
    addonsServiceNameRef.current.value = inputValue;
  };
  // notification
  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();

  useEffect(() => {
    if (addAddonsMutation.isLoading) {
      notifyLoading("Adding Addons...");
    } else if (addAddonsMutation.isSuccess) {
      notifySuccess(addAddonsMutation.data.message);
      // reset form
      if (userRole === "admin") setProjectOwner(null);
      addonsServiceNameRef.current.value = "";
      imagesRef.current.value = "";
      volumeMountPathRef.current.value = "";
      targetPortRef.current.value = "";
      setNamespace(null);
      setEnvVariables([{ key: "", value: "" }]);

      addAddonsMutation.reset();
    } else if (addAddonsMutation.isError) {
      notifyError(
        addAddonsMutation.error?.response?.data?.message ||
          "Something went wrong"
      );
      addAddonsMutation.reset();
    }
  }, [addAddonsMutation, notifyError, notifyLoading, notifySuccess, userRole]);

  const handleSubmitAddons = () => {
    // Validation
    if (
      !projectOwner ||
      !addonsServiceNameRef.current.value ||
      !imagesRef.current.value ||
      !volumeMountPathRef.current.value ||
      !targetPortRef.current.value ||
      !namespace
    ) {
      notifyWarning("Please fill in all the required fields");
      return;
    }

    // Validate and build the env object
    const env = {};

    for (let index = 0; index < envVariables.length; index++) {
      const envVar = envVariables[index];
      const key = envVar.key.trim();
      const value = envVar.value.trim();

      if (!key && !value) {
        continue; // Ignore if both key and value are empty
      }

      if (key && !value) {
        alert(`Value is missing for environment variable: ${key}`);
        return; // Exit the function if a value is missing
      }

      if (!key && value) {
        alert(`Key is missing for environment variable with value: ${value}`);
        return; // Exit the function if a key is missing
      }

      env[key] = value;
    }

    const data = {
      projectOwner: projectOwner,
      addonsName: addonsServiceNameRef.current.value,
      images: imagesRef.current.value,
      volumeMounts: volumeMountPathRef.current.value,
      targetPort: parseInt(targetPortRef.current.value, 32),
      namespace: namespace,
      env: env,
    };

    addAddonsMutation.mutate({ data });
  };

  // Function to add a new environment variable input
  const handleAddEnvVariableInput = () => {
    setEnvVariables((prevState) => [...prevState, { key: "", value: "" }]);
  };

  // Function to delete an environment variable input by index
  const handleDeleteEnvVariableInput = (index) => {
    setEnvVariables((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  const handleEnvVariableInputChange = (index, fieldName, value) => {
    const regexPattern = /^[-._a-zA-Z][-._a-zA-Z0-9]*$/;

    setEnvVariables((prevState) => {
      const newState = [...prevState];
      if (fieldName === "key") {
        if (value === "" || regexPattern.test(value)) {
          newState[index][fieldName] = value.trim();
        }
      } else {
        newState[index][fieldName] = value;
      }
      return newState;
    });
  };

  // Function to render input fields for environment variables
  const renderEnvVariableInputs = () => {
    return envVariables.map((item, index) => (
      <div key={index} className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={item.key}
          name={"env_var_key_" + (index + 1)}
          onChange={(e) =>
            handleEnvVariableInputChange(index, "key", e.target.value)
          }
          disabled={addAddonsMutation.isLoading}
          placeholder="KEY"
          className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            name={"env_var_value_" + (index + 1)}
            value={item.value}
            onChange={(e) =>
              handleEnvVariableInputChange(index, "value", e.target.value)
            }
            placeholder="Value"
            disabled={addAddonsMutation.isLoading}
            className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
          />
          <button
            type="button"
            title="Delete Input"
            onClick={() => handleDeleteEnvVariableInput(index)}
            className="text-sky-500"
            disabled={addAddonsMutation.isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Add Addons</h1>
          </div>
          <button
            title="Close"
            onClick={handleCloseModal}
            disabled={addAddonsMutation.isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-sky-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* input */}
        <div className="space-y-5 overflow-y-auto p-7">
          {/* project owner */}
          <div className="flex flex-col">
            <label htmlFor="project_owner" className="font-semibold">
              Project Owner
            </label>
            {userRole === "admin" ? (
              <Select
                options={membersOptions}
                inputId="project_owner"
                isDisabled={addAddonsMutation.isLoading}
                value={
                  projectOwner
                    ? membersOptions.find(
                        (option) => option.value === projectOwner
                      )
                    : null
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderColor: "#d1d5db",
                    borderWidth: "2px",
                    padding: "2px",
                  }),
                }}
                onChange={(e) => setProjectOwner(e ? e.value : null)}
              />
            ) : (
              <input
                type="text"
                value={projectOwner}
                disabled
                id="project_owner"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            )}
          </div>
          {/* Addons Service Name */}
          <div className="flex flex-col">
            <label htmlFor="addons_service_name" className="font-semibold">
              Addons Service Name
            </label>
            <input
              type="text"
              onChange={handleInputAddonsServiceNameChange}
              ref={addonsServiceNameRef}
              disabled={addAddonsMutation.isLoading}
              id="addons_service_name"
              placeholder="Addons Service Name"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          {/* Images */}
          <div className="flex flex-col">
            <label htmlFor="images" className="font-semibold">
              Images
            </label>
            <input
              type="text"
              ref={imagesRef}
              disabled={addAddonsMutation.isLoading}
              id="images"
              placeholder="Images from Docker Hub"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          {/* Volume Mount Path */}
          <div className="flex flex-col">
            <label htmlFor="volume_mount_path" className="font-semibold">
              Volume Mount Path
            </label>
            <input
              type="text"
              ref={volumeMountPathRef}
              disabled={addAddonsMutation.isLoading}
              id="volume_mount_path"
              placeholder="/path/to/volume"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          {/* Target Port */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label htmlFor="target_port" className="font-semibold">
                Target Port
              </label>
              <input
                type="text"
                onChange={handleInputTargetPortsChange}
                id="target_port"
                maxLength={4}
                ref={targetPortRef}
                disabled={addAddonsMutation.isLoading}
                placeholder="Target Port"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="namespace" className="font-semibold">
                Namespaces
              </label>

              <Select
                options={namespaceOptions}
                inputId="namespace"
                isDisabled={addAddonsMutation.isLoading}
                value={
                  namespace
                    ? namespaceOptions.find(
                        (option) => option.value === namespace
                      )
                    : null
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderColor: "#d1d5db",
                    borderWidth: "2px",
                    padding: "2px",
                  }),
                }}
                onChange={(e) => setNamespace(e ? e.value : null)}
              />
            </div>
          </div>
          {/* Environment Varible */}
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold">Environment Variable</h1>
            {renderEnvVariableInputs()}
            <button
              title="Add Environtment Variable"
              className="border-2 flex space-x-2  border-sky-500 w-fit px-4 py-2 rounded-lg text-sky-500 font-semibold hover:bg-sky-500 hover:text-white transition-colors duration-300"
              type="button"
              onClick={handleAddEnvVariableInput}
              disabled={addAddonsMutation.isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Add Environtment Variable</span>
            </button>
          </div>
          {/* Add button */}
          <div className="flex justify-end">
            <button
              title="Add Addons"
              type="button"
              onClick={handleSubmitAddons}
              className={`${
                addAddonsMutation.isLoading
                  ? "bg-sky-400"
                  : "bg-sky-700 hover:bg-sky-950 transition-colors duration-300"
              }  px-3 py-2 rounded-md text-white`}
              disabled={addAddonsMutation.isLoading}
            >
              {addAddonsMutation.isLoading ? "Adding Addons..." : "Add"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

AddAddonsModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default AddAddonsModal;
