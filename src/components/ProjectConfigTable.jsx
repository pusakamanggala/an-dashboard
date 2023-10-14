import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../icons/delete.svg";
import infoIcon from "../icons/info.svg";
import PropTypes from "prop-types";
import ProjectConfigDetailModal from "./ProjectConfigDetailModal";

const ProjectConfigTable = ({ projectConfigData }) => {
  // an array of boolean values to track the menu state for each row
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);

  const toggleProjectConfigDetailModal = () => {
    setDetailModalIsOpen(!detailModalIsOpen);
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
  return (
    <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
        <thead>
          <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
            <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
              Project Name
            </th>
            <th className="font-semibold px-6 text-start whitespace-nowrap">
              Project Owner
            </th>
            <th className="font-semibold px-6 text-start whitespace-nowrap">
              Repository Name
            </th>
            <th className="font-semibold px-6 text-start whitespace-nowrap">
              Gitlab Project ID
            </th>
            <th className="font-semibold px-6 text-start whitespace-nowrap">
              Gitlab Access Token
            </th>
            <th className="font-semibold px-6 text-start">
              Gitlab Username Deploy Token
            </th>
            <th scope="col" className="font-semibold px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {projectConfigData.map((projectConfigData, index) => (
            <tr className="text-center" key={index}>
              <td className="text-start">
                <p className="line-clamp-2">{projectConfigData.projectName}</p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {projectConfigData.projectOwner}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {projectConfigData.repositoryName}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {projectConfigData.gitlabProjectID}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {projectConfigData.gitlabAccessToken}...
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {projectConfigData.gitlabUsernameDeployToken}...
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
                        index >= 2 ? "bottom-7" : ""
                      }`}
                    >
                      <ul className="space-y-3">
                        <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                          <button
                            className="flex space-x-2 items-center"
                            title="Addons Detail"
                            onClick={() => setDetailModalIsOpen(true)}
                          >
                            <img src={infoIcon} alt="" />
                            <span>Detail</span>
                          </button>
                        </li>
                        <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                          <img src={DeleteIcon} alt="" />
                          <span>Delete</span>
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
        />
      )}
    </section>
  );
};

ProjectConfigTable.propTypes = {
  projectConfigData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProjectConfigTable;
