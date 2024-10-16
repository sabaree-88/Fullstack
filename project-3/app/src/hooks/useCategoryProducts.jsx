import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const useCategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/category/get-categories`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        categoryId === "all"
          ? `${API_BASE_URL}/book`
          : `${API_BASE_URL}/book/category/${categoryId}`
      );
      setProducts(response.data.books);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  return {
    categories,
    selectedCategory,
    products,
    loading,
    handleCategoryClick,
  };
};

export default useCategoryProducts;
