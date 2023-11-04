import { useEffect, useState } from "react";
import EditIcon from "../icons/edit-alt.svg";
import { useGetUserByID } from "../hooks/useGetUserByID";
import { useGetNamespace } from "../hooks/useGetNamespace";
import Select from "react-select";
import { useUpdateUserProfileFromAdmin } from "../hooks/useUpdateUserProfileFromAdmin";
import useNotification from "../hooks/useNotification";
import AddNamespaceModal from "./AddNamespaceModal";
import PropTypes from "prop-types";

const UpdateUserModal = ({ toggleModal, userID }) => {
  const [isAddNamespaceModalOpen, setIsAddNamespaceModalOpen] = useState(false);

  const handleAddNamespaceModal = () => {
    setIsAddNamespaceModalOpen(!isAddNamespaceModalOpen);
  };

  const [userFullName, setUserFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userNamespaces, setUserNamespaces] = useState([]);

  const {
    data: userData,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUserByID(userID);

  const {
    data: namespacesData,
    isLoading: namespacesIsLoading,
    isSuccess: namespacesIsSuccess,
    isError: namespacesIsError,
    error: namespacesError,
  } = useGetNamespace("admin");
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

  useEffect(() => {
    if (userIsSuccess) {
      setUserFullName(userData.data.name);
      setUsername(userData.data.username);
      setPassword(userData.data.password);
      setUserEmail(userData.data.email);
      setUserRole(userData.data.roleId);
      setUserNamespaces(userData.data.namespaces);
    }
  }, [userIsSuccess, userData]);

  const updateUserProfileMutation = useUpdateUserProfileFromAdmin();

  const handleUpdateUser = () => {
    let data = {};
    if (userFullName !== userData.data.name) {
      if (userFullName.trim() !== "") {
        data.name = userFullName.trim();
      } else {
        notifyWarning("Name cannot be empty");
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (userEmail !== userData.data.email) {
      if (userEmail.trim() === "") {
        notifyWarning("Email cannot be empty");
        return;
      } else if (!emailRegex.test(userEmail)) {
        notifyWarning("Please enter a valid email");
        return;
      } else {
        data.email = userEmail.trim();
      }
    }

    if (userRole !== userData.data.roleId) {
      if (userRole !== "") {
        data.roleId = userRole;
      } else {
        notifyWarning("Please select a role");
        return;
      }
    }

    if (userNamespaces !== userData.data.namespaces) {
      data.namespaces = userNamespaces;
    }

    if (password) {
      data.password = password;
    }

    if (Object.values(data).every((value) => !value)) {
      notifyWarning("No changes made");
      return;
    }

    console.log(data);
    updateUserProfileMutation.mutate({ userID, data });
  };

  const { notifyWarning } = useNotification();

  //   form loading skeleton
  const formLoadingSkeleton = (
    <div className="animate-pulse space-y-5 overflow-y-auto p-7">
      {/* name */}
      <div className="flex flex-col">
        <label htmlFor="user_full_name" className="font-semibold">
          Name
        </label>
        <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
        </div>
        {/* password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
        </div>
      </div>
      {/* email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
      </div>
      {/* role */}
      <div className="flex flex-col">
        <label htmlFor="user_role" className="font-semibold">
          Role
        </label>
        <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
      </div>
      {/* deployment access / namespace */}
      <div className="flex flex-col">
        <label htmlFor="deployment_access" className="font-semibold">
          Deployment Access
        </label>
        <div className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700 bg-gray-300 h-10"></div>
      </div>
    </div>
  );

  return (
    <section
      className={`" fixed inset-0 -top-5 flex items-center justify-center z-50 h-full w-full ${
        !isAddNamespaceModalOpen && "bg-black/60 backdrop-blur-[1px]"
      } p-5 "`}
    >
      <div
        className={`${
          isAddNamespaceModalOpen && "opacity-0"
        } " max-h-full w-[564px] bg-white rounded-xl relative flex flex-col "`}
      >
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={EditIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Update User</h1>
          </div>
          <button
            title="Close"
            type="button"
            onClick={toggleModal}
            disabled={updateUserProfileMutation.isLoading}
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
        {(userIsLoading || namespacesIsLoading) && formLoadingSkeleton}
        {/* input */}
        {userIsSuccess && namespacesIsSuccess && (
          <div className="space-y-5 overflow-y-auto p-7">
            {/* name */}
            <div className="flex flex-col">
              <label htmlFor="user_full_name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                value={userFullName}
                onChange={(e) => setUserFullName(e.target.value)}
                autoCapitalize="on"
                id="user_full_name"
                placeholder="Fullname"
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                disabled={updateUserProfileMutation.isLoading}
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
                  value={username}
                  autoComplete="off"
                  id="username"
                  placeholder="Username"
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  disabled
                />
              </div>
              {/* password */}
              <div className="flex flex-col">
                <label htmlFor="password" className="font-semibold">
                  Set Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                  id="password"
                  placeholder="Password"
                  disabled={updateUserProfileMutation.isLoading}
                  className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
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
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value.trim())}
                autoComplete="off"
                id="email"
                placeholder="example@email.com"
                disabled={updateUserProfileMutation.isLoading}
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* role */}
            <div className="flex flex-col">
              <label htmlFor="user_role" className="font-semibold">
                Role
              </label>
              <Select
                options={userRoleOption}
                isDisabled={updateUserProfileMutation.isLoading}
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
                  disabled={updateUserProfileMutation.isLoading}
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
                isDisabled={updateUserProfileMutation.isLoading}
                inputId="deployment_access"
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
                onClick={handleUpdateUser}
                className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
                disabled={updateUserProfileMutation.isLoading}
              >
                {updateUserProfileMutation.isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        )}
        {userIsError && (
          <p className="text-center mb-5 text-red-600">
            {userError?.response?.data?.message || "Something went wrong"}
          </p>
        )}
        {namespacesIsError && (
          <p className="text-center mb-5 text-red-600">
            {namespacesError?.response?.data?.message || "Something went wrong"}
          </p>
        )}
      </div>
      {isAddNamespaceModalOpen && (
        <AddNamespaceModal toggleModal={handleAddNamespaceModal} />
      )}
    </section>
  );
};

UpdateUserModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};

export default UpdateUserModal;
