import { useState } from "react";
import ProjectConfigTable from "../components/ProjectConfigTable";
import usePageTitle from "../hooks/usePageTitle";
import AddProjectConfigModal from "../components/AddProjectConfigModal";
import { useGetProjectList } from "../hooks/useGetProjectList";
import TableSkeleton from "../components/TableSkeleton";

const ProjectConfig = () => {
  const pageTitle = usePageTitle();
  const [addProjectConfigModalIsShow, setAddProjectConfigModalIsShow] =
    useState(false);

  const {
    data: projectListData,
    isLoading: projectListIsLoading,
    isError: projectListIsError,
    isSuccess: projectListIsSuccess,
    error: projectListError,
  } = useGetProjectList();

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
        {projectListIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
        {projectListIsSuccess && (
          <ProjectConfigTable
            projectConfigData={projectListData.data.projects}
          />
        )}
        {projectListIsError && (
          <p className="text-sky-700 font-semibold">
            {projectListError.response.data.message}
          </p>
        )}
      </section>
      {addProjectConfigModalIsShow && (
        <AddProjectConfigModal toggleModal={toggleModalAddProjectConfig} />
      )}
    </>
  );
};

export default ProjectConfig;
