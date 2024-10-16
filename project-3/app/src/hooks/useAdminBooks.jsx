import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useAdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const fetchBooks = async (page = 1, limit = 5) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/book?page=${page}&limit=${limit}`,
        {
          headers,
        }
      );
      setBooks(res.data.books);
      return {
        totalPages: res.data.pages,
        totalEntries: res.data.total,
      };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE_URL}/book/${id}`, {
        headers,
      });
      return {
        data: res.data,
      };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/book`, bookData, {
        headers,
      });
      return res.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const editBook = async (id, bookData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/book/${id}`,
        bookData,
        {
          headers,
        }
      );
      return res.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/book/${id}`, {
        headers,
      });
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const searchBook = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/book/search?query=${searchQuery}`,
        {
          headers,
        }
      );
      setBooks(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    books,
    loading,
    error,
    totalPages,
    totalEntries,
    fetchBooks,
    fetchBookById,
    addBook,
    editBook,
    deleteBook,
    searchBook,
  };
};

export default useAdminBooks;
