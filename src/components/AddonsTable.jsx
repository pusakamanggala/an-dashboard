import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import infoIcon from "../icons/info.svg";
import TerminalIcon from "../icons/terminal.svg";
import DeleteIcon from "../icons/delete.svg";
import ActivityAltIcon from "../icons/activity-alt.svg";
import AddonsDetailModal from "./AddonsDetailModal";
import { formatTimestamp, getBadgeColor, paginate } from "../utils/helper";
import { useSearchParams } from "react-router-dom";
import { useDeleteAddons } from "../hooks/useDeleteAddons";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import useTerminals from "../hooks/useTerminals";

const AddonsTable = ({ addonsData }) => {
  const { userRole } = useContext(UserContext);

  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [selectedAddonsPodName, setSelectedAddonsPodName] = useState("");
  const [selectedAddonsNamespace, setSelectedAddonsNamespace] = useState("");

  const deleteAddonsMutation = useDeleteAddons();
  const handleDeleteAddons = (namespace, addonsName, projectOwner) => {
    window.confirm("Are you sure you want to delete this addons?") &&
      deleteAddonsMutation.mutate({ namespace, addonsName, projectOwner });
    setOpenMenuIndex(null);
  };

  const handleDetailModal = (podName, namespace) => {
    setDetailModalIsOpen(!detailModalIsOpen);
    setSelectedAddonsPodName(podName);
    setSelectedAddonsNamespace(namespace);
  };

  // pagination
  const itemsPerPage = 10;
  const [paginationParam, setPaginationParam] = useSearchParams({
    page: "1",
  });
  const currentPage = parseInt(paginationParam.get("page")) || 1; // Use 1 as the default page
  const paginatedAddonsData = paginate(addonsData, itemsPerPage, currentPage);

  // an array of boolean values to track the menu state for each row
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

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
  }, [optionsMenuRef]);

  const { addTerminal } = useTerminals();

  return (
    <>
      <section className="px-5 border-2 rounded-2xl w-full overflow-x-auto min-h-[400px]">
        <table className="border-separate border-spacing-y-5 text-sm w-full font-medium h-auto">
          <thead>
            <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
              <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
                Addons Name
              </th>
              <th className="font-semibold px-6 text-start">Images</th>
              <th className="font-semibold px-6 text-start">Namespace</th>
              <th
                scope="col"
                className="font-semibold px-6 whitespace-nowrap text-start"
              >
                Project Owner
              </th>
              <th className="font-semibold px-6 w-40 whitespace-nowrap text-start">
                Deploy At
              </th>
              <th className="font-semibold px-6">Restart</th>
              <th className="font-semibold w-40">Status</th>
              {userRole !== "viewer" && (
                <th scope="col" className="font-semibold px-6">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedAddonsData.data.map((addonsData, index) => (
              <tr className="text-center" key={index}>
                <td className="text-start">
                  <p className="line-clamp-2">{addonsData.adonsName}</p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start px-6">
                    {addonsData.image}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {addonsData.namespace}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {addonsData.projectOwner}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start px-6 w-32">
                    {formatTimestamp(addonsData.deployAt)}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2">{addonsData.restarts}</p>
                </td>
                <td className="capitalize px-5 whitespace-nowrap">
                  <h1
                    className={`${getBadgeColor(
                      addonsData.status
                    )} p-2 rounded-md`}
                  >
                    {addonsData.status}
                  </h1>
                </td>
                {userRole !== "viewer" && (
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
                            index > 1 ? "bottom-7" : ""
                          }`}
                        >
                          <ul className="space-y-3">
                            <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md">
                              <button
                                className="flex space-x-2 items-center w-full"
                                title="Addons Detail"
                                onClick={() =>
                                  handleDetailModal(
                                    addonsData.podName,
                                    addonsData.namespace
                                  )
                                }
                              >
                                <img src={infoIcon} alt="" />
                                <span>Detail</span>
                              </button>
                            </li>
                            <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                              <button
                                className="flex space-x-2 items-center w-full"
                                onClick={() =>
                                  addTerminal(
                                    addonsData.podName,
                                    addonsData.namespace,
                                    "addons.exec"
                                  )
                                }
                              >
                                <img src={TerminalIcon} alt="" />
                                <span>Terminal</span>
                              </button>
                            </li>
                            <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                              <button
                                className="flex space-x-2 items-center w-full"
                                onClick={() =>
                                  addTerminal(
                                    addonsData.podName,
                                    addonsData.namespace,
                                    "addons.log"
                                  )
                                }
                              >
                                <img src={ActivityAltIcon} alt="" />
                                <span>Log</span>
                              </button>
                            </li>
                            <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                              <button
                                className="flex space-x-2 items-center w-full"
                                type="button"
                                title="Delete Addons"
                                onClick={() => {
                                  handleDeleteAddons(
                                    addonsData.namespace,
                                    addonsData.adonsName,
                                    addonsData.projectOwner
                                  );
                                }}
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {detailModalIsOpen && (
          <AddonsDetailModal
            toggleModal={handleDetailModal}
            podName={selectedAddonsPodName}
            namespace={selectedAddonsNamespace}
          />
        )}
      </section>
      <section className="flex justify-between font-semibold">
        <p>
          Page {paginatedAddonsData.currentPage} of{" "}
          {paginatedAddonsData.totalPages}
        </p>
        <div className="flex gap-4">
          <button
            className={`flex gap-1 items-center  ${
              paginatedAddonsData.currentPage === 1
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
            disabled={paginatedAddonsData.currentPage === 1}
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
              paginatedAddonsData.currentPage === paginatedAddonsData.totalPages
                ? "text-gray-400"
                : "hover:text-sky-700"
            }`}
            title="Next Page"
            type="button"
            onClick={() => {
              if (currentPage < paginatedAddonsData.totalPages) {
                setPaginationParam({ page: (currentPage + 1).toString() });
              }
            }}
            disabled={
              paginatedAddonsData.currentPage === paginatedAddonsData.totalPages
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

AddonsTable.propTypes = {
  addonsData: PropTypes.array.isRequired,
};

export default AddonsTable;
