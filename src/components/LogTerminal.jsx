import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getToken } from "../utils/helper";

const LogTerminal = ({ podName, namespace }) => {
  const [terminalData, setTerminalData] = useState([]);

  useEffect(() => {
    // set token to header
    const ws = new WebSocket(
      `wss://api.adaptivenetlab.site/v1/dashboard/kube/main/deploy/logs/${namespace}/${podName}?token=${getToken()}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (e) => {
      const logData = e.data
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      setTerminalData((prevData) => [...prevData, ...logData]);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [namespace, podName]);

  return (
    <div className="bg-black text-white p-4 overflow-y-auto">
      <h1>Welcome to Adaptive Shell</h1>
      <h2 className="mb-3">Copyright (C) Adaptive Network Laboratory.</h2>
      <ul className="mb-4 space-y-2 whitespace-pre-wrap">
        {terminalData.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
};

LogTerminal.propTypes = {
  podName: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
};

export default LogTerminal;
