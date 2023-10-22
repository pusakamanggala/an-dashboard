import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../icons/delete.svg";
import infoIcon from "../icons/info.svg";
import PropTypes from "prop-types";
import ProjectConfigDetailModal from "./ProjectConfigDetailModal";
import { paginate } from "../utils/helper";
import { useSearchParams } from "react-router-dom";
import { useDeleteProject } from "../hooks/useDeleteProject";
import useNotification from "../hooks/useNotification";

const ProjectConfigTable = ({ projectConfigData }) => {
  // sort data by createdAt
  const sortedProjectConfigData = projectConfigData.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    // Sort in descending order
    return dateB - dateA;
  });

  // paginate data
  const itemsPerPage = 10;
  const [paginationParam, setPaginationParam] = useSearchParams({
    page: "1",
  });
  const currentPage = parseInt(paginationParam.get("page"));
  const paginatedProjectConfigData = paginate(
    sortedProjectConfigData,
    itemsPerPage,
    currentPage
  );

  // an array of boolean values to track the menu state for each row
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const deleteProjectMutation = useDeleteProject();
  const handleDeleteProject = (projectID, projectName) => {
    window.confirm(`Are you sure you want to delete ${projectName}?`) &&
      deleteProjectMutation.mutate(projectID);
    setOpenMenuIndex(null);
  };

  // notification
  const { notifyLoading, notifySuccess, notifyError } = useNotification();
  useEffect(() => {
    if (deleteProjectMutation.isLoading) {
      notifyLoading("Deleting project...");
    } else if (deleteProjectMutation.isSuccess) {
      notifySuccess("Project has been deleted");
      deleteProjectMutation.reset();
    } else if (deleteProjectMutation.isError) {
      notifyError("Failed to delete project");
      deleteProjectMutation.reset();
    }
  }, [deleteProjectMutation, notifyLoading, notifySuccess, notifyError]);

  const toggleProjectConfigDetailModal = (projectID) => {
    setDetailModalIsOpen(!detailModalIsOpen);
    setSelectedProject(projectID);
  };

  const toggleOptionsMenu = (index) => {
    if (openMenuIndex === index) {
      // Clicking the same option button should close the menu
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  // a ref to the options menu to detect clicks inside the menu
  const optionsMenuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click occurred outside of the menu
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(event.target)
      ) {
        setOpenMenuIndex(null);
      }
    };

    // Add event listener for clicks on the entire window
    window.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // to truncate the gitlab access token and gitlab username deploy token
  function truncateString(inputString, maxLength) {
    if (inputString.length > maxLength) {
      return `${inputString.substring(0, maxLength)}***`;
    } else {
      return inputString;
    }
  }

  return (
    <>
      <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
        <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
          <thead>
            <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
              <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap w-5">
                Project Name
              </th>
              <th className="font-semibold px-6 text-start whitespace-nowrap">
                Project Owner
              </th>
              <th className="font-semibold px-6 text-start">Namespace</th>
              <th className="font-semibold px-6 text-start whitespace-nowrap">
                Repository Name
              </th>
              <th className="font-semibold px-6 text-start whitespace-nowrap">
                Gitlab Project ID
              </th>
              <th className="font-semibold px-6 text-start whitespace-nowrap">
                Gitlab Access Token
              </th>
              <th className="font-semibold px-6 text-start pb-4 whitespace-nowrap">
                Gitlab Username Deploy Token
              </th>
              <th scope="col" className="font-semibold px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProjectConfigData.data.map((projectConfigData, index) => (
              <tr className="text-center" key={index}>
                <td className="text-start">
                  <p className="truncate w-24">
                    {projectConfigData.projectName}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {projectConfigData.projectOwner}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {projectConfigData.namespace}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {projectConfigData.gitlabRepositoryName}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {projectConfigData.gitlabProjectId}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {truncateString(projectConfigData.gitlabAccessToken, 13)}
                  </p>
                </td>
                <td>
                  <p className="text-start px-6 whitespace-nowrap">
                    {truncateString(projectConfigData.gitlabDeployToken, 25)}
                  </p>
                </td>
                <td>
                  <div className="w-fit mx-auto relative">
                    <button
                      title="Action"
                      type="button"
                      onClick={(event) => {
                        toggleOptionsMenu(index);
                        event.stopPropagation(); // Prevent the click event from bubbling up to the window
                      }}
                    >
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
                          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                        />
                      </svg>
                    </button>
                    {openMenuIndex === index && (
                      <div
                        ref={optionsMenuRef}
                        className={`absolute bg-white border border-gray-300 rounded-md right-5 shadow-md z-50 text-start w-28 p-2 ${
                          index >= paginatedProjectConfigData.data.length - 2
                            ? "bottom-7"
                            : ""
                        }`}
                      >
                        <ul className="space-y-3">
                          <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                            <button
                              className="flex space-x-2 items-center"
                              title="Project Detail"
                              onClick={() =>
                                toggleProjectConfigDetailModal(
                                  projectConfigData.projectId
                                )
                              }
                            >
                              <img src={infoIcon} alt="" />
                              <span>Detail</span>
                            </button>
                          </li>
                          <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                            <button
                              className="flex space-x-2 items-center"
                              title="Delete Project"
                              onClick={() =>
                                handleDeleteProject(
                                  projectConfigData.projectId,
                                  projectConfigData.projectName
                                )
                              }
                            >
                              <img src={DeleteIcon} alt="" />
                              <span>Delete</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {detailModalIsOpen && (
          <ProjectConfigDetailModal
            toggleModal={toggleProjectConfigDetailModal}
            projectID={selectedProject}
          />
        )}
      </section>
      <section className="flex justify-between font-semibold">
        <p>
          Page {paginatedProjectConfigData.currentPage} of{" "}
          {paginatedProjectConfigData.totalPages}
        </p>
        <div className="flex gap-4">
          <button
            className={`flex gap-1 items-center  ${
              paginatedProjectConfigData.currentPage === 1
                ? "text-gray-400"
                : "hover:text-sky-700"
            }`}
            title="Previous Page"
            type="button"
            onClick={() => {
              if (currentPage > 1) {
                setPaginationParam({ page: (currentPage - 1).toString() });
              }
            }}
            disabled={paginatedProjectConfigData.currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Previous
          </button>
          <button
            className={`flex gap-1 items-center  ${
              paginatedProjectConfigData.currentPage ===
              paginatedProjectConfigData.totalPages
                ? "text-gray-400"
                : "hover:text-sky-700"
            }`}
            title="Next Page"
            type="button"
            onClick={() => {
              if (currentPage < paginatedProjectConfigData.totalPages) {
                setPaginationParam({ page: (currentPage + 1).toString() });
              }
            }}
            disabled={
              paginatedProjectConfigData.currentPage ===
              paginatedProjectConfigData.totalPages
            }
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

ProjectConfigTable.propTypes = {
  projectConfigData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectConfigTable;
