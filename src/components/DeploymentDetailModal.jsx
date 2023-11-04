import infoIcon from "../icons/info-alt.svg";
import PropTypes from "prop-types";
import { getBadgeColor } from "../utils/helper";
import { useGetDetailDeployment } from "../hooks/useGetDetailDeployment";
import { formatTimestamp } from "../utils/helper";

const DeploymentDetailModal = ({ toggleModal, podName, namespace }) => {
  const {
    data: detailDeploymentData,
    isLoading: detailDeploymentIsLoading,
    isSuccess: detailDeploymentIsSuccess,
    isError: detailDeploymentIsError,
    error: detailDeploymentError,
  } = useGetDetailDeployment(podName, namespace);

  const loadingSkeleton = () => {
    return (
      <div className="animate-pulse space-y-5 overflow-y-auto p-7">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-6 w-32 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-36 rounded-lg bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-32 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-36 rounded-lg bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-28 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-32 rounded-lg bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-24 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-28 rounded-lg bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-24 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-12 rounded-lg bg-gray-300"></div>
          </div>
          <div className="space-y-2">
            <div className="h-6 w-36 rounded-lg bg-gray-300"></div>
            <div className="h-4 w-44 rounded-lg bg-gray-300"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-24 rounded-lg bg-gray-300"></div>
          <div className="h-4 rounded-lg bg-gray-300"></div>
          <div className="h-4 w-36 rounded-lg bg-gray-300"></div>
        </div>
        <div className="space-y-2">
          <div className="h-6 w-48 rounded-lg bg-gray-300"></div>
          <div className="h-4 w-32 rounded-lg bg-gray-300"></div>
          <div className="h-4 w-28 rounded-lg bg-gray-300"></div>
          <div className="h-4 w-36 rounded-lg bg-gray-300"></div>
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
            <h1 className="font-semibold text-lg">Info Deployment</h1>
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
        {/* addons detail */}
        {detailDeploymentIsLoading && loadingSkeleton()}
        {detailDeploymentIsError && (
          <p className="text-center mb-5 text-red-600">
            {detailDeploymentError?.response?.data?.message ||
              "Something went wrong"}
          </p>
        )}
        {detailDeploymentIsSuccess && (
          <div className="space-y-5 overflow-y-auto p-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h1 className="font-semibold">Service Name</h1>
                <p className="text-gray-500">
                  {detailDeploymentData.data.labels.serviceName}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Project Owner</h1>
                <p className="text-gray-500">
                  {detailDeploymentData.data.labels.projectOwner}
                </p>
              </div>

              <div className="space-y-2">
                <h1 className="font-semibold">Namespace</h1>
                <p className="text-gray-500">
                  {detailDeploymentData.data.namespace}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Status</h1>
                <p
                  className={`${getBadgeColor(
                    detailDeploymentData.data.status
                  )} px-4 py-1 rounded-md w-fit text-sm`}
                >
                  {detailDeploymentData.data.status}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Restart</h1>
                <p className="text-gray-500">
                  {detailDeploymentData.data.restarts}
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Created At</h1>
                <p className="text-gray-500">
                  {formatTimestamp(detailDeploymentData.data.created)}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold">Images</h1>
              <p className="text-gray-500">{detailDeploymentData.data.image}</p>
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold">Environtment Variable</h1>
              {Object.keys(detailDeploymentData.data.env).length > 0 ? (
                <ul>
                  {Object.entries(detailDeploymentData.data.env).map(
                    ([key, value], index) => (
                      <li key={index}>
                        <p className="text-gray-500">
                          <span className="font-medium">{key} :</span> {value}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No environment variables</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

DeploymentDetailModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  podName: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
};

export default DeploymentDetailModal;
