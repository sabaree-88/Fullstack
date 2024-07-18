import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/user-list");
      setUsers(res.data);
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  };

  return (
    <UserContext.Provider value={{ users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
