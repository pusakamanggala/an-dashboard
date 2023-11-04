import usePageTitle from "../hooks/usePageTitle";
import DeploymentTable from "../components/DeploymentTable";
import AddDeploymentModal from "../components/AddDeploymentModal";
import { useState } from "react";
import { useGetDeployments } from "../hooks/useGetDeployments";
import TableSkeleton from "../components/TableSkeleton";

const Deployment = () => {
  const pageTitle = usePageTitle();
  const [isAddDeploymentModalShow, setIsAddDeploymentModalShow] =
    useState(false);

  const handleAddDeploymentModal = () => {
    setIsAddDeploymentModalShow(!isAddDeploymentModalShow);
  };

  const {
    data: deploymentData,
    isLoading: deploymentIsLoading,
    isError: deploymentIsError,
    isSuccess: deploymentIsSuccess,
    error: deploymentError,
  } = useGetDeployments();

  return (
    <>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
          <button
            className="border-2 flex space-x-2 w-fit px-4 py-2 rounded-lg font-semibold bg-sky-700 text-white hover:bg-sky-950 transition-colors duration-300"
            type="button"
            onClick={handleAddDeploymentModal}
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
            <span>Add Deployment</span>
          </button>
        </div>
        {deploymentIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
        {deploymentIsSuccess && deploymentData.data.length > 0 && (
          <DeploymentTable deploymentData={deploymentData.data} />
        )}
        {deploymentIsSuccess && deploymentData.data.length === 0 && (
          <p>No addons has been deployed</p>
        )}
        {deploymentIsError && (
          <p className="text-sky-700 font-semibold">
            {deploymentError.response.data.message}
          </p>
        )}
      </section>
      {isAddDeploymentModalShow && (
        <AddDeploymentModal toggle={handleAddDeploymentModal} />
      )}
    </>
  );
};

export default Deployment;
