import { useState } from "react";
import axios from "axios";

const useAdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
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
    try {
      const res = await axios.get(
        `http://localhost:3000/book?page=${page}&limit=${limit}`,
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
    try {
      const res = await axios.get(`http://localhost:3000/book/${id}`, {
        headers,
      });
      setBook(res.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const addBook = async (bookData) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/book", bookData, {
        headers,
      });
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const editBook = async (id, bookData) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/book/${id}`,
        bookData,
        {
          headers,
        }
      );
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:3000/book/${id}`, {
        headers,
      });
      setLoading(false);
      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return {
    books,
    book,
    loading,
    error,
    totalPages,
    totalEntries,
    fetchBooks,
    fetchBookById,
    addBook,
    editBook,
    deleteBook,
  };
};

export default useAdminBooks;
