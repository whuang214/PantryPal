import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      // get the token from local storage and set it as the default header for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      // else no token, so set loading to false
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      // based off the current token, get the user data
      const res = await axios.get(`${API_URL}/user`);
      setUser(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.error);
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const loginWithGitHub = () => {
    window.location.href = `${API_URL}/auth/github`;
  };

  const logout = () => {
    // remove the token from local storage and delete the default header
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        loginWithGoogle,
        loginWithGitHub,
        logout,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
