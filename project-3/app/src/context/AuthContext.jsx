import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, [navigate]);

  const login = async (email, password, rememberMe) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });
      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { user, token };
    } catch (error) {
      console.error("Login error:", error.response?.data);
      throw new Error(error.response?.data?.error || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/user/signup`, {
        name,
        email,
        password,
      });
      const { user, token } = res.data;

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/login");
    } catch (error) {
      throw new Error(error.response?.data?.error || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/");
  };

  const googleLogin = async (idToken) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/google-login`,
        { idToken }
      );
      const { user, token } = response.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    } catch (error) {
      console.error("Google login error:", error.response?.data);
      notifyError(error.response.data.error || "Google login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
