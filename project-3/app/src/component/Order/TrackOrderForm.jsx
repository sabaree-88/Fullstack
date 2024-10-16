import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";
import API_BASE_URL from "../../config";
const TrackOrderForm = () => {
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${API_BASE_URL}/payment/track/${orderId}`
      );
      const orderDetails = response.data;
      console.log(orderDetails);
      navigate(`/track-order/${orderId}`, { state: { orderDetails } });
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <UserLayout>
      <section className="w-1/2 p-4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col self-center"
        >
          <label
            htmlFor="track"
            className="mb-6 text-sm font-medium text-gray-900 dark:text-white"
          >
            Track Order By Id
          </label>
          <div className="relative">
            <input
              type="text"
              id="track"
              value={orderId}
              onChange={(event) => setOrderId(event.target.value)}
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Order Id"
            />
            <button
              type="submit"
              className="text-white w-full mt-3 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Track Order
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </form>
      </section>
    </UserLayout>
  );
};

export default TrackOrderForm;
