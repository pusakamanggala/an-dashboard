import { Suspense, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PropTypes from "prop-types";
import TerminalSection from "../pages/TerminalSection";
import useTerminals from "../hooks/useTerminals";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTerminalFullScreen, setIsTerminalFullScreen] = useState(false);
  const { activeTerminal } = useTerminals();

  return (
    <div className="h-[100dvh] flex">
      <Sidebar isOpen={isSidebarOpen} />
      {/* sidebar toggle button */}
      <button
        type="button"
        title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute right-5 bottom-5 bg-sky-950/70 hover:bg-sky-950 rounded-lg p-2 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#fff"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              isSidebarOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            }
          />
        </svg>
      </button>
      <div className="w-0 flex-1 flex flex-col">
        <Header />
        <main
          className={`${
            isTerminalFullScreen ? "hidden" : "p-5 flex-1 overflow-y-auto"
          }`}
        >
          <Suspense>{children}</Suspense>
        </main>
        {activeTerminal.length > 0 && (
          <TerminalSection
            isFullScreen={isTerminalFullScreen}
            setIsFullScreen={setIsTerminalFullScreen}
          />
        )}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
