import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ url }) => {
  const [salesData, setSalesData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setSalesData(response.data.data);
        const revenue = response.data.data.reduce((acc, order) => acc + order.amount, 0);
        setTotalRevenue(revenue);
        setTotalOrders(response.data.data.length);
      }
    };

    fetchAnalytics();
  }, []);

  const chartData = {
    labels: salesData.map((order, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: "Revenue",
        data: salesData.map((order) => order.amount),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-summary">
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
      </div>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
