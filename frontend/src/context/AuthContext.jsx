// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Login function with API call
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Store user info
      localStorage.setItem("user", JSON.stringify({ userId: data.userId, username: data.username }));
      
      setUser({ userId: data.userId, username: data.username });
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Check if user is already logged in on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
