import { useState } from "react";
import ProjectConfigTable from "../components/ProjectConfigTable";
import usePageTitle from "../hooks/usePageTitle";
import AddProjectConfigModal from "../components/AddProjectConfigModal";

const ProjectConfig = () => {
  const pageTitle = usePageTitle();
  const [addProjectConfigModalIsShow, setAddProjectConfigModalIsShow] =
    useState(false);

  //   project config dummy data
  const projectConfigData = [
    {
      projectName: "Manual Book",
      projectOwner: "John Doe",
      repositoryName: "manual-book",
      gitlabProjectID: "Git1231231",
      gitlabAccessToken: "wmasdj13gl",
      gitlabUsernameDeployToken: "deployproject",
    },
    {
      projectName: "Awesome App",
      projectOwner: "Alice Smith",
      repositoryName: "awesome-app",
      gitlabProjectID: "Git4567890",
      gitlabAccessToken: "xyzabc789",
      gitlabUsernameDeployToken: "deployawesomeapp",
    },
    {
      projectName: "Website Redesign",
      projectOwner: "Eva Johnson",
      repositoryName: "website-redesign",
      gitlabProjectID: "Git9876543",
      gitlabAccessToken: "qwert7890",
      gitlabUsernameDeployToken: "deploywebsiteredesign",
    },
    {
      projectName: "Mobile Game Project",
      projectOwner: "Bob Williams",
      repositoryName: "mobile-game",
      gitlabProjectID: "Git5678901",
      gitlabAccessToken: "mnbvcx456",
      gitlabUsernameDeployToken: "deploymobilegame",
    },
    {
      projectName: "Data Analysis Tool",
      projectOwner: "Linda Davis",
      repositoryName: "data-analysis",
      gitlabProjectID: "Git3456789",
      gitlabAccessToken: "plmko0987",
      gitlabUsernameDeployToken: "deploydataanalysis",
    },
  ];

  const toggleModalAddProjectConfig = () => {
    setAddProjectConfigModalIsShow(!addProjectConfigModalIsShow);
  };

  return (
    <>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
          <button
            className="border-2 flex space-x-2 w-fit px-4 py-2 rounded-lg font-semibold bg-sky-700 text-white hover:bg-sky-950 transition-colors duration-300"
            type="button"
            onClick={toggleModalAddProjectConfig}
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
            <span>Add Project</span>
          </button>
        </div>
        <ProjectConfigTable projectConfigData={projectConfigData} />
      </section>
      {addProjectConfigModalIsShow && (
        <AddProjectConfigModal toggleModal={toggleModalAddProjectConfig} />
      )}
    </>
  );
};

export default ProjectConfig;
