import { useState } from "react";
import infoIcon from "../icons/info-alt.svg";
import PropTypes from "prop-types";
import { useGetDetailProject } from "../hooks/useGetDetailProject";

const ProjectConfigDetailModal = ({ toggleModal, projectID }) => {
  const [showAccessToken, setShowAccessToken] = useState(false);
  const [showDeployToken, setShowDeployToken] = useState(false);
  const [showPasswordToken, setShowPasswordToken] = useState(false);

  const {
    data: detailProjectData,
    isLoading: detailProjectIsLoading,
    isError: detailProjectIsError,
    isSuccess: detailProjectIsSuccess,
    error: detailProjectError,
  } = useGetDetailProject(projectID);

  const toggleTokenVisibility = (type) => {
    switch (type) {
      case "access":
        setShowAccessToken(!showAccessToken);
        break;
      case "deploy":
        setShowDeployToken(!showDeployToken);
        break;
      case "password":
        setShowPasswordToken(!showPasswordToken);
        break;
      default:
        break;
    }
  };

  const tokenVisibilityIcon = (tokenState) => {
    return (
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
          d={
            tokenState
              ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          }
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  };

  const loadingSkeleton = () => {
    return (
      <div className="space-y-5 overflow-y-auto p-7">
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-5">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div className="space-y-2" key={index}>
              <div className="font-semibold h-7 w-36 bg-gray-200 animate-pulse rounded-md"></div>
              <div className="text-gray-500 h-5 bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={infoIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Info Project Config</h1>
          </div>
          <button title="Close" onClick={toggleModal}>
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
        {detailProjectIsLoading && loadingSkeleton()}
        {detailProjectIsError && (
          <p className="text-center mb-5 text-red-600">
            {detailProjectError?.response?.data?.message ||
              "Something went wrong"}
          </p>
        )}
        {detailProjectIsSuccess && (
          <div className="space-y-5 overflow-y-auto p-7">
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-5">
              <div className="space-y-2">
                <h1 className="font-semibold">Project Name</h1>
                <p className="text-gray-500">
                  {detailProjectData.data.projectName}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Namespace</h1>
                <p className="text-gray-500">
                  {detailProjectData.data.namespace}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Repository Name</h1>
                <p className="text-gray-500">
                  {detailProjectData.data.gitlabRepositoryName}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Project Owner</h1>
                <p className="text-gray-500">
                  {detailProjectData.data.projectOwner}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Gitlab Project ID</h1>
                <p className="text-gray-500">gitlabProjectID</p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Gitlab Access Token</h1>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {showAccessToken
                      ? detailProjectData.data.gitlabAccessToken
                      : "********"}
                  </p>
                  <button
                    type="button"
                    title={
                      showAccessToken
                        ? "Hide Access Token"
                        : "Show Access Token"
                    }
                    className="hover:text-sky-700"
                    onClick={() => toggleTokenVisibility("access")}
                  >
                    {tokenVisibilityIcon(showAccessToken)}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Gitlab Username Deploy Token</h1>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {showDeployToken
                      ? detailProjectData.data.gitlabDeployToken
                      : "********"}
                  </p>
                  <button
                    type="button"
                    title={
                      showDeployToken
                        ? "Hide Deploy Token"
                        : "Show Deploy Token"
                    }
                    className="hover:text-sky-700"
                    onClick={() => toggleTokenVisibility("deploy")}
                  >
                    {tokenVisibilityIcon(showDeployToken)}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Gitlab Password Deploy Token</h1>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {showPasswordToken
                      ? detailProjectData.data.gitlabDeployPassword
                      : "********"}
                  </p>
                  <button
                    type="button"
                    title={
                      showPasswordToken
                        ? "Hide Password Token"
                        : "Show Password Token"
                    }
                    className="hover:text-sky-700"
                    onClick={() => toggleTokenVisibility("password")}
                  >
                    {tokenVisibilityIcon(showPasswordToken)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

ProjectConfigDetailModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  projectID: PropTypes.string.isRequired,
};

export default ProjectConfigDetailModal;
