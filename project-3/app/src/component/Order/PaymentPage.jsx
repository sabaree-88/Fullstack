import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useOrders from "../../hooks/useOrders";
import UserLayout from "../AssetCopm/UserLayout/UserLayout";

const PaymentPage = () => {
  const { state } = useLocation();
  const { orderId } = state || {};
  const { error, loading, order, orderSummery } = useOrders();
  console.log(order);
  useEffect(() => {
    const fetchOrders = async () => {
      await orderSummery(orderId);
    };
    fetchOrders();
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p className="text-red-500">{error}</p>
        <Link to="/cart" className="text-blue-500 underline">
          Go back to Cart
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
        <p className="text-red-500">No order details available.</p>
        <Link to="/cart" className="text-blue-500 underline">
          Go back to Cart
        </Link>
      </div>
    );
  }
  return (
    <UserLayout>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-2xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
            Thanks for your order!
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
            Your order{" "}
            <a className="font-medium text-gray-900 dark:text-white hover:underline">
              #{order._id}
            </a>{" "}
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been shipped.
          </p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Date
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {order.createdAt}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Payment Method
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                Razorpay
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Name
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {order.addressId.fullname}
              </dd>
            </dl>
            <dl className="sm:flex items-center justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                Address
              </dt>
              <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                {order.addressId.address}, {order.addressId.city},{" "}
                {order.addressId.state} - {order.addressId.zipcode}
              </dd>
            </dl>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={`/track-order/${order._id}`}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Track your order
            </Link>
            <Link
              to={"/cart"}
              className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default PaymentPage;
