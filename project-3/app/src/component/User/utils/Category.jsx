import React, { useState, useEffect } from "react";
import axios from "axios";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/category/get-categories"
        );
        setCategories(response.data);
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
        `http://localhost:3000/book/category/${categoryId}`
      );
      setProducts(response.data.books);
      setTotalPages(response.data.pages);
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

  return (
    <UserLayout>
      <>
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
          <button
            type="button"
            className="text-gray-900 hover:text-white border border-slate-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
            onClick={() => handleCategoryClick("all")}
          >
            All categories
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              className={`text-gray-900 border border-slate-600 hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white rounded-full text-base font-medium px-5 py-1.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800 ${
                selectedCategory === category._id ? "bg-gray-700" : ""
              }`}
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="flex items-center gap-2">
                <span>
                  <img
                    src={`http://localhost:3000/${category.imagePath}`}
                    alt={category.name}
                    className="w-8 h-8 rounded-full"
                  />
                </span>{" "}
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-gray-600 p-3 rounded-lg"
            >
              <img
                className="h-48 max-w-48 rounded-lg"
                src={`http://localhost:3000${product.imagePath}`}
                alt={product.title}
              />
              <h3 className="font-bold">{product.title}</h3>
              <p>{product.description.substring(0, 80) + "..."}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </>
    </UserLayout>
  );
};

export default Category;
