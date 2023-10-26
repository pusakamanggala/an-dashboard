import { useEffect, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import { useAddNamespace } from "../hooks/useAddNamespace";
import useNotification from "../hooks/useNotification";
import PropTypes from "prop-types";

const AddNamespaceModal = ({ toggleModal }) => {
  const [namespace, setNamespace] = useState("");
  const addNamespaceMutation = useAddNamespace();

  const { notifyLoading, notifySuccess, notifyError, notifyWarning } =
    useNotification();

  const handleNamespaceOnChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^a-z0-9-]/g, "").toLowerCase();
    setNamespace(sanitizedValue);
  };

  const handleAddNamespace = () => {
    if (namespace.length < 6) {
      notifyWarning("Namespace must be at least 6 characters");
      return;
    }

    addNamespaceMutation.mutate({
      data: {
        namespace,
      },
    });
  };

  useEffect(() => {
    if (addNamespaceMutation.isLoading) {
      notifyLoading("Adding namespace...");
    } else if (addNamespaceMutation.isSuccess) {
      notifySuccess("Namespace added successfully");
      toggleModal();
      addNamespaceMutation.reset();
    } else if (addNamespaceMutation.isError) {
      notifyError(
        addNamespaceMutation?.error?.response?.data?.message ||
          "Something went wrong"
      );
      addNamespaceMutation.reset();
    }
  }, [
    addNamespaceMutation,
    notifyError,
    notifyLoading,
    notifySuccess,
    notifyWarning,
    toggleModal,
  ]);

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5 ">
      <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Add New Namespace</h1>
          </div>
          <button
            title="Close"
            type="button"
            onClick={toggleModal}
            disabled={addNamespaceMutation.isLoading}
          >
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
        <div className="space-y-5 overflow-y-auto p-7">
          {/* input */}
          <div className="flex flex-col">
            <label htmlFor="namespace" className="font-semibold">
              Namespace
            </label>
            <input
              type="text"
              autoComplete="off"
              id="namespace"
              placeholder="Enter namespace"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              value={namespace}
              onChange={handleNamespaceOnChange}
            />
          </div>
          {/* save button */}
          <div className="flex justify-end">
            <button
              title="Save Namespace"
              type="button"
              onClick={handleAddNamespace}
              className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
              disabled={addNamespaceMutation.isLoading}
            >
              {addNamespaceMutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

AddNamespaceModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default AddNamespaceModal;
