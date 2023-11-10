import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// This code is imperfect because it does not use a terminal library that matches ANSI escape codes. The libraries were not used because there were difficulties and unsolved problems during the implementation
// the entire terminal, handling, and styling components are completely manually built

const ExecTerminal = ({ podName, namespace, terminalType }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [ws, setWs] = useState(null);
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  // terminalType = terminal.type;
  // get string after . in terminal.type

  const stripANSI = (str) => str.replace(/\x1B[[(?);]{0,2}(;?\d)*./g, "");

  useEffect(() => {
    console.log("Component mounted");
    const ws = new WebSocket(
      `wss://api.adaptivenetlab.site/v1/dashboard/kube/main/${
        terminalType.split(".")[0]
      }/exec/${namespace}/${podName}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWs(ws);
    };

    ws.onmessage = (e) => {
      const result = e.data;
      // Split the result into lines
      const resultLines = result
        .split("\n")
        .map((line) => stripANSI(line.trim()))
        .filter((line) => line !== "");

      // Add the result lines to the output state except the last line (which is the input placeholder)
      if (resultLines.length > 1) {
        setOutput((prevOutput) => [...prevOutput, ...resultLines.slice(0, -1)]);
      }

      // Set the last line as the input placeholder
      setInputPlaceholder(resultLines[resultLines.length - 1]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [namespace, podName, terminalType]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    const command = input.trim();
    if (command) {
      // Add the command to the history
      setHistory([...history, command]);

      // Append the command to the output
      setOutput((prevOutput) => [
        ...prevOutput,
        `${inputPlaceholder} ${command}`,
      ]);

      if (ws.readyState === WebSocket.OPEN) {
        // if command is clear, clear the output and input
        if (command === "clear") {
          setOutput([]);
          setInput("");
          return;
        }
        // command need enter to be executed
        ws.send(`${command}\n`);
      } else {
        console.log("WebSocket is not open");
      }
    }
    setInput(""); // Clear the input field
  };

  const inputRef = useRef(null);
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="text-white p-4 overflow-y-auto"
      onClick={handleTerminalClick}
    >
      <h1>Welcome to Adaptive Shell</h1>
      <h2 className="mb-3">Copyright (C) Adaptive Network Laboratory.</h2>
      <div className="mb-4 space-y-2 whitespace-pre-wrap">
        {output.map((line, index) => (
          <p key={index} className="m-0">
            {line}
          </p>
        ))}
      </div>
      <form onSubmit={handleInputSubmit}>
        <div className="flex ">
          <h1 className="text-sky-400 whitespace-nowrap">{inputPlaceholder}</h1>
          <input
            type="text"
            value={input}
            ref={inputRef}
            autoFocus
            onChange={handleInputChange}
            className="w-full ml-2 bg-transparent text-white focus:outline-none"
          />
        </div>
      </form>
    </div>
  );
};

ExecTerminal.propTypes = {
  podName: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
  terminalType: PropTypes.string.isRequired,
};

export default ExecTerminal;
