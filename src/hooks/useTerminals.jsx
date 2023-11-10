import { useEffect } from "react";
import UserContext from "../context/UserContext";
import { useContext } from "react";
const useTerminals = () => {
  const { activeTerminal, setActiveTerminal } = useContext(UserContext);

  useEffect(() => {
    const storedActiveTerminal = sessionStorage.getItem("activeTerminal");
    if (storedActiveTerminal) {
      setActiveTerminal(JSON.parse(storedActiveTerminal));
    }
  }, [setActiveTerminal]);

  const addTerminal = (podName, namespace, terminalType) => {
    const newTerminalEntry = {
      podName,
      namespace,
      terminalType,
    };

    const updatedTerminals = activeTerminal.filter(
      (entry) =>
        entry.podName !== podName ||
        entry.namespace !== namespace ||
        entry.terminalType !== terminalType
    );
    updatedTerminals.unshift(newTerminalEntry);
    if (updatedTerminals.length > 4) {
      updatedTerminals.pop();
    }
    setActiveTerminal(updatedTerminals);
  };

  const deleteTerminal = (podName, namespace, terminalType) => {
    const updatedTerminals = activeTerminal.filter(
      (entry) =>
        entry.podName !== podName ||
        entry.namespace !== namespace ||
        entry.terminalType !== terminalType
    );
    setActiveTerminal(updatedTerminals);
  };

  const deleteAllTerminals = () => {
    setActiveTerminal([]);
  };

  useEffect(() => {
    if (activeTerminal.length > 0) {
      sessionStorage.setItem("activeTerminal", JSON.stringify(activeTerminal));
    } else {
      sessionStorage.removeItem("activeTerminal");
    }
  }, [activeTerminal]);

  return {
    activeTerminal,
    addTerminal,
    deleteTerminal,
    deleteAllTerminals,
  };
};

export default useTerminals;
