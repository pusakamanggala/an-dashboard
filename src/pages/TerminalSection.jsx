import ExecTerminal from "../components/ExecTerminal";
import LogTerminal from "../components/LogTerminal";
import TerminalIcon from "../icons/terminal-alt.svg";
import useTerminals from "../hooks/useTerminals";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TerminalSection = ({ isFullScreen, setIsFullScreen }) => {
  // get terminal data from session storage
  const { activeTerminal, deleteTerminal, deleteAllTerminals } = useTerminals();
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsMinimized(false);
  };
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setIsFullScreen(false);
  };

  const handleCloseAllTerminal = () => {
    deleteAllTerminals();
    setIsFullScreen(false);
    setIsMinimized(false);
  };

  // set the first terminal as selected terminal
  useEffect(() => {
    if (activeTerminal.length > 0) {
      setSelectedTerminal(activeTerminal[0]);
    }
  }, [activeTerminal]);

  return (
    <section
      className={`terminal flex flex-col ${isMinimized ? "" : "h-2/5"} ${
        isFullScreen ? "flex-1" : ""
      }`}
    >
      <header className="bg-[#EAF4F4] overflow-x-auto flex justify-between">
        <div className="flex w-fit">
          <div className="flex p-3 mr-10 whitespace-nowrap gap-2">
            <img src={TerminalIcon} alt="" className="h-10 w-10" />
            <div>
              <h2 className="text-xs">ADAPTIVE SHELL</h2>
              <h1 className="font-semibold text-m">Terminal</h1>
            </div>
          </div>
          {/* map active terminal */}
          {activeTerminal &&
            selectedTerminal &&
            activeTerminal.map((terminal, index) => (
              <div
                key={index}
                className={` h-fit p-1 px-2 self-end rounded-t-lg flex gap-3 w-60 ${
                  terminal.podName === selectedTerminal.podName &&
                  terminal.terminalType === selectedTerminal.terminalType
                    ? "bg-black text-white "
                    : "text-black cursor-pointer hover:bg-gray-300"
                }`}
                onClick={() => setSelectedTerminal(terminal)}
              >
                <h1 className="truncate break-words">
                  {terminal.terminalType.includes("log") ? "(log)" : "(exec)"}{" "}
                  {terminal.podName}
                </h1>
                <button
                  title="Close Terminal"
                  onClick={() =>
                    deleteTerminal(
                      terminal.podName,
                      terminal.namespace,
                      terminal.terminalType
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
        <div className="flex mx-5 gap-2">
          {/* window size */}
          <button
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            type="button"
            onClick={toggleFullScreen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`${
                  isFullScreen
                    ? "M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"
                    : "M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                }`}
              />
            </svg>
          </button>
          {/* minimize */}
          <button
            title={`${isMinimized ? "Show" : "Minimize"} Terminal`}
            onClick={toggleMinimize}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={`${
                  isMinimized ? "M4.5 15.75l7.5-7.5 7.5 7.5" : "M19.5 12h-15"
                }`}
              />
            </svg>
          </button>
          {/* close all terminal */}
          <button title="Close All Terminal" onClick={handleCloseAllTerminal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </header>
      {/* Terminal */}
      <div
        className={`bg-black text-white overflow-y-auto w-full flex flex-1  ${
          isMinimized && "hidden"
        }`}
      >
        {activeTerminal &&
          selectedTerminal &&
          activeTerminal.map((terminal, index) =>
            terminal.terminalType.includes("log") ? (
              <div
                key={index}
                className={`w-full ${
                  terminal.podName === selectedTerminal.podName &&
                  terminal.terminalType === selectedTerminal.terminalType
                    ? "block"
                    : "hidden"
                }`}
              >
                <LogTerminal
                  key={index}
                  podName={terminal.podName}
                  namespace={terminal.namespace}
                />
              </div>
            ) : (
              <div
                key={index}
                className={`w-full ${
                  terminal.podName === selectedTerminal.podName &&
                  terminal.terminalType === selectedTerminal.terminalType
                    ? "block"
                    : "hidden"
                }`}
              >
                <ExecTerminal
                  key={index}
                  podName={terminal.podName}
                  namespace={terminal.namespace}
                  terminalType={terminal.terminalType}
                />
              </div>
            )
          )}

        {/* <LogTerminal /> */}
        {/* <ExecTerminal /> */}
      </div>
    </section>
  );
};

TerminalSection.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  setIsFullScreen: PropTypes.func.isRequired,
};

export default TerminalSection;
