import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { getToken, setToken, removeToken } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Attempt to restore user session on mount
  useEffect(() => {
    const initAuth = async () => {
      // Check if session expired toast needs to be shown
      if (localStorage.getItem("task-tracker-session-expired") === "true") {
        localStorage.removeItem("task-tracker-session-expired");
        toast.error("Your session has expired. Please login again.");
      }

      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/profile");
        setUser(response.data.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // Clear expired or invalid token
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, data } = response.data;
    setToken(token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", { name, email, password });
    const { token, data } = response.data;
    setToken(token);
    setUser(data.user);
    setIsAuthenticated(true);
    return data.user;
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
