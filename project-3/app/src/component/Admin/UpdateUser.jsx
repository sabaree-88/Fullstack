import React, { useState } from "react";
import Layout from "../AssetCopm/Layout";
import { useAuth } from "../../context/AuthContext";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(name, email, password);
      setLoading(false);
    } catch (error) {
      console.error("Error creating:", error);
      setError(
        error.response?.data?.error || error.message || "Create user failed"
      );
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="p-6 min-h-[100vh]">
        <div className="bg-white max-w-[50vw] mx-auto rounded-md">
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
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
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
    </Layout>
  );
};

export default UpdateUser;
