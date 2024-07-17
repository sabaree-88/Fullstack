import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Layout from "../AssetCopm/Layout";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      try {
        const token = localStorage.getItem("token");
        const res = axios.get("http://localhost:3000/user/user-list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <div>User</div>
    </Layout>
  );
};

export default Users;
