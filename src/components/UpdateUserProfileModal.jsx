import { useState } from "react";
import userProfileIcon from "../icons/user-profile.svg";
import { formatTimestamp, getRoleByRoleID } from "../utils/helper";
import useNotification from "../hooks/useNotification";
import { useUpdateUserProfile } from "../hooks/useUpdateUserProfile";
import PropTypes from "prop-types";

const UpdateUserProfileModal = ({ toggleModal, userData }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(
    userData.data.imageUrl
  );
  const [userFullName, setUserFullName] = useState(userData.data.name);
  const [email, setEmail] = useState(userData.data.email);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUSerProfileMutation = useUpdateUserProfile();

  const { notifyError, notifyWarning } = useNotification();

  const uploadProfilePicture = (event) => {
    setProfilePicture(event.target.files[0]);
    setProfilePictureURL(URL.createObjectURL(event.target.files[0]));
  };

  const handlePasswordChange = (event, state) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\s/g, ""); // Remove any whitespace
    state(sanitizedValue);
  };

  const handleSaveProfileUpdate = () => {
    let data = {};
    if (userFullName !== userData.data.name) {
      if (userFullName.trim() !== "") {
        data.name = userFullName.trim();
      } else {
        notifyWarning("Name cannot be empty");
        return;
      }
    }

    if (email !== userData.data.email) {
      if (email.trim() !== "") {
        data.email = email.trim();
      } else {
        notifyWarning("Email cannot be empty");
        return;
      }
    }

    if (newPassword.trim() !== "") {
      if (
        newPassword.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/) &&
        newPassword === confirmPassword
      ) {
        data.password = newPassword;
      } else {
        notifyError(
          "Password doesn't meet the criteria (at least 8 characters long and include a number) or doesn't match the confirmation"
        );
        return;
      }
    }

    if (profilePicture) {
      data.imageUrl = profilePicture;
    }

    if (Object.keys(data).length === 0) {
      notifyWarning("No changes made");
      return;
    }

    updateUSerProfileMutation.mutate({
      userID: userData.data.userId,
      data: data,
    });
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={userProfileIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Profile Info</h1>
          </div>
          <button title="Close" onClick={toggleModal} type="button">
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
        {/* user detail */}
        <div className="space-y-5 overflow-y-auto p-7">
          {/* profile picture */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={profilePictureURL}
              alt={userData.data.name + " profile picture"}
              className="h-40 w-40 object-cover rounded-full border-2 border-sky-700 p-1"
            />
            <label className="relative inline-flex items-center bg-white text-sky-700 rounded-lg p-2 cursor-pointer border border-gray-300 hover:border-sky-700">
              <span>Upload picture (Max: 5Mb)</span>
              <input
                type="file"
                className="sr-only" // This class hides the input element
                onChange={uploadProfilePicture}
                accept="image/jpeg, image/png"
              />
            </label>
          </div>
          {/* user full name */}
          <div className="flex flex-col">
            <label htmlFor="user_full_name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
              id="user_full_name"
              className="p-2 rounded-lg border border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          <div className="grid md:grid-cols-2 md:gap-3 gap-5">
            {/* username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={userData.data.username}
                autoComplete="username"
                className="p-2 rounded-lg border border-gray-300"
                disabled
              />
            </div>
            {/* user email */}
            <div className="flex flex-col">
              <label htmlFor="user_email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="user_email"
                className="p-2 rounded-lg border border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-3 gap-5">
            {/* set new password */}
            <div className="flex flex-col">
              <label htmlFor="new_password" className="font-semibold">
                Set New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => handlePasswordChange(e, setNewPassword)}
                autoComplete="off"
                id="new_password"
                className="p-2 rounded-lg border border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
            {/* confirm new password */}
            <div className="flex flex-col">
              <label htmlFor="confirm_new_password" className="font-semibold">
                Confirm New Password
              </label>
              <input
                type="password"
                autoComplete="off"
                value={confirmPassword}
                disabled={newPassword.trim() === ""}
                onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
                id="confirm_new_password"
                className="p-2 rounded-lg border border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <h1 className="font-semibold">Role</h1>
              <p>{getRoleByRoleID(userData.data.roleId)}</p>
            </div>
            {getRoleByRoleID(userData.data.roleId) !== "Admin" && (
              <div className="flex flex-col">
                <h1 className="font-semibold">Namespace</h1>
                {userData.data.namespaces.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {userData.data.namespaces.map((namespace, index) => (
                      <li key={index}>{namespace}</li>
                    ))}
                  </ul>
                ) : (
                  <p>You don&apos;t have any namespace</p>
                )}
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="font-semibold">Created At</h1>
              <p>{formatTimestamp(userData.data.createdAt)}</p>
            </div>
          </div>
          {/* Add button */}
          <div className="flex justify-end">
            <button
              title={updateUSerProfileMutation.isLoading ? "Saving..." : "Save"}
              type="button"
              className={`${
                updateUSerProfileMutation.isLoading
                  ? "bg-sky-400"
                  : "bg-sky-700 hover:bg-sky-950 transition-colors duration-300"
              } " px-3 py-2 rounded-md text-white "`}
              onClick={handleSaveProfileUpdate}
              disabled={updateUSerProfileMutation.isLoading}
            >
              {updateUSerProfileMutation.isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

UpdateUserProfileModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  refetchUserData: PropTypes.func.isRequired,
};

export default UpdateUserProfileModal;
