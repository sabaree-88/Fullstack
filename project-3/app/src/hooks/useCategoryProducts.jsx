import { useState, useEffect } from "react";
import axios from "axios";

const useCategoryProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/category/get-categories"
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
          ? "http://localhost:3000/book"
          : `http://localhost:3000/book/category/${categoryId}`
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
