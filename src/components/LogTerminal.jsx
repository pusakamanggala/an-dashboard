import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const LogTerminal = ({ podName, namespace }) => {
  const [terminalData, setTerminalData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(
      `wss://api.adaptivenetlab.site/v1/dashboard/kube/main/deploy/logs/${namespace}/${podName}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (e) => {
      const logData = e.data;
      const logLine = logData.split("\n");
      setTerminalData((prevData) => [...prevData, logLine]);
      console.log(logData);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [namespace, podName]);

  console.log(terminalData);

  return (
    <div className="bg-black text-white p-4 overflow-y-auto flex flex-col gap-1">
      <h1>Welcome to Adaptive Shell</h1>
      <h2 className="mb-3">Copyright (C) Adaptive Network Laboratory.</h2>
      {terminalData.map((log, index) => (
        <p key={index} className="m-0">
          {log}
        </p>
      ))}
    </div>
  );
};

LogTerminal.propTypes = {
  podName: PropTypes.string.isRequired,
  namespace: PropTypes.string.isRequired,
};

export default LogTerminal;
