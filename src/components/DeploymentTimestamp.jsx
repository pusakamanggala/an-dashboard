import PropTypes from "prop-types";
import { formatTimestamp, getBadgeColor } from "../utils/helper";
import { paginate } from "../utils/helper";
import { useSearchParams } from "react-router-dom";

const DeploymentTimestamp = ({ timestamp }) => {
  // sort data by timestamp
  const sortedTimestamp = timestamp.sort((a, b) => {
    const dateA = new Date(a.lastTimestamp);
    const dateB = new Date(b.lastTimestamp);
    // Sort in descending order
    return dateB - dateA;
  });

  // paginate data
  const itemsPerPage = 10;
  const [paginationParam, setPaginationParam] = useSearchParams({ page: "1" });
  const currentPage = parseInt(paginationParam.get("page"));
  const paginatedTimestamp = paginate(
    sortedTimestamp,
    itemsPerPage,
    currentPage
  );

  return (
    <>
      <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
        <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
          <thead>
            <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
              <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap w-20">
                Last Timestamp
              </th>
              <th className="font-semibold text-start px-6 w-60">Pod Name</th>
              <th className="font-semibold text-start px-6 w-40">Namespace</th>
              <th scope="col" className="font-semibold text-start px-6 w-40">
                Reason
              </th>
              <th scope="col" className="font-semibold text-start px-6 w-64">
                Message
              </th>
              <th className="font-semibold w-40 px-6">Type</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTimestamp.data.map((timestampData, index) => (
              <tr className="text-center" key={index}>
                <td className="text-start">
                  <p className="line-clamp-2 w-20 hover:line-clamp-none">
                    {formatTimestamp(timestampData.lastTimestamp)}
                  </p>
                </td>
                <td className="text-start px-6">
                  <p className="line-clamp-2 hover:line-clamp-none">
                    {timestampData.podName}
                  </p>
                </td>
                <td className="text-start px-6">
                  <p className="line-clamp-1 hover:line-clamp-none">
                    {timestampData.namespace}
                  </p>
                </td>
                <td className="text-start px-6">
                  <p className="line-clamp-1 hover:line-clamp-none">
                    {timestampData.reason}
                  </p>
                </td>
                <td className="text-start px-6">
                  <p className="line-clamp-2 hover:line-clamp-none">
                    {timestampData.message}
                  </p>
                </td>
                <td className="capitalize px-6 whitespace-nowrap">
                  <h1
                    className={`${getBadgeColor(
                      timestampData.type
                    )} p-2 rounded-md`}
                  >
                    {timestampData.type}
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="flex justify-between font-semibold">
        <p>
          Page {paginatedTimestamp.currentPage} of{" "}
          {paginatedTimestamp.totalPages}
        </p>
        <div className="flex gap-4">
          <button
            className={`flex gap-1 items-center  ${
              paginatedTimestamp.currentPage === 1
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
            disabled={paginatedTimestamp.currentPage === 1}
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
              paginatedTimestamp.currentPage === paginatedTimestamp.totalPages
                ? "text-gray-400"
                : "hover:text-sky-700"
            }`}
            title="Next Page"
            type="button"
            onClick={() => {
              if (currentPage < paginatedTimestamp.totalPages) {
                setPaginationParam({ page: (currentPage + 1).toString() });
              }
            }}
            disabled={
              paginatedTimestamp.currentPage === paginatedTimestamp.totalPages
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

DeploymentTimestamp.propTypes = {
  timestamp: PropTypes.array.isRequired,
};

export default DeploymentTimestamp;
