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

  // const getUserId = async (id) => {
  //   try {
  //     const res = await axios.get(`http://localhost:3000/user/user-list/${id}`);
  //     setUsers(res.data);
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || "User not found");
  //   }
  // };

  // const updateUser = async (id, name, email, password) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:3000/user/user-update/${id}`,
  //       {
  //         name,
  //         email,
  //         password,
  //       }
  //     );
  //     setUsers(res.data);
  //     navigate("/user");
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || "Update failed");
  //   }
  // };
  return (
    <UserContext.Provider value={{ users, getUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
