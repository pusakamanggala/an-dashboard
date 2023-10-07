import infoIcon from "../icons/info-alt.svg";
import PropTypes from "prop-types";

const AddonsDetailModal = ({ isOpen, setIsOpen }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-600";
      case "ready":
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
    isOpen && (
      <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
        <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
          {/* title and close button */}
          <div className="flex justify-between items-center px-7 pt-7 pb-3">
            <div className="flex space-x-2 items-center">
              <img src={infoIcon} alt="" className="h-9 w-9" />
              <h1 className="font-semibold text-lg">Info Addons</h1>
            </div>
            <button title="Close" onClick={() => setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-sky-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* addons detail */}
          <div className="space-y-5 overflow-y-auto p-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h1 className="font-semibold">Addons Name</h1>
                <p className="text-gray-500">projectName</p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Project Owner</h1>
                <p className="text-gray-500">projectOwnerName</p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Namespace</h1>
                <p className="text-gray-500">namespace</p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Images</h1>
                <p className="text-gray-500">images</p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Status</h1>
                <p
                  className={`${getStatusColor(
                    "ready"
                  )} px-4 py-1 rounded-md w-fit text-sm`}
                >
                  Ready
                </p>
              </div>
              <div className="space-y-2">
                <h1 className="font-semibold">Target Port</h1>
                <p className="text-gray-500">targetPort</p>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold">Volume Mount</h1>
              <p className="text-gray-500">volumeMount</p>
            </div>
            <div className="space-y-2">
              <h1 className="font-semibold">Environtment Variable</h1>
              <ul>
                <li className="text-gray-500">envVar1: envValue</li>
                <li className="text-gray-500">envVar2: envValue</li>
                <li className="text-gray-500">envVar3: envValue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

AddonsDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddonsDetailModal;
