import usePageTitle from "../hooks/usePageTitle";
import DeploymentTable from "../components/DeploymentTable";

const Deployment = () => {
  const pageTitle = usePageTitle();

  //   deployment dummy data
  const deploymentData = [
    {
      id: 1,
      service_name: "Manual Book",
      images: "john doe",
      namespace: "budi",
      project_owner: "Git123",
      deploy_at: "2021-08-01 12:00:00",
      restart: "4",
      status: "complete",
    },
    {
      id: 5,
      service_name: "Manual Book",
      images: "john doe",
      namespace: "budi",
      project_owner: "Git123",
      deploy_at: "2021-08-01 12:00:00",
      restart: "4",
      status: "complete",
    },
    {
      id: 2,
      service_name: "User Manual",
      images: "jane smith",
      namespace: "alice",
      project_owner: "Git456",
      deploy_at: "2021-08-02 14:30:00",
      restart: "2",
      status: "pending",
    },
    {
      id: 3,
      service_name: "My Awesome App",
      images: "bob ross",
      namespace: "charlie",
      project_owner: "Git789",
      deploy_at: "2021-08-03 10:15:00",
      restart: "1",
      status: "failed",
    },
    {
      id: 4,
      service_name: "Cool Project",
      images: "susan brown",
      namespace: "david",
      project_owner: "Git101",
      deploy_at: "2021-08-04 16:45:00",
      restart: "3",
      status: "on-delivery",
    },
  ];

  return (
    <section className="space-y-5">
      <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
      <DeploymentTable deploymentData={deploymentData} />
    </section>
  );
};

export default Deployment;
