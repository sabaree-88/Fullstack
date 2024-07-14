import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
import Spinner from "./Spinner";

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/book", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-800 min-h-[100vh] p-10">
      <div className="flex justify-between mb-5">
        <button
          onClick={handleLogout}
          className="flex gap-3 font-semibold bg-red-800 px-5 py-2.5 rounded-md text-white"
        >
          LogOut
          <RiLogoutBoxLine
            className="text-white text-2xl"
            title="logout"
          />{" "}
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data.map((item, index) => {
            return (
              <div key={item._id} className="bg-white rounded-md p-3">
                <div className="flex justify-center items-center">
                  <div className="img w-6/12">
                    <img
                      src={`http://localhost:3000/${item.imagePath}`}
                      alt={item.title}
                    />
                  </div>
                  <div className="details w-6/12">
                    <div className="top flex justify-between flex-col gap-3 pb-5">
                      <h2>Book Name: {item.title}</h2>
                      <p>Published Year: {item.year}</p>
                      <h3>Author: {item.author}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
