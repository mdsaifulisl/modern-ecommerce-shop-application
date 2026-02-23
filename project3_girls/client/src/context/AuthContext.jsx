import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authMessage, setAuthMessage] = useState(null);

  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setLoading(false);
        return;
      }

      setAuthToken(token);

      try {
        const res = await api.get("/auth/verify");
        setAdmin(res.data.admin);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        localStorage.removeItem("adminToken");
        setAdmin(null);
        setAuthToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token } = res.data;

      localStorage.setItem("adminToken", token);
      setAuthToken(token);

      const verifyRes = await api.get("/auth/verify");
      setAdmin(verifyRes.data.admin);

      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || "Login Failed";
      setAuthMessage(msg);
      setTimeout(() => setAuthMessage(null), 4000);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAuthToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, authMessage }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
