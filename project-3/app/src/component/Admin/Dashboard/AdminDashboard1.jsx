import React, { useState, useEffect } from 'react';

const AdminDashboard1 = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Top Navbar */}
      <header className="bg-blue-900 text-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div className="space-x-4">
          <button className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in-out duration-300">
            Profile
          </button>
          <button className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition ease-in-out duration-300">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="flex flex-grow">

        {/* Sidebar */}
        <aside className="w-64 bg-blue-900 text-white flex-shrink-0 animate-fadeIn">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">Bookstore Admin</h2>
          </div>
          <nav className="px-6 space-y-6 mt-4">
            <a href="#" className="block py-3 px-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
              📚 Manage Books
            </a>
            <a href="#" className="block py-3 px-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
              🛒 Manage Orders
            </a>
            <a href="#" className="block py-3 px-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
              👥 Manage Users
            </a>
            <a href="#" className="block py-3 px-4 bg-blue-800 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300">
              📊 Sales Overview
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          {/* Dashboard Overview */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in">
            {/* Books Widget */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">Books</h3>
                  <p className="mt-4 text-2xl">120</p>
                </>
              )}
            </div>

            {/* Orders Widget */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">Orders</h3>
                  <p className="mt-4 text-2xl">350</p>
                </>
              )}
            </div>

            {/* Users Widget */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">Users</h3>
                  <p className="mt-4 text-2xl">75</p>
                </>
              )}
            </div>

            {/* Sales Widget */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">Sales</h3>
                  <p className="mt-4 text-2xl">$24,000</p>
                </>
              )}
            </div>
          </section>
        </main>

      </div>
    </div>
  );
};

export default AdminDashboard1;
