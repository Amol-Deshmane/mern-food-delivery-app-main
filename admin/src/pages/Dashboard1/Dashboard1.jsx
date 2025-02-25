import React, { useEffect, useState } from "react";
import "./Dashboard1.css";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

// Register required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Dashboard1 = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = orders.length;

  const chartData = {
    labels: orders.map((order) => order.date.split("T")[0]),
    datasets: [
      {
        label: "Revenue",
        data: orders.map((order) => order.amount),
        backgroundColor: "tomato",
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Sales Analytics</h2>
      <p>Total Orders: {totalOrders}</p>
      <p>Total Revenue: ${totalRevenue}</p>
      <Bar className="chart" data={chartData} />
    </div>
    
  );
};

export default Dashboard1;
