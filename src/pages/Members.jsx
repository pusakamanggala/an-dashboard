import { useState } from "react";
import AddUserModal from "../components/AddUserModal";
import MembersTable from "../components/MembersTable";
import usePageTitle from "../hooks/usePageTitle";

const Members = () => {
  const pageTitle = usePageTitle();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  const handleAddUserModal = () => {
    setIsAddUserModalOpen(!isAddUserModalOpen);
  };

  //members dummy data
  const members = [
    {
      userId: 1321,
      name: "John Doe",
      username: "johndoe",
      role: 1,
      email: "john.doe@example.com",
      namespace: "john-doe",
      created_at: "2021-08-20 10:00:00",
      updated_at: "2021-08-20 10:00:00",
    },
    {
      userId: 1322,
      name: "Jane Smith Johnson",
      username: "janesmith",
      role: 2,
      email: "jane.smith@example.com",
      namespace: "jane-smith",
      created_at: "2021-08-21 11:30:00",
      updated_at: "2021-08-21 11:30:00",
    },
    {
      userId: 1323,
      name: "Robert Taylor Brown",
      username: "robertbrown",
      role: 3,
      email: "robert.brown@example.com",
      namespace: "robert-brown",
      created_at: "2021-08-22 14:15:00",
      updated_at: "2021-08-22 14:15:00",
    },
    {
      userId: 1324,
      name: "Elizabeth Johnson Anderson",
      username: "elizabethanderson",
      role: 4,
      email: "elizabeth.anderson@example.com",
      namespace: "elizabeth-anderson",
      created_at: "2021-08-23 16:45:00",
      updated_at: "2021-08-23 16:45:00",
    },
    {
      userId: 1325,
      name: "Christopher David Williams",
      username: "chriswilliams",
      role: 1,
      email: "chris.williams@example.com",
      namespace: "chris-williams",
      created_at: "2021-08-24 20:10:00",
      updated_at: "2021-08-24 20:10:00",
    },
    {
      userId: 1326,
      name: "Maria Rodriguez Gonzalez",
      username: "mariagonzalez",
      role: 2,
      email: "maria.gonzalez@example.com",
      namespace: "maria-gonzalez",
      created_at: "2021-08-25 22:20:00",
      updated_at: "2021-08-25 22:20:00",
    },
  ];

  console.log(members);

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
        <MembersTable membersdata={members} />
      </section>
      {isAddUserModalOpen && <AddUserModal toggleModal={handleAddUserModal} />}
    </>
  );
};

export default Members;
