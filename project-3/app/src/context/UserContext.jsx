import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const user = useAuth();

  // const getUsers = useCallback(async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/user/user-list");
  //     setUsers(res.data);
  //   } catch (error) {
  //     throw new Error(error.response?.data?.error || "Users not found");
  //   }
  // }, []);

  const getUserId = useCallback(async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/user/user-list/${id}`);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  }, []);

  const handleSearch = useCallback(async (searchQuery) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/user/search-user?query=${searchQuery}`
      );
      setUsers(res.data.allUsers);
    } catch (error) {
      throw new Error(error.response?.data?.error || "User not found");
    }
  });
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
      value={{
        users,
        getUserId,
        updateUser,
        user,
        setUser,
        handleSearch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

// import React, { createContext, useContext, useState } from "react";
// import axios from "axios";

// const UserContext = createContext();

// export const useUser = () => {
//   return useContext(UserContext);
// };
// const token = localStorage.getItem("token");
// const headers = {
//   Authorization: `Bearer ${token}`,
//   "Content-Type": "multipart/form-data",
// };
// export const UserProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const getUsers = async (page, limit) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/user/user-list?page=${page}&limit=${limit}`,
//         {
//           headers,
//         }
//       );
//       const { users, totalPages, totalUsers } = response.data;
//       setUsers(users);
//       return { totalPages, totalUsers };
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchUsers = async (searchQuery) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/user/search-user?query=${searchQuery}`
//       );
//       // setUsers(response.data.users);
//       console.log(response);
//     } catch (err) {
//       console.error("Error searching users:", err);
//       setError("Failed to search users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         loading,
//         error,
//         getUsers,
//         searchUsers,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
