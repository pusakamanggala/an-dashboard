import PropTypes from "prop-types";

const ImagesTable = ({ images }) => {
  return (
    <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
        <thead>
          <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
            <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
              Project Name
            </th>
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
          </tr>
        </thead>
        <tbody>
          {images.map((images, index) => (
            <tr className="text-center" key={index}>
              <td className="text-start">
                <p className="line-clamp-2">{images.projectName}</p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {images.repository}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {images.namespace}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start px-6">
                  {images.imagesOwner}
                </p>
              </td>
              <td>
                <p className="line-clamp-2 text-start pl-6 w-28">
                  {images.createdAt}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

ImagesTable.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImagesTable;
