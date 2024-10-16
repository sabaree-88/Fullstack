import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useOrders from "../../hooks/useOrders";
import API_BASE_URL from "../../config";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const TrackOrder = () => {
  const { orderId } = useParams();
  const { loading, error, order, trackOrder, cancelOrder } = useOrders();
  useEffect(() => {
    const fetchOrder = async () => {
      await trackOrder(orderId);
    };

    fetchOrder();
  }, [orderId]);

  const handleCancel = async (orderId) => {
    await cancelOrder(orderId);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading order details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-10">No order found.</p>;
  }

  return (
    <UserLayout>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
              <div className="data">
                <p className="font-semibold text-base leading-7 text-black">
                  Order Id:{" "}
                  <span className="text-indigo-600 font-medium">
                    #{order._id}
                  </span>
                </p>
                <p className="font-semibold text-base leading-7 text-black mt-4">
                  Order Payment :{" "}
                  <span className="text-gray-400 font-medium">
                    {" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full px-3 min-[400px]:px-6">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                >
                  <div className="img-box max-lg:w-full">
                    <img
                      src={`${API_BASE_URL}${item.bookId.imagePath}`}
                      alt="Premium Watch image"
                      className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                    />
                  </div>
                  <div className="flex flex-row items-center w-full ">
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                            {item.bookId.title}
                          </h2>
                          <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                            By: {item.bookId.author}
                          </p>
                          <p className="font-medium text-base leading-7 text-black ">
                            Qty:{" "}
                            <span className="text-gray-500">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              Price
                            </p>
                            <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                              ${order.totalAmount}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              {order.orderStatus}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                              Expected Delivery Time
                            </p>
                            <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
              <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                {order.orderStatus === "Processing" && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-red-600"
                  >
                    <svg
                      className="stroke-black transition-all duration-500 group-hover:stroke-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 22 22"
                      fill="none"
                    >
                      <path
                        d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                        stroke=""
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                    Cancel Order
                  </button>
                )}
              </div>
              <p className="font-semibold text-lg text-black py-6">
                Total Price:{" "}
                <span className="text-indigo-600"> ${order.totalAmount}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default TrackOrder;
