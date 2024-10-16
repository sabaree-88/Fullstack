import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";
import { Link } from "react-router-dom";
import Layout from "../AssetCopm/AdminLayout/Layout";
import { useUser } from "../../context/UserContext";
import API_BASE_URL from "../../config";

const Profile = () => {
  const { user } = useAuth();
  const { getUserId } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const userData = await getUserId(user._id);
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user, getUserId]);

  const profileJSX = (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="relative container mx-auto p-4 w-72 h-72 flex flex-col justify-center bg-gray-800 rounded-lg">
        <Link
          to={`/update-user/${currentUser?._id}`}
          className="absolute top-6 right-6 w-8 h-8 flex justify-center items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-white"
            fill="#FFFFFF"
          >
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39 1.02-.39 1.41 0l2.34 2.34c.39.39.39 1.02 0 1.41L20.71 7.04z" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-center text-white mb-3">
          Profile
        </h1>
        <div className="w-20 h-20 rounded-full bg-white flex justify-center self-center overflow-hidden">
          <img
            src={
              currentUser?.profileImage
                ? `${API_BASE_URL}/${currentUser.profileImage}`
                : "/favico.png"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="mt-2 text-white text-md text-center font-semibold">
          {currentUser?.name}
        </p>
        <p className="mt-1 text-gray-400 text-sm text-center">
          {currentUser?.role}
        </p>
        <p className="mt-2 text-white text-sm text-center">
          {currentUser?.email}
        </p>
        <p className="mt-2 text-white text-sm text-center">
          {currentUser?.phoneNumber}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {user && user.role === "admin" ? (
        <Layout>{profileJSX}</Layout>
      ) : (
        <UserLayout>{profileJSX}</UserLayout>
      )}
    </>
  );
};

export default Profile;
