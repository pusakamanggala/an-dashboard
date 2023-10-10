import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../icons/delete.svg";
import EditIcon from "../icons/edit.svg";
import PropTypes from "prop-types";

const MembersTable = ({ membersdata }) => {
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

  const getRole = (role) => {
    switch (role) {
      case 1:
        return "Admin";
      case 2:
        return "Asisten";
      case 3:
        return "Praktikum";
      case 4:
        return "Viewer";
      default:
        return "Role not found";
    }
  };

  const handleDeleteMembers = (name, userId) => {
    window.confirm(`Are you sure you want to delete ${name}?`) &&
      // change this to the delete API call
      alert(`${name} userId ${userId} has been deleted`);
    setOpenMenuIndex(null);
  };

  return (
    <>
      <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
        <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
          <thead>
            <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
              <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
                Name
              </th>
              <th className="font-semibold px-6 text-start">Username</th>
              <th className="font-semibold px-6 text-start">Role</th>
              <th
                scope="col"
                className="font-semibold px-6 whitespace-nowrap text-start"
              >
                Namespace
              </th>
              <th className="font-semibold px-6 w-40 whitespace-nowrap text-start">
                Created At
              </th>
              <th className="font-semibold px-6 w-40 whitespace-nowrap text-start">
                Updated At
              </th>
              <th scope="col" className="font-semibold px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {membersdata.map((membersdata, index) => (
              <tr className="text-center" key={index}>
                <td className="text-start">
                  <ul>
                    <li className="line-clamp-1">{membersdata.name}</li>
                    <li className="line-clamp-1 text-gray-500 font-normal">
                      {membersdata.email}
                    </li>
                  </ul>
                </td>
                <td>
                  <p className="line-clamp-2 text-start px-6">
                    {membersdata.username}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {getRole(membersdata.role)}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {membersdata.namespace}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start px-6 w-32">
                    {membersdata.created_at}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start px-6 w-32">
                    {membersdata.updated_at}
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
                            <button className="flex space-x-2 items-center">
                              <img src={EditIcon} alt="" />
                              <span>Edit</span>
                            </button>
                          </li>
                          <li className="cursor-pointer hover:bg-black/5 p-1 rounded-md flex space-x-2">
                            <button
                              className="flex space-x-2 items-center"
                              title="Delete User"
                              onClick={() =>
                                handleDeleteMembers(
                                  membersdata.name,
                                  membersdata.userId
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
      </section>
      <section className="flex justify-between font-semibold">
        <p>Page 1 of 2</p>
        <div className="flex gap-4">
          <button
            className="flex gap-1 items-center hover:text-sky-700"
            title="Previous Page"
            type="button"
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
            className="flex gap-1 items-center hover:text-sky-700"
            title="Next Page"
            type="button"
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

MembersTable.propTypes = {
  membersdata: PropTypes.array.isRequired,
};

export default MembersTable;
