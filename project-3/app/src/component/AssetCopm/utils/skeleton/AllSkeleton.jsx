import React from "react";

export const DashboardCard = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  );
};

export const DashboardBarChart = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 mt-6"></div>
      <div className="h-64 bg-gray-300 rounded"></div>{" "}
    </div>
  );
};

export const Search = () => {
  return (
    <div className="animate-pulse">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
      </div>
      <div className="block w-full h-12 bg-gray-200 rounded-lg"></div>
      <div className="absolute end-2.5 top-[5px] bg-gray-300 rounded-lg h-10 w-20"></div>
    </div>
  );
};

export const Table = () => {
  return (
    <div className="animate-pulse">
      div
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 m-6">
        <thead>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <tr key={index}>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
                <th className="px-6 py-3">
                  <div className="h-6 bg-gray-300 rounded dark:bg-gray-600"></div>
                </th>
              </tr>
            ))}
        </thead>
      </table>
    </div>
  );
};
