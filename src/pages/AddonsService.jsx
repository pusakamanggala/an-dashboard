import { useState } from "react";
import AddonsTable from "../components/AddonsTable";
import usePageTitle from "../hooks/usePageTitle";
import AddAddonsModal from "../components/AddAddonsModal";
import { useGetAddons } from "../hooks/useGetAddons";
import TableSkeleton from "../components/TableSkeleton";
import UserContext from "../context/UserContext";
import { useContext } from "react";

const AddonsService = () => {
  const pageTitle = usePageTitle();
  const [isAddAddonsModalShow, setIsAddAddonsModalShow] = useState(false);
  const { userRole } = useContext(UserContext);

  const handleAddAddonsModal = () => {
    setIsAddAddonsModalShow(!isAddAddonsModalShow);
  };

  const {
    data: addonsData,
    isLoading: addonsIsLoading,
    isSuccess: addonsIsSuccess,
    isError: addonsIsError,
    error: addonsError,
  } = useGetAddons();

  return (
    <>
      <section className="space-y-5 w-full">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-sky-700 text-2xl">{pageTitle}</h1>
          {userRole !== "viewer" && (
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
          )}
        </div>
        {addonsIsLoading && <TableSkeleton numRows={5} numColumns={4} />}
        {addonsIsSuccess && addonsData.data.length > 0 && (
          <AddonsTable addonsData={addonsData.data} />
        )}
        {addonsIsSuccess && addonsData.data.length === 0 && (
          <p>No addons has been deployed</p>
        )}
        {addonsIsError && (
          <p className="text-sky-700 font-semibold">
            {addonsError?.response?.data?.message || "Something went wrong"}
          </p>
        )}
      </section>
      {isAddAddonsModalShow && (
        <AddAddonsModal toggleModal={handleAddAddonsModal} />
      )}
    </>
  );
};
export default AddonsService;
