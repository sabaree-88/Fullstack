import React, { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
};
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUsers = async (page = 1, limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/user-list?page=${page}&limit=${limit}`,
        {
          headers,
        }
      );
      const { users } = response.data;
      console.log();
      setUsers(users);
      return {
        totalPages: response.data.totalPages,
        totalEntries: response.data.totalUsers,
      };
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const getUserId = useCallback(async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/user/user-list/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  }, []);

  const updateUser = useCallback(
    async (id, formData) => {
      try {
        const res = await axios.put(
          `${API_BASE_URL}/user/user-update/${id}`,
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

  const searchUsers = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/search-user?query=${searchQuery}`
      );
      setUsers(response.data);
    } catch (err) {
      console.error("Error searching users:", err);
      setError("Failed to search users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        getUsers,
        searchUsers,
        updateUser,
        getUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
