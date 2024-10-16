import axios from "axios";
import React, { useState } from "react";
import API_BASE_URL from "../config";

const useCategory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const fetchCategory = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API_BASE_URL}/category/get-categories?page=${page}&limit=${limit}`
      );
      setCategories(response.data.categories);
      return {
        totalPages: response.data.pages,
        totalEntries: response.data.total,
      };
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryId = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/get-categories/${id}`,
        {
          headers,
        }
      );
      return { data: response.data };
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category/add-categories`,
        category,
        {
          headers,
        }
      );
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const editCategory = async (id, category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/category/edit-categories/${id}`,
        category,
        {
          headers,
        }
      );
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(
        `${API_BASE_URL}/category/delete-categories/${id}`,
        {
          headers,
        }
      );
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const searchCategory = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/search?query=${query}`,
        {
          headers,
        }
      );
      setCategories(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    categories,
    fetchCategory,
    fetchCategoryId,
    addCategory,
    editCategory,
    deleteCategory,
    searchCategory,
  };
};

export default useCategory;
