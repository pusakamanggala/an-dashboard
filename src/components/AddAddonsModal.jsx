import { useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";

const AddAddonsModal = ({ isOpen, setIsOpen }) => {
  const projectOWner = "username_from_JWT";
  const addonsServiceNameRef = useRef(null);
  const imagesRef = useRef(null);
  const volumeMountPathRef = useRef(null);
  const targetPortRef = useRef(null);
  const namespaceRef = useRef(null);
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);

  const handleCloseModal = () => {
    window.confirm(
      "All unsaved changes will be lost if you close this form. Are you sure you ?"
    ) && setIsOpen(false);
    setEnvVariables([{ key: "", value: "" }]);
  };

  const handleInputTargetPortsChange = () => {
    let inputValue = targetPortRef.current.value;
    inputValue = inputValue.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }
    targetPortRef.current.value = inputValue;
  };

  const handleSubmitAddons = () => {
    // Validation
    if (
      !projectOWner ||
      !addonsServiceNameRef.current.value ||
      !imagesRef.current.value ||
      !volumeMountPathRef.current.value ||
      !targetPortRef.current.value ||
      !namespaceRef.current.value
    ) {
      alert("Please fill all input");
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
      projectOWner: projectOWner,
      addonsServiceName: addonsServiceNameRef.current.value,
      images: imagesRef.current.value,
      volumeMountPath: volumeMountPathRef.current.value,
      targetPort: targetPortRef.current.value,
      namespace: namespaceRef.current.value,
      env: env,
    };

    // change this to POST data to API
    console.log(data);
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

  // Function to handle input change for environment variables
  const handleEnvVariableInputChange = (index, fieldName, value) => {
    setEnvVariables((prevState) => {
      const newState = [...prevState];
      newState[index][fieldName] = value;
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
            className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
          />
          <button
            type="button"
            title="Delete Input"
            onClick={() => handleDeleteEnvVariableInput(index)}
            className="text-sky-500"
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
    isOpen && (
      <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
        <div className="h-full w-[564px] bg-white rounded-xl relative flex flex-col">
          {/* title and close button */}
          <div className="flex justify-between items-center px-7 pt-7 pb-3">
            <div className="flex space-x-2 items-center">
              <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
              <h1 className="font-semibold text-lg">Add Addons</h1>
            </div>
            <button title="Close" onClick={handleCloseModal}>
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
              {/* regular user is autofilled, admin can choose project owner */}
              <input
                type="text"
                value={projectOWner}
                disabled
                id="project_owner"
                placeholder="THIS FIELD IS AUTOFILL BY JWT TOKEN VALUE"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* Addons Service Name */}
            <div className="flex flex-col">
              <label htmlFor="addons_service_name" className="font-semibold">
                Addons Service Name
              </label>
              <input
                type="text"
                ref={addonsServiceNameRef}
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
                  placeholder="Target Port"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="namespace" className="font-semibold">
                  Namespaces
                </label>
                <select
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 flex-1"
                  defaultValue={""}
                  id="namespace"
                  ref={namespaceRef}
                >
                  <option value="" disabled>
                    Select Namespaces
                  </option>
                  <option value="1">Select 1</option>
                  <option value="2">Select 2</option>
                </select>
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
                className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

AddAddonsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddAddonsModal;
