import { useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";

const AddDeploymentModal = ({ isOpen, setIsOpen }) => {
  const [addonServices, setAddonServices] = useState([{ key: "", value: "" }]);
  const [envVariables, setEnvVariables] = useState([{ key: "", value: "" }]);

  const projectOwnerRef = useRef(null);
  const serviceNameRef = useRef(null);
  const imagesRef = useRef(null);
  const tagsRef = useRef(null);
  const imagesPullSecretRef = useRef(null);
  const namespaceRef = useRef(null);
  const storageRef = useRef(null);
  const replicasRef = useRef(null);

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
    stateSetter((prevState) => {
      const newState = [...prevState];
      newState[index][fieldName] = value;
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
          placeholder="KEY"
          className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 w-full"
        />
        <div className="flex space-x-2">
          {inputType === "select" ? (
            <select
              onChange={(e) =>
                handleInputChange(index, "value", e.target.value, stateSetter)
              }
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 flex-1"
              defaultValue={""}
              name={inputName + "value_" + (index + 1)}
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="1">Select 1</option>
              <option value="2">Select 2</option>
            </select>
          ) : (
            <input
              type="text"
              name={inputName + "value_" + (index + 1)}
              value={item.value}
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
      !projectOwnerRef.current.value ||
      !serviceNameRef.current.value ||
      !imagesRef.current.value ||
      !tagsRef.current.value ||
      !imagesPullSecretRef.current.value ||
      !namespaceRef.current.value ||
      !storageRef.current.value ||
      !replicasRef.current.value
    ) {
      alert("Please fill all input");
      return;
    }

    // Create the data object with all the values
    const data = {
      devName: projectOwnerRef.current.value,
      serviceName: serviceNameRef.current.value,
      images: imagesRef.current.value,
      imageTag: tagsRef.current.value,
      imagePullSecrets: imagesPullSecretRef.current.value,
      namespace: namespaceRef.current.value,
      pvcSize: storageRef.current.value,
      replicas: replicasRef.current.value,
      env: {},
    };

    // Validate and process envVariables
    const validEnvVariables = envVariables
      .map((variable) => {
        const trimmedKey = variable.key.trim();
        const trimmedValue = variable.value.trim();

        if (trimmedKey === "" && trimmedValue === "") {
          // Skip empty entry
          return null;
        } else if (trimmedKey === "") {
          alert("Environment Variable has an empty key.");
          return null; // Return null to indicate an issue
        } else if (trimmedValue === "") {
          alert("Environment Variable has a key but an empty value.");
          return null; // Return null to indicate an issue
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
        } else if (trimmedKey === "") {
          alert("Addon Service has an empty key.");
          return null; // Return null to indicate an issue
        } else if (trimmedValue === "") {
          alert("Addon Service has a key but an empty value.");
          return null; // Return null to indicate an issue
        }

        return { [trimmedKey]: trimmedValue };
      })
      .filter(Boolean); // Filter out null entries

    // Add envVariables and addonServices to the env object if not empty
    if (validEnvVariables.length > 0 || validAddonServices.length > 0) {
      data.env = {
        ...data.env,
        ...Object.assign({}, ...validEnvVariables, ...validAddonServices),
      };
    }

    // change this to post data to the api
    console.log("Form data:", data);
  };

  const handleCloseModal = () => {
    window.confirm(
      "All unsaved changes will be lost if you close this form. Are you sure you ?"
    ) && setIsOpen(false);
    setAddonServices([{ key: "", value: "" }]);
    setEnvVariables([{ key: "", value: "" }]);
  };

  return (
    isOpen && (
      <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
        <div className="h-full w-[564px] bg-white rounded-xl relative flex flex-col">
          {/* title and close button */}
          <div className="flex justify-between items-center px-7 pt-7 pb-3">
            <div className="flex space-x-2 items-center">
              <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
              <h1 className="font-semibold text-lg">Add Deployment</h1>
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
              <input
                type="text"
                ref={projectOwnerRef}
                required
                id="project_owner"
                placeholder="THIS FIELD IS AUTOFILL BY JWT TOKEN VALUE"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* service name */}
            <div className="flex flex-col">
              <label htmlFor="service_name" className="font-semibold">
                Service Name
              </label>
              <input
                type="text"
                ref={serviceNameRef}
                id="service_name"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* images */}
              <div className="flex flex-col">
                <label htmlFor="images" className="font-semibold">
                  Images
                </label>
                <select
                  name="images"
                  id="images"
                  ref={imagesRef}
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Select Images
                  </option>
                  <option value="1">Images 1</option>
                  <option value="2">Images 2</option>
                </select>
              </div>
              {/* Tags */}
              <div className="flex flex-col">
                <label htmlFor="tags" className="font-semibold">
                  Tags
                </label>
                <select
                  name="tags"
                  ref={tagsRef}
                  id="tags"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Select Tag
                  </option>
                  <option value="1">Select 1</option>
                  <option value="2">Select 1</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* images pull secret */}
              <div className="flex flex-col">
                <label htmlFor="images pull secret" className="font-semibold">
                  Images Pull Secret
                </label>
                <select
                  name="images pull secret"
                  id="images pull secret"
                  ref={imagesPullSecretRef}
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Select Image Pull Secret
                  </option>
                  <option value="1">Select 1</option>
                  <option value="2">Select 1</option>
                </select>
              </div>
              {/* namespace */}
              <div className="flex flex-col">
                <label htmlFor="namespace" className="font-semibold">
                  Namespace
                </label>
                <select
                  name="namespace"
                  ref={namespaceRef}
                  id="namespace"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Select Images
                  </option>
                  <option value="1">Select 1</option>
                  <option value="2">Select 1</option>
                </select>
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
                    ref={storageRef}
                    placeholder="Storage"
                    className="p-2 rounded-lg outline-none flex-1 w-0"
                    onChange={handleLimitInput(1, 10)}
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
                  ref={replicasRef}
                  onChange={handleLimitInput(1, 10)}
                  placeholder="Replicas"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default AddDeploymentModal;

AddDeploymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
