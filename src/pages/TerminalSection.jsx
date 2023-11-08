import ExecTerminal from "../components/ExecTerminal";
import LogTerminal from "../components/LogTerminal";
import TerminalIcon from "../icons/terminal-alt.svg";
import useTerminals from "../hooks/useTerminals";
import { useEffect, useState } from "react";
const TerminalSection = () => {
  // get terminal data from session storage
  const { activeTerminal, deleteTerminal, deleteAllTerminals } = useTerminals();
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // set the first terminal as selected terminal
  useEffect(() => {
    if (activeTerminal.length > 0) {
      setSelectedTerminal(activeTerminal[0]);
    }
  }, [activeTerminal]);

  return (
    <section
      className={`terminal bg-black flex flex-col ${
        isMinimized ? "h-auto" : "h-2/5"
      }`}
    >
      <header className="bg-[#EAF4F4] overflow-x-auto flex justify-between">
        <div className="flex w-fit ">
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
                  terminal.podName === selectedTerminal.podName
                    ? "bg-black text-white"
                    : "text-black cursor-pointer"
                }`}
                onClick={() => setSelectedTerminal(terminal)}
              >
                <h1 className="line-clamp-1">{terminal.podName}</h1>
                <button
                  title="Close Terminal"
                  onClick={() =>
                    deleteTerminal(terminal.podName, terminal.namespace)
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
        {/* close all terminal */}
        <div className="flex mx-5 gap-2">
          {/* minimize */}
          <button
            title={`${isMinimized ? "Show" : "Minimize"} Terminal`}
            onClick={() => setIsMinimized(!isMinimized)}
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
          <button title="Close All Terminal" onClick={deleteAllTerminals}>
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
        className={`bg-black text-white overflow-y-auto flex flex-1 ${
          isMinimized && "hidden"
        }`}
      >
        {activeTerminal &&
          selectedTerminal &&
          activeTerminal.map((terminal, index) =>
            terminal.terminalType === "log" ? (
              <div
                key={index}
                className={` ${
                  terminal.podName !== selectedTerminal.podName
                    ? "hidden"
                    : "block"
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
                className={` ${
                  terminal.podName !== selectedTerminal.podName
                    ? "hidden"
                    : "block"
                }`}
              >
                <ExecTerminal
                  key={index}
                  podName={terminal.podName}
                  namespace={terminal.namespace}
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

export default TerminalSection;
