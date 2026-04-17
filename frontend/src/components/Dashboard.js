import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="card">
      <h2>📊 Dashboard</h2>

      <p>Total Volunteers: {data.totalVolunteers}</p>
      <p>Total Problems: {data.totalProblems}</p>
      <p>Available Volunteers: {data.availableVolunteers}</p>

      {/* 🔥 NEW */}
      <p style={{ color: "red" }}>
        High Priority Problems: {data.highPriorityProblems}
      </p>
    </div>
  );
};

export default Dashboard;