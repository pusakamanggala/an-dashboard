import PropTypes from "prop-types";

const TableSkeleton = ({ numRows, numColumns }) => {
  return (
    <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
        <thead>
          <tr>
            {[...Array(numColumns)].map((_, index) => (
              <th
                key={index}
                className="w-1/4 h-12 bg-gray-200 animate-pulse"
              ></th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(numRows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(numColumns)].map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="h-10 bg-gray-100 animate-pulse"
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

TableSkeleton.propTypes = {
  numRows: PropTypes.number.isRequired,
  numColumns: PropTypes.number.isRequired,
};

export default TableSkeleton;
