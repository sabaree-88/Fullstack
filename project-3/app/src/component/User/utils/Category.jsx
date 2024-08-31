import React from "react";
import UserLayout from "../../AssetCopm/UserLayout/UserLayout";
import ProductLoading from "../../AssetCopm/utils/skeleton/ProductLoading";
import useCategoryProducts from "../../../hooks/useCategoryProducts";

const Category = () => {
  const {
    categories,
    selectedCategory,
    products,
    loading,
    handleCategoryClick,
  } = useCategoryProducts();

  return (
    <UserLayout>
      {loading ? (
        <ProductLoading />
      ) : (
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="p-3 rounded-lg shadow-sm shadow-slate-600"
              >
                <img
                  className="h-48 max-w-48 rounded-lg"
                  src={`http://localhost:3000${product.imagePath}`}
                  alt={product.title}
                />
                <h3 className="font-bold">{product.title}</h3>
                <p>{product.description.substring(0, 80) + "..."}</p>
                <p className="font-semibold ">${product.price}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </UserLayout>
  );
};

export default Category;
