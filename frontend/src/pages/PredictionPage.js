import React, { useState, useEffect } from "react";
import {
  LineChart, Line, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

const Prediction = () => {

  // ✅ INITIAL DATA (IMPORTANT FIX)
  const [data, setData] = useState([
    { name: "Week 1", risk: 45 },
    { name: "Week 2", risk: 60 },
    { name: "Week 3", risk: 70 },
    { name: "Week 4", risk: 65 },
    { name: "Week 5", risk: 85 }
  ]);

  const [pieData, setPieData] = useState([
    { name: "Low", value: 30 },
    { name: "Medium", value: 45 },
    { name: "High", value: 25 }
  ]);

  const [heatmapData, setHeatmapData] = useState([
    { area: "Delhi", risk: 85 },
    { area: "Mumbai", risk: 70 },
    { area: "Chennai", risk: 60 },
    { area: "Assam", risk: 80 }
  ]);

  const [eta, setEta] = useState(30);
  const [distance, setDistance] = useState(18);

  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  // 🔥 AUTO UPDATE (2 sec)
  useEffect(() => {
    const interval = setInterval(() => {

      setData([
        { name: "Week 1", risk: random(30, 60) },
        { name: "Week 2", risk: random(40, 70) },
        { name: "Week 3", risk: random(50, 90) },
        { name: "Week 4", risk: random(40, 80) },
        { name: "Week 5", risk: random(60, 95) }
      ]);

      setPieData([
        { name: "Low", value: random(20, 40) },
        { name: "Medium", value: random(30, 50) },
        { name: "High", value: random(20, 40) }
      ]);

      setHeatmapData([
        { area: "Delhi", risk: random(70, 100) },
        { area: "Mumbai", risk: random(50, 90) },
        { area: "Chennai", risk: random(40, 80) },
        { area: "Assam", risk: random(60, 95) }
      ]);

      setEta(prev => (prev > 0 ? prev - 1 : random(20, 40)));
      setDistance(prev => (prev > 0 ? (prev - 0.5).toFixed(2) : random(10, 25)));

    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const calculateRisk = () => random(40, 95);

  return (
    <div>

      {/* 🔥 TOP STATS */}
      <div className="grid">
        <Stat title="High Risk Areas" value={random(5, 20)} color="#ef4444" />
        <Stat title="Active Alerts" value={random(5, 15)} color="#f59e0b" />
        <Stat title="Resolved Cases" value={random(10, 30)} color="#22c55e" />
        <Stat title="Avg Response Time" value={`${random(20, 40)} min`} color="#2563eb" />
      </div>

      {/* 🔥 DASHBOARD */}
      <div className="dashboard">

        {/* 📈 LINE */}
        <div className="card">
          <h3>📈 Risk Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" label={{ value: "Time", position: "insideBottom", offset: -5 }} />
              <YAxis label={{ value: "Risk %", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#22c55e"
                strokeWidth={3}
                name="Risk Level"
              />

              <Area dataKey="risk" fill="#22c55e22" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔥 LIVE INSIGHTS */}
        <div className="card">
          <h3>🔥 Live Insights</h3>
          {heatmapData.map((item, i) => (
            <Progress key={i} label={item.area} value={item.risk} />
          ))}
        </div>

        {/* 📊 BAR */}
        <div className="card">
          <h3>📊 Area Risk</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="risk" fill="#22c55e" name="Risk %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🧁 PIE */}
        <div className="card">
          <h3>📍 Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={70}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* 🔥 SECOND SECTION */}
      <div className="grid" style={{ marginTop: "20px" }}>

        <div className="card big-card">
          <h3>🤖 AI Risk Score</h3>
          <div className="risk-circle">{calculateRisk()}</div>
          <p>Real-time AI prediction</p>
        </div>

        <div className="card">
          <h3>🚑 Live Tracking</h3>

          <div className="tracking-box">
            <p>📍 Distance</p>
            <h2>{distance} km</h2>
          </div>

          <div className="tracking-box">
            <p>⏱ ETA</p>
            <h2>{eta} mins</h2>
          </div>
        </div>

        <div className="card" style={{ gridColumn: "span 2" }}>
          <h3>🔥 Risk Heatmap</h3>

          {heatmapData.map((item, i) => (
            <div key={i} style={{ marginBottom: "12px" }}>
              <p>{item.area}</p>
              <div style={{ background: "#eee", borderRadius: "10px" }}>
                <div style={{
                  width: `${item.risk}%`,
                  background:
                    item.risk > 80 ? "#ef4444" :
                    item.risk > 60 ? "#f59e0b" :
                    "#22c55e",
                  color: "white",
                  padding: "6px",
                  borderRadius: "10px"
                }}>
                  {item.risk}%
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

const Stat = ({ title, value, color }) => (
  <div className="card stat">
    <p>{title}</p>
    <h2 style={{ color }}>{value}</h2>
  </div>
);

const Progress = ({ label, value }) => (
  <div className="progress">
    <p>{label}</p>
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${value}%` }}>
        {value}%
      </div>
    </div>
  </div>
);

export default Prediction;