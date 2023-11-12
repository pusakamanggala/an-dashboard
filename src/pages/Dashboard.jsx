import usePageTitle from "../hooks/usePageTitle";
import DiscIcon from "../icons/disc.svg";
import ActivityIcon from "../icons/activity.svg";
import SendIcon from "../icons/send.svg";
import AltToolIcon from "../icons/tool-alt.svg";
import LayersIcon from "../icons/layers.svg";
import SummaryCard from "../components/SummaryCard";
import DeploymentTimestamp from "../components/DeploymentTimestamp";
import { useGetDashboardContent } from "../hooks/useGetDashboardContent";
import SummaryCardSkeleton from "../components/SummaryCardSkeleton";
import TableSkeleton from "../components/TableSkeleton";

const Dashboard = () => {
  const pageTitle = usePageTitle();

  const {
    data: nodeData,
    isLoading: nodeIsLoading,
    isSuccess: nodeIsSuccess,
  } = useGetDashboardContent("nodes");

  const {
    data: podData,
    isLoading: podIsLoading,
    isSuccess: podIsSuccess,
  } = useGetDashboardContent("pods");

  const {
    data: deploymentData,
    isLoading: deploymentIsLoading,
    isSuccess: deploymentIsSuccess,
  } = useGetDashboardContent("deployments");

  const {
    data: serviceData,
    isLoading: serviceIsLoading,
    isSuccess: serviceIsSuccess,
  } = useGetDashboardContent("services");

  const {
    data: imageData,
    isLoading: imageIsLoading,
    isSuccess: imageIsSuccess,
  } = useGetDashboardContent("images");

  const {
    data: eventData,
    isError: eventIsError,
    isLoading: eventIsLoading,
    isSuccess: eventIsSuccess,
    error: eventError,
  } = useGetDashboardContent("events");

  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      {/* service bar / summary card */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* summary card loading skeleton */}
        {nodeIsLoading && <SummaryCardSkeleton />}
        {podIsLoading && <SummaryCardSkeleton />}
        {deploymentIsLoading && <SummaryCardSkeleton />}
        {serviceIsLoading && <SummaryCardSkeleton />}
        {imageIsLoading && <SummaryCardSkeleton />}
        {/* summary card */}
        {nodeIsSuccess && (
          <SummaryCard
            icon={DiscIcon}
            title="Total Nodes"
            value={nodeData.data.jumlahNode}
            readyInstanceValue={nodeData.data.statusNode.ready}
            diskPressureValue={nodeData.data.statusNode.diskPressure}
            memoryPressureValue={nodeData.data.statusNode.memoryPressure}
            pidPressureValue={nodeData.data.statusNode.pidPressure}
            networkUnavailableValue={
              nodeData.data.statusNode.networkUnavailable
            }
          />
        )}
        {podIsSuccess && (
          <SummaryCard
            icon={ActivityIcon}
            title="Total Pods"
            value={podData.data.jumlahPod}
            runningInstanceValue={podData.data.podStatus.Running}
            pendingInstanceValue={podData.data.podStatus.Pending}
          />
        )}
        {deploymentIsSuccess && (
          <SummaryCard
            icon={SendIcon}
            title="Deployment"
            value={deploymentData.data.jumlahDeployment}
          />
        )}
        {serviceIsSuccess && (
          <SummaryCard
            icon={AltToolIcon}
            title="Services"
            value={serviceData.data.jumlahService}
          />
        )}
        {imageIsSuccess && (
          <SummaryCard
            icon={LayersIcon}
            title="Images"
            value={imageData.data.jumlahImages}
          />
        )}
      </section>
      {/* table loading skeleton */}
      {eventIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
      {/* deployment timestamp table */}
      {eventIsError && (
        <p className="text-sky-700 font-semibold">
          {eventError.response.data.message}
        </p>
      )}
      {eventIsSuccess && <DeploymentTimestamp timestamp={eventData.data} />}
    </section>
  );
};

export default Dashboard;
