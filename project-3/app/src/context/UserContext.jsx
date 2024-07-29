import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/user-list");
      setUsers(res.data);
    } catch (error) {
      throw new Error(error.response?.data?.error || "Users not found");
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

  const updateUser = useCallback(
    async (id, formData) => {
      try {
        const res = await axios.put(
          `http://localhost:3000/user/user-update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === id ? res.data : user))
        );

        if (user && user._id === id) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        }
      } catch (error) {
        throw new Error(error.response?.data?.error || "Update failed");
      }
    },
    [user]
  );

  return (
    <UserContext.Provider
      value={{ users, getUsers, getUserId, updateUser, user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
