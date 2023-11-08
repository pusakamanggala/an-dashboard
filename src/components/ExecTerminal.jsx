import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ExecTerminal = ({ podName, namespace }) => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [history, setHistory] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    console.log("Component mounted");
    const ws = new WebSocket(
      `wss://api.adaptivenetlab.site/v1/dashboard/kube/main/addons/exec/${namespace}/${podName}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
      setWs(ws);
    };

    ws.onmessage = (e) => {
      const result = e.data;
      setOutput((prevOutput) => [...prevOutput, result]);
      console.log(result);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [namespace, podName]); // Add dependencies

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
      setOutput((prevOutput) => [...prevOutput, `# ${command}`]);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(command);
      } else {
        console.error("WebSocket connection is not open.");
      }
    }
    setInput(""); // Clear the input field
  };

  return (
    <div className="bg-black text-white p-4 overflow-y-auto">
      <h1>Welcome to Adaptive Shell</h1>
      <h2 className="mb-3">Copyright (C) Adaptive Network Laboratory.</h2>
      <div className="mb-4 space-y-2">
        {output.map((line, index) => (
          <p key={index} className="m-0">
            {line}
          </p>
        ))}
      </div>
      <form onSubmit={handleInputSubmit}>
        <div className="flex ">
          <h1 className="text-sky-400 whitespace-nowrap">#</h1>
          <input
            type="text"
            value={input}
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
};

export default ExecTerminal;
