import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import Spinner from "../AssetCopm/utils/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  notifySuccess,
  notifyError,
} from "../AssetCopm/utils/toastNotification";
const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { getUserId, updateUser } = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getUserId(id);
        setCurrentUser(userData);
        setName(userData.name);
        setEmail(userData.email);
        setPhoneNumber(userData.phoneNumber || "");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Failed to fetch user data");
      }
    };
    fetchData();
  }, [id, getUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    if (profileImage) formData.append("profileImage", profileImage);

    try {
      await updateUser(id, formData);
      notifySuccess("Updated Successfully");
      if (user.role === "admin") {
        navigate("/user");
      } else {
        navigate("/user-dashboard");
      }
      setLoading(false);
    } catch (error) {
      notifyError(
        error.response?.data?.error || error.message || "Update user failed"
      );
      setError(
        error.response?.data?.error || error.message || "Update user failed"
      );
      setLoading(false);
    }
  };

  const updateUserJSX = (
    <div className="p-6 min-h-[100vh]">
      <div className="bg-white w-6/12 mx-auto rounded-md">
        <form
          className="md:col-span-2 w-full py-6 px-6 sm:px-16"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <h3 className="text-gray-800 text-2xl font-bold">Update User</h3>
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm mb-2 block"
              >
                Name
              </label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  id="name"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-800 text-sm mb-2 block"
              >
                Email Id
              </label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  id="email"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-gray-800 text-sm mb-2 block"
              >
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  name="phoneNumber"
                  type="text"
                  id="phoneNumber"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="profileImage"
                className="text-gray-800 text-sm mb-2 block"
              >
                Profile Image
              </label>
              <div className="relative flex items-center">
                <input
                  name="profileImage"
                  type="file"
                  id="profileImage"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-800 text-sm mb-2 block"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          <div className="!mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {" "}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {user && user.role === "admin" ? (
            <Layout>{updateUserJSX}</Layout>
          ) : (
            <UserLayout>{updateUserJSX}</UserLayout>
          )}
        </>
      )}{" "}
    </>
  );
};

export default UpdateUser;
