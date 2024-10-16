import React, { useEffect, useState } from "react";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import Chart from "react-apexcharts";
import axios from "axios";
import {
  DashboardCard,
  DashboardBarChart,
} from "../../AssetCopm/utils/skeleton/AllSkeleton";
import API_BASE_URL from "../../../config";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    topBook: "N/A",
    salesData: [],
  });
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "sales-chart",
    },
    xaxis: {
      categories: [],
    },
  });
  const [chartSeries, setChartSeries] = useState([
    {
      name: "Sales",
      data: [],
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${API_BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setDashboardData(data);
        const categories = data.salesData.map((item) => `Month ${item._id}`);
        const sales = data.salesData.map((item) => item.total);

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          xaxis: {
            categories: categories,
          },
        }));
        setChartSeries([
          {
            name: "Sales",
            data: sales,
          },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {loading ? (
            <DashboardCard />
          ) : (
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg">Total Orders</h2>
              <p className="text-2xl">{dashboardData.totalOrders}</p>
            </div>
          )}
          {loading ? (
            <DashboardCard />
          ) : (
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg">Total Revenue</h2>
              <p className="text-2xl">${dashboardData.totalRevenue}</p>
            </div>
          )}
          {loading ? (
            <DashboardCard />
          ) : (
            <div className="bg-white p-4 shadow rounded">
              <h2 className="text-lg">Total Users</h2>
              <p className="text-2xl">{dashboardData.totalUsers}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <DashboardBarChart />
          ) : (
            <div className="bg-white mt-6 p-6 shadow rounded">
              <h2 className="text-lg mb-4">Monthly Sales (Bar Chart)</h2>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={350}
              />
            </div>
          )}
          {loading ? (
            <DashboardBarChart />
          ) : (
            <div className="bg-white mt-6 p-6 shadow rounded">
              <h2 className="text-lg mb-4">Monthly Sales (Pie Chart)</h2>
              <Chart
                options={{
                  chart: { type: "pie" },
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                  ],
                }}
                series={[10, 20, 30, 40, 50, 60]}
                type="pie"
                height={350}
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
