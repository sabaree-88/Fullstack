import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/user/signup", {
        email,
        password,
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
