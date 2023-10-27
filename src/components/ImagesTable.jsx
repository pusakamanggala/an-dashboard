import PropTypes from "prop-types";
import { formatTimestamp, paginate } from "../utils/helper";
import { useSearchParams } from "react-router-dom";

const ImagesTable = ({ images }) => {
  const itemsPerPage = 10;
  const [paginationParam, setPaginationParam] = useSearchParams({
    page: "1",
  });
  const currentPage = Number(paginationParam.get("page"));
  const paginatedImages = paginate(images, itemsPerPage, currentPage);

  return (
    <>
      <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
        <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
          <thead>
            <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
              <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
                Project Name
              </th>
              <th className="font-semibold px-6 text-start">Project ID</th>
              <th className="font-semibold px-6 text-start">Repository</th>
              <th className="font-semibold px-6 text-start">Namespace</th>
              <th
                scope="col"
                className="font-semibold px-6 whitespace-nowrap text-start"
              >
                Images Owner
              </th>
              <th className="font-semibold pl-6 w-28 whitespace-nowrap text-start">
                Created At
              </th>
              <th className="font-semibold pl-6 w-28 whitespace-nowrap text-start">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedImages.data.map((images, index) => (
              <tr className="text-center" key={index}>
                <td className="text-start">
                  <p className="line-clamp-1">{images.projectName}</p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {images.gitlabProjectId}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {images.gitlabRepositoryName}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {images.namespace}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-1 text-start px-6">
                    {images.projectOwner}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start pl-6 w-28">
                    {formatTimestamp(images.createdAt)}
                  </p>
                </td>
                <td>
                  <p className="line-clamp-2 text-start pl-6 w-28">
                    {images.updatedAt ? formatTimestamp(images.updatedAt) : "-"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="flex justify-between font-semibold">
        <p>
          Page {paginatedImages.currentPage} of {paginatedImages.totalPages}
        </p>
        <div className="flex gap-4">
          <button
            className={`flex gap-1 items-center  ${
              paginatedImages.currentPage === 1
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
            disabled={paginatedImages.currentPage === 1}
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
              paginatedImages.currentPage === paginatedImages.totalPages
                ? "text-gray-400"
                : "hover:text-sky-700"
            }`}
            title="Next Page"
            type="button"
            onClick={() => {
              if (currentPage < paginatedImages.totalPages) {
                setPaginationParam({ page: (currentPage + 1).toString() });
              }
            }}
            disabled={
              paginatedImages.currentPage === paginatedImages.totalPages
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

ImagesTable.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImagesTable;
