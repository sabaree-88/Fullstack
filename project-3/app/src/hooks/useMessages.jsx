import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../config";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/inquiry/get-inquiry`,
        {
          headers,
        }
      );
      setMessages(response.data.inquiries);
    } catch (err) {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const removeMessage = async (id) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/inquiry/remove-inquiry/${id}`,
        {
          headers,
        }
      );
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );
    } catch (error) {
      setError("Failed to load messages");
    }
  };
  return {
    messages,
    loading,
    error,
    removeMessage,
    fetchMessages,
  };
};

export default useMessages;
