import { useContext, useEffect, useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";
import { useGetImagesPullSecret } from "../hooks/useGetImagePullSecret";
import { useGetDeploymentImages } from "../hooks/useGetDeploymentImages";
import { useGetDeploymentImagesTag } from "../hooks/useGetDeploymentImagesTag";
import Select from "react-select";
import UserContext from "../context/UserContext";
import { useGetMembers } from "../hooks/useGetMembers";
import { useGetNamespace } from "../hooks/useGetNamespace";
import { useGetAddons } from "../hooks/useGetAddons";
import { useAddDeployment } from "../hooks/useAddDeployment";
import useNotification from "../hooks/useNotification";

const AddDeploymentModal = ({ toggle }) => {
  const addDeploymentMutation = useAddDeployment();

  const [addonServices, setAddonServices] = useState([{ key: "", value: "" }]);
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);

  const { userRole, user } = useContext(UserContext);
  const [projectOwner, setProjectOwner] = useState(null);
  useEffect(() => {
    if (userRole !== "admin" && user) {
      setProjectOwner(user.username);
    }
  }, [userRole, user]);
  // this options is for admin only
  const { data: membersData, isSuccess: membersDataIsSuccess } =
    useGetMembers(userRole);
  const membersOptions = membersData?.data?.map((member) => ({
    value: member.username,
    label: member.username,
  }));

  const { notifyWarning } = useNotification();

  const serviceNameRef = useRef(null);
  const [images, setImages] = useState(null);
  const [tags, setTags] = useState(null);
  const [imagesPullSecret, setImagesPullSecret] = useState(null);
  const [namespace, setNamespace] = useState(null);
  const targetPortRef = useRef(null);
  const storageRef = useRef(null);
  const replicasRef = useRef(null);

  const { data: imagesPullSecretData, isSuccess: imagesPullSecretIsSuccess } =
    useGetImagesPullSecret();
  const imagesPullSecretOptions = imagesPullSecretData?.data
    ?.filter((secret) => secret.namespace === namespace)
    .map((secret) => ({
      value: { secret: secret.name, namespace: secret.namespace },
      label: secret.name,
    }));

  const { data: deploymentImagesData, isSuccess: deploymentImagesIsSuccess } =
    useGetDeploymentImages();
  const imagesOptions = deploymentImagesData?.data?.flatMap((project) =>
    project.images.map((image) => ({
      value: {
        gitlabProjectID: project.gitlabProjectId,
        imagesID: image.id,
        imagesLocation: image.location,
      },
      label: image.location,
    }))
  );

  const {
    data: deploymentImagesTagData,
    isSuccess: deploymentImagesTagIsSuccess,
  } = useGetDeploymentImagesTag(images?.gitlabProjectID, images?.imagesID);
  const tagsOptions = deploymentImagesTagData?.data?.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));

  const { data: addonsData, isSuccess: addonsIsSuccess } = useGetAddons();
  const addonsKeyOptions = addonsData?.data?.map((addon) => ({
    value: addon.serviceNetworkName,
    label: addon.serviceNetworkName,
  }));

  const { data: namespaceData, isSuccess: namespaceIsSuccess } =
    useGetNamespace(userRole);
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

  // to handle limit input for storage and replicas
  const handleLimitInput = (min, max) => {
    return (e) => {
      const inputValue = e.target.value;

      if (inputValue < min) {
        e.target.value = min;
      } else if (inputValue > max) {
        e.target.value = max;
      }
    };
  };

  const handleInputTargetPortsChange = () => {
    let inputValue = targetPortRef.current.value;
    inputValue = inputValue.replace(/\D/g, "");
    if (inputValue.length > 4) {
      inputValue = inputValue.slice(0, 4);
    }
    targetPortRef.current.value = inputValue;
  };

  const handleInputDeploymentServiceName = () => {
    // no whitespace not symbol except - and all lowercase
    let inputValue = serviceNameRef.current.value;
    inputValue = inputValue.replace(/\s/g, "");
    inputValue = inputValue.replace(/[^a-zA-Z0-9-]/g, "");
    inputValue = inputValue.toLowerCase();
    serviceNameRef.current.value = inputValue;
  };

  // to handle add input for envVariables and addonServices
  const handleAddInput = (stateSetter) => {
    stateSetter((prevState) => [...prevState, { key: "", value: "" }]);
  };

  // to handle delete input for envVariables and addonServices
  const handleDeleteInput = (index, stateSetter) => {
    stateSetter((prevState) => {
      const newState = [...prevState];
      newState.splice(index, 1);
      return newState;
    });
  };

  // to handle input change for envVariables and addonServices
  const handleInputChange = (index, fieldName, value, stateSetter) => {
    const regexPattern = /^[-._a-zA-Z][-._a-zA-Z0-9]*$/; // regex pattern for key input
    stateSetter((prevState) => {
      const newState = [...prevState];
      if (fieldName === "key") {
        if (value === "" || regexPattern.test(value)) {
          newState[index][fieldName] = value;
        }
      } else newState[index][fieldName] = value;
      return newState;
    });
  };

  // to render input for envVariables and addonServices
  const renderInputs = (state, stateSetter, inputType, inputName) => {
    return state.map((item, index) => (
      <div key={index} className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={item.key}
          name={inputName + "key_" + (index + 1)}
          onChange={(e) =>
            handleInputChange(index, "key", e.target.value, stateSetter)
          }
          disabled={addDeploymentMutation.isLoading}
          placeholder="KEY"
          className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
        />
        <div className="flex space-x-2">
          {inputType === "select" ? (
            <Select
              options={addonsKeyOptions}
              isDisabled={!addonsIsSuccess || addDeploymentMutation.isLoading}
              className="w-full"
              value={
                addonServices[index].value
                  ? addonsKeyOptions.find(
                      (option) => option.value === addonServices.value
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
              onChange={(selectedOption) => {
                handleInputChange(
                  index,
                  "value",
                  selectedOption ? selectedOption.value : null,
                  stateSetter
                );
              }}
            />
          ) : (
            <input
              type="text"
              name={inputName + "value_" + (index + 1)}
              value={item.value}
              disabled={addDeploymentMutation.isLoading}
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value, stateSetter)
              }
              placeholder="Value"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
            />
          )}
          <button
            type="button"
            title="Delete Input"
            disabled={addDeploymentMutation.isLoading}
            onClick={() => handleDeleteInput(index, stateSetter)}
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

  // to handle validation and submit form
  const handleSubmitDeployment = () => {
    // Validate other input fields
    if (
      !projectOwner ||
      !serviceNameRef.current.value ||
      !images ||
      !tags ||
      !imagesPullSecret ||
      !namespace ||
      !storageRef.current.value ||
      !replicasRef.current.value ||
      !targetPortRef.current.value
    ) {
      notifyWarning("Please fill all the required fields.");
      return;
    }

    // Create the data object with all the values
    const data = {
      projectOwner: projectOwner,
      serviceName: serviceNameRef.current.value,
      image: images.imagesLocation,
      imageTag: tags,
      imagePullSecrets: imagesPullSecret.secret,
      namespace: namespace,
      pvcSize: Number(storageRef.current.value),
      replica: Number(replicasRef.current.value),
      env: {},
      targetPort: Number(targetPortRef.current.value),
    };

    // Validate and process envVariables
    const validEnvVariables = envVariables
      .map((variable) => {
        const trimmedKey = variable.key.trim();
        const trimmedValue = variable.value.trim();
        if (trimmedKey === "" && trimmedValue === "") {
          // Skip empty entry
          return null;
        }
        // check if there is a key and value
        else if (trimmedKey === "" || trimmedValue === "") {
          return "invalid"; // Return null to indicate an issue
        }
        return { [trimmedKey]: trimmedValue };
      })
      .filter(Boolean); // Filter out null entries

    // Validate and process addonServices
    const validAddonServices = addonServices
      .map((service) => {
        const trimmedKey = service.key.trim();
        const trimmedValue = service.value.trim();
        if (trimmedKey === "" && trimmedValue === "") {
          // Skip empty entry
          return null;
        }
        // check if there is a key and value
        else if (trimmedKey === "" || trimmedValue === "") {
          return "invalid"; // Return null to indicate an issue
        }
        return { [trimmedKey]: trimmedValue };
      })
      .filter(Boolean); // Filter out null entries

    // Check if there are any invalid entries
    if (validAddonServices.includes("invalid")) {
      notifyWarning("Addons Services must have both key and value.");
      return;
    }
    if (validEnvVariables.includes("invalid")) {
      notifyWarning("Env Variable must have both key and value.");
      return;
    }

    // Add envVariables and addonServices to the env object if not empty
    if (validEnvVariables.length > 0 || validAddonServices.length > 0) {
      data.env = {
        ...data.env,
        ...Object.assign({}, ...validEnvVariables, ...validAddonServices),
      };
    }

    addDeploymentMutation.mutate({ data });
  };

  // to handle reset all value after mutation is success
  useEffect(() => {
    if (addDeploymentMutation.isSuccess) {
      // reset all value
      if (userRole === "admin") setProjectOwner(null);
      serviceNameRef.current.value = "";
      setImages(null);
      setTags(null);
      setImagesPullSecret(null);
      setNamespace(null);
      targetPortRef.current.value = "";
      storageRef.current.value = "";
      replicasRef.current.value = "";
      setAddonServices([{ key: "", value: "" }]);
      setEnvVariables([{ key: "", value: "" }]);
      addDeploymentMutation.reset();
    }
  }, [addDeploymentMutation, userRole]);

  const handleCloseModal = () => {
    // Check if any of the input fields have been modified
    const isModified =
      (userRole === "admin" && projectOwner) ||
      serviceNameRef.current.value ||
      images !== null ||
      tags !== null ||
      imagesPullSecret !== null ||
      namespace !== null ||
      targetPortRef.current.value ||
      envVariables.some((envVar) => envVar.key || envVar.value) ||
      addonServices.some(
        (addonService) => addonService.key || addonService.value
      );

    if (isModified) {
      if (window.confirm("Are you sure you want to close this modal?")) {
        // Reset all values
        if (userRole === "admin") setProjectOwner(null);
        serviceNameRef.current.value = "";
        setImages(null);
        setTags(null);
        setImagesPullSecret(null);
        setNamespace(null);
        targetPortRef.current.value = "";
        storageRef.current.value = "";
        replicasRef.current.value = "";
        setAddonServices([{ key: "", value: "" }]);
        setEnvVariables([{ key: "", value: "" }]);
        toggle(); // Close the modal
      }
    } else {
      toggle(); // Close the modal
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Add Deployment</h1>
          </div>
          <button
            title="Close"
            onClick={handleCloseModal}
            disabled={addDeploymentMutation.isLoading}
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
                isDisabled={
                  !membersDataIsSuccess || addDeploymentMutation.isLoading
                }
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
          {/* service name */}
          <div className="flex flex-col">
            <label htmlFor="service_name" className="font-semibold">
              Service Name
            </label>
            <input
              type="text"
              ref={serviceNameRef}
              disabled={addDeploymentMutation.isLoading}
              id="service_name"
              placeholder="Project Name"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              onChange={handleInputDeploymentServiceName}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
            {/* images */}
            <div className="flex flex-col">
              <label htmlFor="images" className="font-semibold">
                Images
              </label>
              <Select
                options={imagesOptions}
                inputId="images"
                isDisabled={
                  !deploymentImagesIsSuccess || addDeploymentMutation.isLoading
                }
                value={
                  images
                    ? imagesOptions.find((option) => option.value === images)
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
                onChange={(e) => {
                  setImages(e ? e.value : null);
                  setTags(null);
                }}
              />
            </div>
            {/* Tags */}
            <div className="flex flex-col">
              <label htmlFor="tags" className="font-semibold">
                Tags
              </label>
              <Select
                options={tagsOptions}
                inputId="tags"
                isDisabled={
                  !deploymentImagesTagIsSuccess ||
                  !deploymentImagesIsSuccess ||
                  addDeploymentMutation.isLoading
                }
                value={
                  tags
                    ? tagsOptions.find((option) => option.value === tags)
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
                onChange={(e) => setTags(e ? e.value : null)}
              />
            </div>
            {/* namespace */}
            <div className="flex flex-col">
              <label htmlFor="namespace" className="font-semibold">
                Namespace
              </label>
              <Select
                options={namespaceOptions}
                inputId="namespace"
                isDisabled={
                  (!namespaceIsSuccess && userRole === "admin") ||
                  addDeploymentMutation.isLoading
                }
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
                onChange={(e) => {
                  setNamespace(e ? e.value : null);
                  setImagesPullSecret(null);
                }}
              />
            </div>
            {/* images pull secret */}
            <div className="flex flex-col">
              <label htmlFor="images_pull_secret" className="font-semibold">
                Images Pull Secret
              </label>
              <Select
                options={imagesPullSecretOptions}
                inputId="images_pull_secret"
                isDisabled={
                  !imagesPullSecretIsSuccess || addDeploymentMutation.isLoading
                }
                value={
                  imagesPullSecret
                    ? imagesPullSecretOptions.find(
                        (option) => option.value === imagesPullSecret
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
                onChange={(e) => setImagesPullSecret(e ? e.value : null)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* storage */}
            <div className="flex flex-col">
              <label htmlFor="storage" className="font-semibold">
                Storage
              </label>
              <div className="flex border-2 rounded-lg overflow-hidden">
                <input
                  id="storage"
                  type="number"
                  defaultValue={1}
                  ref={storageRef}
                  placeholder="Storage"
                  className="p-2 rounded-lg outline-none flex-1 w-0"
                  onChange={handleLimitInput(1, 10)}
                  disabled={addDeploymentMutation.isLoading}
                />
                <div className="bg-sky-200 w-10 h-full flex justify-center items-center font-semibold">
                  <p>GB</p>
                </div>
              </div>
            </div>
            {/* replicas */}
            <div className="flex flex-col">
              <label htmlFor="replicas" className="font-semibold">
                Replicas
              </label>
              <input
                type="number"
                id="replicas"
                defaultValue={1}
                ref={replicasRef}
                onChange={handleLimitInput(1, 3)}
                disabled={addDeploymentMutation.isLoading}
                placeholder="Replicas"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
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
                disabled={addDeploymentMutation.isLoading}
                placeholder="Target Port"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
              />
            </div>
          </div>
          {/* Addons Service */}
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold">Addons Services</h1>
            {renderInputs(
              addonServices,
              setAddonServices,
              "select",
              "addons_services_"
            )}
            <button
              title="Add Addons Services"
              className="border-2 flex space-x-2  border-sky-500 w-fit px-4 py-2 rounded-lg text-sky-500 font-semibold hover:bg-sky-500 hover:text-white transition-colors duration-300"
              onClick={() => handleAddInput(setAddonServices)}
              type="button"
              disabled={addDeploymentMutation.isLoading}
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
              <span>Add Addons Services</span>
            </button>
          </div>
          {/* Environment Varible */}
          <div className="flex flex-col space-y-2">
            <h1 className="font-semibold">Environtment Variable</h1>
            {renderInputs(envVariables, setEnvVariables, "text", "env_var_")}
            <button
              title="Add Environtment Variable"
              className="border-2 flex space-x-2  border-sky-500 w-fit px-4 py-2 rounded-lg text-sky-500 font-semibold hover:bg-sky-500 hover:text-white transition-colors duration-300"
              type="button"
              onClick={() => handleAddInput(setEnvVariables)}
              disabled={addDeploymentMutation.isLoading}
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
          {/* save button */}
          <div className="flex justify-end">
            <button
              title="Save Deployment"
              type="button"
              onClick={handleSubmitDeployment}
              className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
              disabled={addDeploymentMutation.isLoading}
            >
              {addDeploymentMutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddDeploymentModal;

AddDeploymentModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};
