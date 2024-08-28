import axios from "axios";

const API_URL = "http://localhost:3000/category";

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/get-categories`);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await axios.get(`${API_URL}/get-categories/:id`, {
    params: { id },
  });
  return response.data;
};

export const createCategory = async (categoryData) => {
  const formData = new FormData();
  formData.append("name", categoryData.name);
  formData.append("image", categoryData.image);

  const response = await axios.post(`${API_URL}/add-categories`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateCategory = async (id, categoryData) => {
  const formData = new FormData();
  formData.append("name", categoryData.name);
  if (categoryData.image) {
    formData.append("image", categoryData.image);
  }

  const response = await axios.put(`${API_URL}/edit-categories`, formData, {
    params: { id },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axios.delete(`${API_URL}/delete-categories`, {
    params: { id },
  });
  return response.data;
};
