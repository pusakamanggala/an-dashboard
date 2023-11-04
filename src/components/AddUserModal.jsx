import { useEffect, useRef, useState } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";
import { useAddMember } from "../hooks/useAddMember";
import { useGetNamespace } from "../hooks/useGetNamespace";
import Select from "react-select";
import useNotification from "../hooks/useNotification";
import AddNamespaceModal from "./AddNamespaceModal";

const AddUserModal = ({ toggleModal }) => {
  const [isAddNamespaceModalOpen, setIsAddNamespaceModalOpen] = useState(false);

  const handleAddNamespaceModal = () => {
    setIsAddNamespaceModalOpen(!isAddNamespaceModalOpen);
  };

  const userFullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const userEmailRef = useRef(null);
  const [userRole, setUserRole] = useState(null); // [1,2,3,4]
  const [userNamespaces, setUserNamespaces] = useState([]);

  const { data: namespacesData } = useGetNamespace("admin");

  const namespaceOption = namespacesData?.data?.namespaces.map((namespace) => ({
    value: namespace,
    label: namespace,
  }));

  const userRoleOption = [
    { value: "1", label: "Admin" },
    { value: "2", label: "Asisten" },
    { value: "3", label: "Praktikum" },
    { value: "4", label: "Viewer" },
  ];

  const addMemberMutation = useAddMember();
  const handleAddUser = () => {
    // validation
    if (
      !userFullNameRef.current.value ||
      !usernameRef.current.value ||
      !passwordRef.current.value ||
      !userEmailRef.current.value ||
      !userRole
    ) {
      notifyWarning("Please fill all the required fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(userEmailRef.current.value)) {
      notifyWarning("Invalid email");
      return;
    }

    const usernameRegex = /^[a-z0-9]+$/;
    if (
      !usernameRegex.test(usernameRef.current.value) ||
      usernameRef.current.value.length < 6
    ) {
      notifyWarning(
        "Username must be at least 6 characters long and only contain lowercase letters and numbers"
      );
      return;
    }

    // password need to be at least 8 characters long
    if (passwordRef.current.value.length < 8) {
      notifyWarning("Password must be at least 8 characters long");
      return;
    }

    const data = {
      name: userFullNameRef.current.value.trim(),
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: userEmailRef.current.value,
      roleId: userRole,
      namespaces: userNamespaces,
    };
    addMemberMutation.mutate({ data });
  };

  const { notifyWarning } = useNotification();

  // reset form after mutation is success
  useEffect(() => {
    if (addMemberMutation.isSuccess) {
      userFullNameRef.current.value = null;
      usernameRef.current.value = null;
      passwordRef.current.value = null;
      userEmailRef.current.value = null;
      setUserRole(null);
      setUserNamespaces([]);
      addMemberMutation.reset();
    }
  }, [addMemberMutation]);

  const handleCloseModal = () => {
    if (
      userFullNameRef.current.value ||
      usernameRef.current.value ||
      passwordRef.current.value ||
      userEmailRef.current.value ||
      userRole ||
      userNamespaces.length > 0
    ) {
      if (
        window.confirm(
          "All unsaved changes will be lost. Are you sure you want to close this form?"
        )
      ) {
        toggleModal();
        userFullNameRef.current.value = null;
        usernameRef.current.value = null;
        passwordRef.current.value = null;
        userEmailRef.current.value = null;
        setUserRole(null);
        setUserNamespaces([]);
      }
    } else {
      toggleModal();
    }
  };

  return (
    <>
      <section
        className={`${
          isAddNamespaceModalOpen && "opacity-0"
        } " fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5 "`}
      >
        <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
          {/* title and close button */}
          <div className="flex justify-between items-center px-7 pt-7 pb-3">
            <div className="flex space-x-2 items-center">
              <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
              <h1 className="font-semibold text-lg">Add User</h1>
            </div>
            <button
              title="Close"
              type="button"
              onClick={handleCloseModal}
              disabled={addMemberMutation.isLoading}
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
          {/* input */}
          <div className="space-y-5 overflow-y-auto p-7">
            {/* name */}
            <div className="flex flex-col">
              <label htmlFor="user_full_name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                ref={userFullNameRef}
                autoCapitalize="off"
                id="user_full_name"
                placeholder="Fullname"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                disabled={addMemberMutation.isLoading}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* username */}
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  ref={usernameRef}
                  autoComplete="off"
                  id="username"
                  placeholder="Username"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  disabled={addMemberMutation.isLoading}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {/* password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  ref={passwordRef}
                  id="password"
                  placeholder="Password"
                  disabled={addMemberMutation.isLoading}
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  onChange={(e) => {
                    e.target.value = e.target.value.trim();
                  }}
                />
              </div>
            </div>
            {/* email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                ref={userEmailRef}
                autoComplete="off"
                id="email"
                placeholder="example@email.com"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                disabled={addMemberMutation.isLoading}
                onChange={(e) => {
                  e.target.value = e.target.value.trim();
                }}
              />
            </div>
            {/* role */}
            <div className="flex flex-col">
              <label htmlFor="user_role" className="font-semibold">
                Role
              </label>
              <Select
                options={userRoleOption}
                isDisabled={addMemberMutation.isLoading}
                inputId="user_role"
                value={
                  userRole
                    ? userRoleOption.find((option) => option.value == userRole)
                    : null
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderColor: "#d1d5db",
                    borderWidth: "2px",
                    padding: "2px",
                  }),
                }}
                onChange={(e) => setUserRole(e ? e.value : null)}
              />
            </div>
            {/* deployment access / namespace */}
            <div className="flex flex-col">
              <div className="flex justify-between mb-2 items-center">
                <label htmlFor="deployment_access" className="font-semibold">
                  Deployment Access{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <button
                  className="border-2 flex gap-2 items-center px-2 py-1 rounded-lg font-semibold bg-sky-600 text-white hover:bg-sky-800 transition-colors duration-300"
                  type="button"
                  title="Create New Namespace"
                  onClick={handleAddNamespaceModal}
                  disabled={addMemberMutation.isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  <span className="hidden md:block">Create Namespace</span>
                </button>
              </div>
              <Select
                options={namespaceOption}
                isMulti={true}
                inputId="deployment_access"
                isDisabled={addMemberMutation.isLoading}
                value={
                  userNamespaces
                    ? userNamespaces.map((value) =>
                        namespaceOption.find((option) => option.value === value)
                      )
                    : []
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    borderColor: "#d1d5db",
                    borderWidth: "2px",
                    padding: "2px",
                  }),
                }}
                onChange={(selectedOptions) => {
                  const selectedValues = selectedOptions
                    ? selectedOptions.map((option) => option.value)
                    : [];
                  setUserNamespaces(selectedValues);
                }}
              />
            </div>
            {/* save button */}
            <div className="flex justify-end">
              <button
                title="Save Deployment"
                type="button"
                onClick={handleAddUser}
                className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
                disabled={addMemberMutation.isLoading}
              >
                {addMemberMutation.isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </section>
      {isAddNamespaceModalOpen && (
        <AddNamespaceModal toggleModal={handleAddNamespaceModal} />
      )}
    </>
  );
};

AddUserModal.propTypes = {
  toggleModal: PropTypes.func.is,
};

export default AddUserModal;
