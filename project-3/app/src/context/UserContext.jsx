import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/user-list");
      setUsers(res.data);
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  }, []);

  const getUserId = useCallback(async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/user-list/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  }, []);

  const updateUser = useCallback(async (id, name, email, password) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/user/user-update/${id}`,
        {
          name,
          email,
          password,
        }
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? res.data : user))
      );
    } catch (error) {
      throw new Error(error.response?.data?.error || "Update failed");
    }
  }, []);

  return (
    <UserContext.Provider value={{ users, getUsers, getUserId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
