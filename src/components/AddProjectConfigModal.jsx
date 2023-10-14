import { useRef } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";

const AddProjectConfigModal = ({ toggleModal }) => {
  const projectNameRef = useRef(null);
  const namespaceRef = useRef(null);
  const repositoryNameRef = useRef(null);
  const projectOwnerRef = useRef(null);
  const gitlabProjectIDRef = useRef(null);
  const gitlabAccessTokenRef = useRef(null);
  const gitlabUsernameDeployTokenRef = useRef(null);
  const gitlabPasswordDeployTokenRef = useRef(null);

  const handleAddProjectConfig = () => {
    // validation
    if (
      !projectNameRef.current.value ||
      !namespaceRef.current.value ||
      !repositoryNameRef.current.value ||
      !projectOwnerRef.current.value ||
      !gitlabProjectIDRef.current.value ||
      !gitlabAccessTokenRef.current.value ||
      !gitlabUsernameDeployTokenRef.current.value ||
      !gitlabPasswordDeployTokenRef.current.value
    ) {
      alert("Please fill all fields");
      return;
    }

    const data = {
      projectName: projectNameRef.current.value,
      namespace: namespaceRef.current.value,
      repositoryName: repositoryNameRef.current.value,
      projectOwner: projectOwnerRef.current.value,
      gitlabProjectID: gitlabProjectIDRef.current.value,
      gitlabAccessToken: gitlabAccessTokenRef.current.value,
      gitlabUsernameDeployToken: gitlabUsernameDeployTokenRef.current.value,
      gitlabPasswordDeployToken: gitlabPasswordDeployTokenRef.current.value,
    };

    console.log(data);
  };

  const handleCloseModal = () => {
    window.confirm(
      "All unsaved changes will be lost if you close this form. Are you sure ?"
    ) && toggleModal();
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Add Project Config</h1>
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
          {/* Project Name */}
          <div className="flex flex-col">
            <label htmlFor="project_name" className="font-semibold">
              Project Name
            </label>
            <input
              type="text"
              ref={projectNameRef}
              id="project_name"
              placeholder="Project Name"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          {/* namespace */}
          <div className="flex flex-col">
            <label htmlFor="namespace" className="font-semibold">
              Namespace
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
          <div className="grid grid-cols-2 gap-3">
            {/* repository name */}
            <div className="flex flex-col">
              <label htmlFor="repository_name" className="font-semibold">
                Repository Name
              </label>
              <input
                type="text"
                ref={repositoryNameRef}
                id="repository_name"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* project owner */}
            <div className="flex flex-col">
              <label htmlFor="project_owner" className="font-semibold">
                Project Owner
              </label>
              <input
                type="text"
                ref={projectOwnerRef}
                id="project_owner"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* gilab project id */}
            <div className="flex flex-col">
              <label htmlFor="gitlab_project_id" className="font-semibold">
                Gitlab Project ID
              </label>
              <input
                type="text"
                ref={gitlabProjectIDRef}
                id="gitlab_project_id"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* gitlab access token */}
            <div className="flex flex-col">
              <label htmlFor="gitlab_access_token" className="font-semibold">
                Gitlab Access Token
              </label>
              <input
                type="text"
                ref={gitlabAccessTokenRef}
                id="gitlab_access_token"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* gitlab username deploy token */}
            <div className="flex flex-col">
              <label
                htmlFor="gitlab_username_deploy_token"
                className="font-semibold"
              >
                Gitlab Username Deploy Token
              </label>
              <input
                type="text"
                ref={gitlabUsernameDeployTokenRef}
                id="gitlab_username_deploy_token"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* gitlab password deploy token */}
            <div className="flex flex-col">
              <label
                htmlFor="gitlab_password_deploy_token"
                className="font-semibold"
              >
                Gitlab Password Deploy Token
              </label>
              <input
                type="text"
                ref={gitlabPasswordDeployTokenRef}
                id="gitlab_password_deploy_token"
                placeholder="Project Name"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          {/* Add button */}
          <div className="flex justify-end">
            <button
              title="Add Project Config"
              type="button"
              onClick={handleAddProjectConfig}
              className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

AddProjectConfigModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default AddProjectConfigModal;
