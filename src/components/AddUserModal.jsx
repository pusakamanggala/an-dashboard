import { useRef } from "react";
import PaperPlusIcon from "../icons/paper-plus.svg";
import PropTypes from "prop-types";

const AddUserModal = ({ toggleModal }) => {
  const userFullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const userEmailRef = useRef(null);
  const userRoleRef = useRef(null);
  const userNamespaceRef = useRef(null);

  const handleAddUser = () => {
    // validation
    if (
      !userFullNameRef.current.value ||
      !usernameRef.current.value ||
      !passwordRef.current.value ||
      !userEmailRef.current.value ||
      !userRoleRef.current.value ||
      !userNamespaceRef.current.value
    ) {
      alert("Please fill all the fields");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(userEmailRef.current.value)) {
      alert("Please enter a valid email");
      return;
    }

    const usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(usernameRef.current.value)) {
      alert("Please enter a valid username");
      return;
    }

    // password need to be at least 8 characters long
    if (passwordRef.current.value.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    const data = {
      user_full_name: userFullNameRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: userEmailRef.current.value,
      role: userRoleRef.current.value,
      namespace: userNamespaceRef.current.value,
    };

    // change this to the add user API call
    console.log(data);
    // Clear input fields when the user is added
    userFullNameRef.current.value = "";
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    userEmailRef.current.value = "";
    userRoleRef.current.value = "";
    userNamespaceRef.current.value = "";
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-50 h-full w-full bg-black/60 backdrop-blur-[1px] p-5">
      <div className="max-h-full w-[564px] bg-white rounded-xl relative flex flex-col">
        {/* title and close button */}
        <div className="flex justify-between items-center px-7 pt-7 pb-3">
          <div className="flex space-x-2 items-center">
            <img src={PaperPlusIcon} alt="" className="h-9 w-9" />
            <h1 className="font-semibold text-lg">Add User</h1>
          </div>
          <button title="Close" type="button" onClick={toggleModal}>
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
                className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              />
            </div>
          </div>
          {/* email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              ref={userEmailRef}
              autoComplete="off"
              id="email"
              placeholder="example@email.com"
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
            />
          </div>
          {/* role */}
          <div className="flex flex-col">
            <label htmlFor="user_role" className="font-semibold">
              Role
            </label>
            <select
              name="user_role"
              id="user_role"
              ref={userRoleRef}
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              defaultValue={""}
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="1">Admin</option>
              <option value="2">Asisten</option>
              <option value="3">Praktikum</option>
              <option value="4">Viewer</option>
            </select>
          </div>
          {/* deployment access / namespace */}
          {/* change this to react-select multi select */}
          <div className="flex flex-col">
            <label htmlFor="deployment_access" className="font-semibold">
              Deployment Access
            </label>
            <select
              name="deployment_access"
              id="deployment_access"
              ref={userNamespaceRef}
              className="p-2 rounded-lg border-2 border-gray-300 outline-none focus:border-sky-700"
              defaultValue={""}
            >
              <option value="" disabled>
                Select Namespace
              </option>
              <option value="1">value 1</option>
              <option value="2">value 2</option>
            </select>
          </div>
          {/* save button */}
          <div className="flex justify-end">
            <button
              title="Save Deployment"
              type="button"
              onClick={handleAddUser}
              className="bg-sky-700 px-3 py-2 rounded-md text-white hover:bg-sky-950 transition-colors duration-300"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

AddUserModal.propTypes = {
  toggleModal: PropTypes.func.is,
};

export default AddUserModal;
