import { useState } from "react";
import AddUserModal from "../components/AddUserModal";
import MembersTable from "../components/MembersTable";
import usePageTitle from "../hooks/usePageTitle";
import { useGetMembers } from "../hooks/useGetMembers";
import TableSkeleton from "../components/TableSkeleton";

const Members = () => {
  const pageTitle = usePageTitle();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const {
    data: membersData,
    isLoading: membersIsLoading,
    isSuccess: membersIsSuccess,
    isError: membersIsError,
    error: membersError,
  } = useGetMembers("admin");

  const handleAddUserModal = () => {
    setIsAddUserModalOpen(!isAddUserModalOpen);
  };

  return (
    <>
      <section className="space-y-5">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
          <div className="flex gap-2">
            <div className="flex items-center border-2 rounded-lg  pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                name="search"
                placeholder="Search"
                className="px-2 py-1 bg-inherit focus:outline-none w-20 md:w-44"
              />
            </div>
            <button
              className="border-2 flex space-x-2 w-fit px-4 py-2 rounded-lg font-semibold bg-sky-700 text-white hover:bg-sky-950 transition-colors duration-300"
              type="button"
              title="Add User"
              onClick={handleAddUserModal}
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
              <span className="md:block hidden">Add User</span>
            </button>
          </div>
        </div>
        {membersIsSuccess && <MembersTable membersdata={membersData.data} />}
        {membersIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
        {membersIsError && (
          <p className="font-semibold text-center text-red-600">
            {membersError?.response?.data?.message || "Something went wrong"}
          </p>
        )}
      </section>
      {isAddUserModalOpen && <AddUserModal toggleModal={handleAddUserModal} />}
    </>
  );
};

export default Members;
