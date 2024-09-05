import React, { useEffect, useState } from "react";
import Layout from "../AssetCopm/AdminLayout/Layout";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch messages from the API when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://localhost:3000/inquiry/get-inquiry",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        setMessages(response.data.inquiries);
        setLoading(false);
      } catch (err) {
        setError("Failed to load messages");
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user]);

  // Show loading state
  if (loading) return <div>Loading messages...</div>;
  // Show error state
  if (error) return <div>{error}</div>;

  return (
    <Layout>
      <div className="p-5">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>

        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="p-4 border rounded bg-slate-500 shadow">
              <h3 className="font-bold">
                {message.firstName} {message.lastName}
              </h3>
              <p className="text-sm text-gray-600">{message.email}</p>{" "}
              <p>{message.message}</p>
              <p className="text-xs text-gray-400">
                {new Date(message.date).toLocaleString()}{" "}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Message;
