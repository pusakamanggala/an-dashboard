import PropTypes from "prop-types";
import { formatTimestamp, getBadgeColor } from "../utils/helper";

const DeploymentTimestamp = ({ timestamp }) => {
  return (
    <section className="px-5 border-2 rounded-2xl w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
        <thead>
          <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
            <th className="text-start pr-6 font-semibold border-b-2 whitespace-nowrap">
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
          {timestamp.map((timestampData, index) => (
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
  );
};

DeploymentTimestamp.propTypes = {
  timestamp: PropTypes.array.isRequired,
};

export default DeploymentTimestamp;
