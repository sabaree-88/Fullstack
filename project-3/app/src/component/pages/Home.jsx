import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegPlusSquare, FaRegEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoTrashBinSharp } from "react-icons/io5";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/book");
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
        <Link to={"/add"}>
          <FaRegPlusSquare className="text-green-600 text-3xl" />
        </Link>
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
      ) : error ? (
        <div className="text-red-500">Error loading data: {error.message}</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data.map((item, index) => (
            <div key={item._id} className="bg-white rounded-md p-3">
              <div className="flex justify-center items-center border-b-2">
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
              <div className="actions flex justify-around p-3">
                <div className="views">
                  <Link to={`/view/${item._id}`}>
                    <FaRegEye className="text-2xl text-green-600" />
                  </Link>
                </div>
                <div className="edit">
                  <Link to={`/edit/${item._id}`}>
                    <FaRegEdit className="text-2xl text-blue-600" />
                  </Link>
                </div>
                <div className="delete">
                  <Link to={`/delete/${item._id}`}>
                    <IoTrashBinSharp className="text-2xl text-red-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
