import { useState } from "react";
import AddonsTable from "../components/AddonsTable";
import usePageTitle from "../hooks/usePageTitle";
import AddAddonsModal from "../components/AddAddonsModal";

const AddonsService = () => {
  const pageTitle = usePageTitle();
  const [isAddAddonsModalShow, setIsAddAddonsModalShow] = useState(false);

  //   addons dummy data
  const addonsData = [
    {
      id: 1,
      addons_name: "Manual Book",
      images: "john doe",
      namespace: "budi",
      project_owner: "Git123",
      deploy_at: "2021-08-01 12:00:00",
      restart: "4",
      status: "complete",
    },
    {
      id: 5,
      addons_name: "Manual Book",
      images: "john doe",
      namespace: "budi",
      project_owner: "Git123",
      deploy_at: "2021-08-01 12:00:00",
      restart: "4",
      status: "complete",
    },
    {
      id: 2,
      addons_name: "User Manual",
      images: "jane smith",
      namespace: "alice",
      project_owner: "Git456",
      deploy_at: "2021-08-02 14:30:00",
      restart: "2",
      status: "pending",
    },
    {
      id: 3,
      addons_name: "My Awesome App",
      images: "bob ross",
      namespace: "charlie",
      project_owner: "Git789",
      deploy_at: "2021-08-03 10:15:00",
      restart: "1",
      status: "failed",
    },
    {
      id: 4,
      addons_name: "Cool Project",
      images: "susan brown",
      namespace: "david",
      project_owner: "Git101",
      deploy_at: "2021-08-04 16:45:00",
      restart: "3",
      status: "on-delivery",
    },
  ];

  return (
    <>
      <section className="space-y-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
          <button
            className="border-2 flex space-x-2 w-fit px-4 py-2 rounded-lg font-semibold bg-sky-700 text-white hover:bg-sky-950 transition-colors duration-300"
            type="button"
            title="Add Addons"
            onClick={() => setIsAddAddonsModalShow(true)}
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
            <span>Add Addons</span>
          </button>
        </div>
        <AddonsTable addonsData={addonsData} />
      </section>
      <AddAddonsModal
        isOpen={isAddAddonsModalShow}
        setIsOpen={setIsAddAddonsModalShow}
      />
    </>
  );
};
export default AddonsService;
