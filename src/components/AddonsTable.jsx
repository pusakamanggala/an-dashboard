import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import infoIcon from "../icons/info.svg";
import TerminalIcon from "../icons/terminal.svg";
import DeleteIcon from "../icons/delete.svg";
import ActivityAltIcon from "../icons/activity-alt.svg";
import AddonsDetailModal from "./AddonsDetailModal";

const AddonsTable = ({ addonsData }) => {
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-600";
      case "on-delivery":
        return "bg-blue-100 text-blue-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
    }
  };

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

  return (
    <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
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
            <th scope="col" className="font-semibold px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {addonsData.map((addonsData, index) => (
            <tr className="text-center" key={index}>
              <td className="text-start">
                <p className="line-clamp-2">{addonsData.addons_name}</p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {addonsData.images}
                </p>
              </td>
              <td>
                <p className="line-clamp-1 text-start px-6">
                  {addonsData.namespace}
                </p>
              </td>
              <td>
                <p className="line-clamp-1 text-start px-6">
                  {addonsData.project_owner}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6 w-32">
                  {addonsData.deploy_at}
                </p>
              </td>
              <td>
                <p className="line-clamp-2">{addonsData.restart}</p>
              </td>
              <td className="capitalize px-5 whitespace-nowrap">
                <h1
                  className={`${getStatusColor(
                    addonsData.status
                  )} p-2 rounded-md`}
                >
                  {addonsData.status}
                </h1>
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
                        <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md">
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
                          <button className="flex space-x-2 items-center">
                            <img src={TerminalIcon} alt="" />
                            <span>Terminal</span>
                          </button>
                        </li>
                        <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                          <button className="flex space-x-2 items-center">
                            <img src={ActivityAltIcon} alt="" />
                            <span>Log</span>
                          </button>
                        </li>
                        <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                          <button className="flex space-x-2 items-center">
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
      <AddonsDetailModal
        isOpen={detailModalIsOpen}
        setIsOpen={setDetailModalIsOpen}
      />
    </section>
  );
};

AddonsTable.propTypes = {
  addonsData: PropTypes.array.isRequired,
};

export default AddonsTable;
