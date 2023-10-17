import PropsTypes from "prop-types";

const SummaryCard = ({
  icon,
  title,
  value,
  readyInstanceValue,
  diskPressureValue,
  runningInstanceValue,
  pendingInstanceValue,
  memoryPressureValue,
  pidPressureValue,
  networkUnavailableValue,
}) => {
  return (
    <div className="border-2 p-4 space-y-6 rounded-md">
      <div className="flex space-x-2 items-center">
        <img className="w-8 h-8" src={icon} alt="" />
        <h1 className="font-semibold text-gray-500">{title}</h1>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-xl lg:text-2xl xl:text-3xl font-semibold mx-5">
          {value}
        </h1>
        <div className="font-medium text-xs 2xl:text-sm">
          {readyInstanceValue && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-green-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-green-600">{readyInstanceValue}</span>{" "}
                Ready
              </p>
            </div>
          )}
          {runningInstanceValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-green-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-green-600">{runningInstanceValue}</span>{" "}
                Running
              </p>
            </div>
          )}
          {memoryPressureValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-red-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-red-600">{memoryPressureValue}</span>{" "}
                Memory Pressure
              </p>
            </div>
          )}
          {pidPressureValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-red-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-red-600">{pidPressureValue}</span> Pid
                Pressure
              </p>
            </div>
          )}
          {networkUnavailableValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-red-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-red-600">{networkUnavailableValue}</span>{" "}
                Network Unavailable
              </p>
            </div>
          )}
          {diskPressureValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-red-600"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-red-600">{diskPressureValue}</span> Disk
                Pressure
              </p>
            </div>
          )}
          {pendingInstanceValue > 0 && (
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 10 10"
                className="fill-yellow-400"
              >
                <circle cx="5" cy="5" r="5" />
              </svg>
              <p className="text-gray-400">
                <span className="text-yellow-400">{pendingInstanceValue}</span>{" "}
                Pending
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  icon: PropsTypes.string.isRequired,
  title: PropsTypes.string.isRequired,
  value: PropsTypes.number.isRequired,
  readyInstanceValue: PropsTypes.number.isRequired,
  diskPressureValue: PropsTypes.number.isRequired,
  runningInstanceValue: PropsTypes.number.isRequired,
  pendingInstanceValue: PropsTypes.number.isRequired,
  memoryPressureValue: PropsTypes.number.isRequired,
  pidPressureValue: PropsTypes.number.isRequired,
  networkUnavailableValue: PropsTypes.number.isRequired,
};

export default SummaryCard;
