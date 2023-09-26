import usePageTitle from "../hooks/usePageTitle";
import DiscIcon from "../icons/disc.svg";
import ActivityIcon from "../icons/activity.svg";
import SendIcon from "../icons/send.svg";
import AltToolIcon from "../icons/tool-alt.svg";
import LayersIcon from "../icons/layers.svg";
import SummaryCard from "../components/SummaryCard";
import DeploymentTimestamp from "../components/DeploymentTimestamp";

const Dashboard = () => {
  const pageTitle = usePageTitle();

  // timestamp dummy data
  const timestamp = [
    {
      id: 1,
      timestamp: "2021-08-01 12:00:00",
      developer: "John Doe",
      repository: "pti-pratama-elf",
      branch: "dev-abd-ad/add",
      image: "pti-pratama-elf-this-is-image",
      deploy_at: "2021-08-01 12:00:00",
      status: "complete",
    },
    {
      id: 2,
      timestamp: "2021-08-02 14:30:00",
      developer: "Jane Smith",
      repository: "my-awesome-app",
      branch: "main",
      image: "my-awesome-app-image",
      deploy_at: "2021-08-02 14:30:00",
      status: "complete",
    },
    {
      id: 3,
      timestamp: "2021-08-03 10:15:00",
      developer: "Alice Johnson",
      repository: "cool-project",
      branch: "feature-update",
      image: "cool-project-image",
      deploy_at: "2021-08-03 10:15:00",
      status: "on-delivery",
    },
    {
      id: 4,
      timestamp: "2021-08-04 16:45:00",
      developer: "Bob Wilson",
      repository: "web-app",
      branch: "bug-fixes",
      image: "web-app-image",
      deploy_at: "2021-08-04 16:45:00",
      status: "failed",
    },
    {
      id: 5,
      timestamp: "2021-08-05 09:20:00",
      developer: "Eva Anderson",
      repository: "data-analytics",
      branch: "data-processing",
      image: "data-analytics-image",
      deploy_at: "2021-08-05 09:20:00",
      status: "complete",
    },
    {
      id: 6,
      timestamp: "2021-08-06 17:30:00",
      developer: "Michael Lee",
      repository: "mobile-app",
      branch: "feature-additions",
      image: "mobile-app-image",
      deploy_at: "2021-08-06 17:30:00",
      status: "pending",
    },
  ];

  return (
    <section className="space-y-5 w-full">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      {/* service bar / summary card */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <SummaryCard
          icon={DiscIcon}
          title="Total Nodes"
          value={10}
          readyInstanceValue={100}
          diskPressureValue={100}
        />
        <SummaryCard
          icon={ActivityIcon}
          title="Total Pods"
          value={200}
          readyInstanceValue={100}
          diskPressureValue={100}
        />
        <SummaryCard
          icon={SendIcon}
          title="Deployment"
          value={35}
          readyInstanceValue={100}
          diskPressureValue={100}
        />
        <SummaryCard
          icon={AltToolIcon}
          title="Services"
          value={98}
          readyInstanceValue={100}
          diskPressureValue={100}
        />
        <SummaryCard
          icon={LayersIcon}
          title="Images"
          value={98}
          readyInstanceValue={100}
          diskPressureValue={100}
        />
      </section>
      {/* deployment timestamp */}
      <DeploymentTimestamp timestamp={timestamp} />
    </section>
  );
};

export default Dashboard;
