import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const VisitContext = createContext();

export const VisitProvider = ({ children }) => {
  const [serverStatus, setServerStatus] = useState("UNKNOWN");
  const [visits, setVisits] = useState(0);

  // Health check
  const checkHealth = async () => {
    try {
      const res = await api.get("/health");
      setServerStatus(res.data.status); // "OK"
    } catch {
      setServerStatus("DOWN");
    }
  };

  // Fetch total visits
  const fetchVisits = async () => {
    try {
      const res = await api.get("/visits");
      setVisits(res.data.count);
    } catch (err) {
      console.error("Failed to fetch visits:", err);
    }
  };

  // Add visit once per session
  const addVisitOnce = async () => {
    try {
      const hasVisited = sessionStorage.getItem("hasVisited");

      if (!hasVisited) {
        await api.post("/visits");
        sessionStorage.setItem("hasVisited", "true");
      }

      fetchVisits();
    } catch (err) {
      console.error("Failed to add visit:", err);
    }
  };

  useEffect(() => {
    // On app load
    // eslint-disable-next-line react-hooks/set-state-in-effect
    addVisitOnce();
    checkHealth();

    // Every 5 minutes
    const intervalId = setInterval(checkHealth, 300000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <VisitContext.Provider value={{ visits, serverStatus }}>
      {children}
    </VisitContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVisit = () => useContext(VisitContext);
