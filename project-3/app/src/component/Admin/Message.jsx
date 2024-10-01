import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";

import { useAuth } from "../../context/AuthContext";
import { IoIosClose } from "react-icons/io";
import useMessages from "../../hooks/useMessages";
const Message = () => {
  const { user } = useAuth();
  const { messages, loading, error, removeMessage, fetchMessages } =
    useMessages();
  useEffect(() => {
    fetchMessages();
  }, [user]);

  const handleRemove = async (id) => {
    removeMessage(id);
  };
  if (loading) return <div>Loading messages...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>

        <ul className="space-y-4">
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((message) => (
              <li
                key={message._id}
                className="p-4 border rounded bg-slate-500 shadow relative"
              >
                <button
                  className="absolute z-10 right-4 top-2"
                  onClick={() => handleRemove(message._id)}
                >
                  <IoIosClose className="w-6 h-6 hover:text-white" />
                </button>
                <h3 className="font-bold">
                  {message.firstName} {message.lastName}
                </h3>
                <p className="text-sm text-gray-600">{message.email}</p>{" "}
                <p>{message.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(message.date).toLocaleString()}{" "}
                </p>
              </li>
            ))
          ) : (
            <div>No messages available</div>
          )}
        </ul>
      </div>
    </Layout>
  );
};

export default Message;
