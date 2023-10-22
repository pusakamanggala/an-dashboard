import { useContext, useEffect, useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";
import { useAddProject } from "../hooks/useAddProject";
import { useGetNamespace } from "../hooks/useGetNamespace";
import Select from "react-select";
import UserContext from "../context/UserContext";
import useNotification from "../hooks/useNotification";
import { useGetMembers } from "../hooks/useGetMembers";

const AddProjectConfigModal = ({ toggleModal }) => {
  const { userRole, user } = useContext(UserContext);

  const projectNameRef = useRef(null);
  const repositoryNameRef = useRef(null);
  const [projectOwner, setProjectOwner] = useState(
    userRole === "admin" ? "" : user.username
  );
  const gitlabProjectIDRef = useRef(null);
  const gitlabAccessTokenRef = useRef(null);
  const gitlabUsernameDeployTokenRef = useRef(null);
  const gitlabPasswordDeployTokenRef = useRef(null);
  const [selectedNamespace, setSelectedNamespace] = useState(null);

  const addProjectMutation = useAddProject();

  const {
    data: namespaceData,
    isError: namespaceIsError,
    isSuccess: namespaceIsSuccess,
  } = useGetNamespace(userRole);

  const { data: memberData } = useGetMembers(userRole);

  // regular user can only use their own namespace
  const namespaceOptions =
    userRole === "admin"
      ? (namespaceData?.data?.namespaces || []).map((namespace) => ({
          value: namespace,
          label: namespace,
        }))
      : (user.namespaces || []).map((namespace) => ({
          value: namespace,
          label: namespace,
        }));

  const membersOptions = (memberData?.data || []).map((member) => ({
    value: member.username,
    label: member.username,
  }));

  // notification
  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();
  useEffect(() => {
    if (addProjectMutation.isLoading) {
      notifyLoading("Adding project config...");
    } else if (addProjectMutation.isSuccess) {
      notifySuccess("Project config added successfully");
      addProjectMutation.reset();
      // reset value
      projectNameRef.current.value = "";
      repositoryNameRef.current.value = "";
      setProjectOwner(null);
      gitlabProjectIDRef.current.value = "";
      gitlabAccessTokenRef.current.value = "";
      gitlabUsernameDeployTokenRef.current.value = "";
      gitlabPasswordDeployTokenRef.current.value = "";
      setSelectedNamespace(null);
    } else if (addProjectMutation.isError) {
      notifyError(
        addProjectMutation.error?.response?.data?.message ||
          "Something went wrong"
      );
      addProjectMutation.reset();
    }
  }, [addProjectMutation, notifyLoading, notifySuccess, notifyError]);

  const handleAddProjectConfig = () => {
    // validation
    if (
      !projectNameRef.current.value ||
      !selectedNamespace ||
      !repositoryNameRef.current.value ||
      !projectOwner ||
      !gitlabProjectIDRef.current.value ||
      !gitlabAccessTokenRef.current.value ||
      !gitlabUsernameDeployTokenRef.current.value ||
      !gitlabPasswordDeployTokenRef.current.value
    ) {
      notifyWarning("Please fill all the fields");
      return;
    }

    const data = {
      projectName: projectNameRef.current.value,
      namespace: selectedNamespace,
      gitlabRepositoryName: repositoryNameRef.current.value,
      projectOwner: projectOwner,
      gitlabProjectId: gitlabProjectIDRef.current.value,
      gitlabAccessToken: gitlabAccessTokenRef.current.value,
      gitlabDeployToken: gitlabUsernameDeployTokenRef.current.value,
      gitlabDeployPassword: gitlabPasswordDeployTokenRef.current.value,
    };

    addProjectMutation.mutate({ data });
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
              // prevent user from typing space
              onKeyDown={(e) => {
                if (e.key === " ") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          {/* namespace */}
          <div className="flex flex-col">
            <label htmlFor="namespace" className="font-semibold">
              Namespace
            </label>
            {namespaceIsError && (
              <p className="text-red-600">Failed to fetch namespaces !</p>
            )}
            {namespaceIsSuccess && (
              <Select
                options={namespaceOptions}
                value={
                  selectedNamespace
                    ? namespaceOptions.find(
                        (option) => option.value === selectedNamespace
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
                onChange={(e) => setSelectedNamespace(e ? e.value : null)}
              />
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
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
                // prevent user from typing space
                onKeyDown={(e) => {
                  if (e.key === " ") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            {/* project owner */}
            <div className="flex flex-col">
              <label htmlFor="project_owner" className="font-semibold">
                Project Owner
              </label>
              {userRole === "admin" ? (
                <Select
                  options={membersOptions}
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
                  disabled
                  onChange={(e) => setProjectOwner(e.target.value)}
                  value={projectOwner}
                  id="project_owner"
                  placeholder="Project Name"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                />
              )}
            </div>
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
              className={`" ${
                addProjectMutation.isLoading
                  ? "bg-sky-300"
                  : "bg-sky-700 hover:bg-sky-950 transition-colors duration-300"
              }  px-3 py-2 rounded-md text-white "`}
              disabled={addProjectMutation.isLoading}
            >
              {addProjectMutation.isLoading ? "Adding Project..." : "Add"}
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
