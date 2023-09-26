import PropTypes from "prop-types";

const DeploymentTimestamp = ({ timestamp }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-600";
      case "on-delivery":
        return "bg-blue-100 text-blue-600";
      case "failed":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
    }
  };
  return (
    <section className="px-5 border-2 rounded-md w-full overflow-y-auto">
      <table className="border-separate border-spacing-y-5 text-sm w-full font-medium">
        <thead>
          <tr className="h-10 align-top text-gray-500 divide-y-reverse divide-y-2">
            <th className="text-start pr-6 font-semibold border-b-2 w-20">
              Timestamp
            </th>
            <th className="font-semibold px-6 ">Developer</th>
            <th className="font-semibold px-6">Repository</th>
            <th scope="col" className="font-semibold px-6">
              Branch
            </th>
            <th scope="col" className="font-semibold pl-10 pr-16">
              Image
            </th>
            <th className="font-semibold pr-6 pl-2 w-20 whitespace-nowrap text-start">
              Deploy At
            </th>
            <th className="font-semibold w-40">Status</th>
          </tr>
        </thead>
        <tbody>
          {timestamp.map((timestampData) => (
            <tr className="text-center" key={timestampData.id}>
              <td className="text-start">
                <p className="line-clamp-2">{timestampData.timestamp}</p>
              </td>
              <td>
                <p className="line-clamp-2">{timestampData.developer}</p>
              </td>
              <td>
                <p className="line-clamp-1">{timestampData.repository}</p>
              </td>
              <td>
                <p className="line-clamp-1">{timestampData.branch}</p>
              </td>
              <td>
                <p className="line-clamp-1">{timestampData.image}</p>
              </td>
              <td className="text-start pl-2">
                <p className="line-clamp-2">{timestampData.deploy_at}</p>
              </td>
              <td className="capitalize px-5 whitespace-nowrap">
                <h1
                  className={`${getStatusColor(
                    timestampData.status
                  )} p-2 rounded-md`}
                >
                  {timestampData.status}
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
