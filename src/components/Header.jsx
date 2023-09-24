import { useState } from "react";

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationOpen(false);
  };

  const handleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileDropdownOpen(false);
  };

  return (
    <header className="h-20 flex items-center p-5 border-b-2 justify-between">
      <div className="flex items-center border rounded-lg bg-gray-100 pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="p-2 bg-inherit focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-5">
        {/* notification */}
        <div className="relative">
          <button
            type="button"
            title="Notification"
            onClick={() => handleNotification()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={!isNotificationOpen && "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </button>
          {isNotificationOpen && (
            <div className="absolute right-0 w-60 md:w-80 bg-[#EAF4F4] rounded-lg shadow-lg text-sky-950 flex flex-col items-start p-5">
              <h1 className="border-b-2 w-full pb-2 font-semibold">
                Notification
              </h1>
              <div className="border-b-2 border-gray-200 space-y-2 py-2">
                <h2 className="line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>
                <p className="text-gray-400 text-xs">Just Now</p>
              </div>
              <div className="border-b-2 border-gray-200 space-y-2 py-2">
                <h2 className="line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>
                <p className="text-gray-400 text-xs">Just Now</p>
              </div>
              <div className="border-b-2 border-gray-200 space-y-2 py-2">
                <h2 className="line-clamp-2 text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>
                <p className="text-gray-400 text-xs">Just Now</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex space-x-2 ">
          {/* user profile */}
          <div className="h-10 bg-slate-400 w-10 rounded-full"></div>
          <div className="md:block hidden">
            <h1 className="text-sm">Pusaka Manggala</h1>
            <p className="text-xs text-gray-500">pusakamanggala@gmail.com</p>
          </div>
          {/* user profile dropdown */}
          <div>
            <button
              title="Options"
              type="button"
              onClick={() => handleProfileDropdown()}
              className="flex justify-center items-center h-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isProfileDropdownOpen
                      ? "M4.5 15.75l7.5-7.5 7.5 7.5"
                      : "M19.5 8.25l-7.5 7.5-7.5-7.5"
                  }
                />
              </svg>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-5 w-48 bg-[#EAF4F4] rounded-lg shadow-lg p-2 space-y-2 text-sky-950 flex flex-col items-start font-semibold">
                <button
                  type="button"
                  title="Edit Profile"
                  className="hover:underline"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  title="Log out"
                  className="hover:underline"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
