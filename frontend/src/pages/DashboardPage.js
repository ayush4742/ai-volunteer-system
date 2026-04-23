import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

import MapView from "../components/MapView";

const DashboardPage = () => {

  const [data, setData] = useState({
    totalVolunteers: 0,
    totalProblems: 0,
    availableVolunteers: 0,
    highPriorityProblems: 0
  });

  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [activities, setActivities] = useState([]);

  // 🔥 TIME FORMAT
  const getTimeAgo = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 60000);

    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} mins ago`;

    const hours = Math.floor(diff / 60);
    return `${hours} hrs ago`;
  };

  useEffect(() => {
  const interval = setInterval(() => {
    setData(prev => ({
      ...prev,
      totalVolunteers: prev.totalVolunteers + Math.floor(Math.random() * 2),
      totalProblems: prev.totalProblems + Math.floor(Math.random() * 2),
      availableVolunteers: prev.availableVolunteers + Math.floor(Math.random() * 2),
      highPriorityProblems: prev.highPriorityProblems + Math.floor(Math.random() * 1)
    }));
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboard = await fetch("http://localhost:5000/api/dashboard").then(res => res.json());
        const p = await fetch("http://localhost:5000/api/problem").then(res => res.json());
        const v = await fetch("http://localhost:5000/api/volunteer").then(res => res.json());

        setData(dashboard);
        setProblems(p);
        setVolunteers(v);

        // 🔥 ACTIVITY GENERATION
        const problemActivities = p.map(item => ({
          type: "problem",
          text: `🚨 Problem reported: ${item.title}`,
          time: getTimeAgo(item.createdAt || new Date())
        }));

        const volunteerActivities = v.map(item => ({
          type: "volunteer",
          text: `👤 New volunteer: ${item.name}`,
          time: getTimeAgo(item.createdAt || new Date())
        }));

        setActivities([...problemActivities, ...volunteerActivities].slice(0, 10));

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const barData = [
    { name: "Volunteers", value: data.totalVolunteers },
    { name: "Problems", value: data.totalProblems }
  ];

  const pieData = [
    { name: "Available", value: data.availableVolunteers },
    { name: "Busy", value: data.totalVolunteers - data.availableVolunteers }
  ];

  const COLORS = ["#0F766E", "#FF5722"];

  return (
    <div className="dashboard-wrapper">

      {/* 🔥 STATS */}
      <div className="stats-row">
        <StatCard title="Total Volunteers" value={data.totalVolunteers} />
        <StatCard title="Total Problems" value={data.totalProblems} />
        <StatCard title="Available Volunteers" value={data.availableVolunteers} />
        <StatCard title="High Priority" value={data.highPriorityProblems} danger />
      </div>

      {/* 🔥 CHARTS */}
      <div className="charts-row">

          {/* 🔥 PROBLEM ANALYSIS */}
          <div className="card">
            <div className="card-header">
              <h3>Problem Analysis</h3>
              <p>High vs Low priority insights</p>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={[
                { name: "Flood", high: 14, low: 10 },
                { name: "Medical", high: 8, low: 10 },
                { name: "Fire", high: 9, low: 3 },
                { name: "Food", high: 5, low: 10 },
                { name: "Shelter", high: 3, low: 6 },
                { name: "Other", high: 2, low: 7 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="high" fill="#DC2626" radius={[6,6,0,0]} />
                <Bar dataKey="low" fill="#065F46" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 VOLUNTEER STATUS */}
          <div className="card">
            <div className="card-header">
              <h3>Volunteer Status</h3>
              <p>Current deployment overview</p>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Available", value: data.availableVolunteers },
                    { name: "On Mission", value: 8 },
                    { name: "Standby", value: 5 }
                  ]}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#22C55E" />
                  <Cell fill="#3B82F6" />
                  <Cell fill="#F59E0B" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      {/* 🔥 MAP */}
      <div className="card map-box">
        <h3>Crisis Map</h3>
        <div style={{ height: "350px" }}>
          <MapView
            problems={problems}
            volunteers={volunteers}
            route={[]}
          />
        </div>
      </div>

      {/* 🔥 LOWER */}
      <div className="bottom-row">

        {/* AVAILABLE VOLUNTEERS */}
        <div className="card">
          <h3>Available Volunteers</h3>

          <div className="volunteer-grid">
            {volunteers
              .filter(v => v.availability === true)
              .map((v) => (
                <div key={v._id} className="volunteer-card">

                  <div className="avatar">
                    {v.name?.split(" ").map(n => n[0]).join("")}
                  </div>

                  <div>
                    <h4>{v.name}</h4>
                    <p>{v.skills?.[0]}</p>
                    <small>📍 {v.location}</small>
                  </div>

                </div>
              ))}
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="card">
          <h3>Recent Activity</h3>

          <div className="activity-list">
             {activities.slice(0, 6).map((a, i) => (
              <div key={i} className="activity-item">

                <div className={`activity-icon ${a.type}`}>
                  {a.type === "volunteer" ? "👤" : "🚨"}
                </div>

                <div>
                  <p>{a.text}</p>
                  <small>{a.time}</small>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🔥 PROBLEMS */}
      <div className="card">
  <h3>Recent Problems</h3>

  <div className="problem-grid">
    {problems// 🔥 limit 6
      .map((p) => (
        <div key={p._id} className="problem-card">

          {/* icon */}
          <div className="problem-icon">
            🚨
          </div>

          {/* info */}
          <div>
            <h4>{p.title}</h4>
            <p>{p.priority}</p>
            <small>📍 {p.location}</small>
          </div>

        </div>
      ))}
  </div>
</div>

    </div>
  );
};

/* 🔥 STAT CARD */
const StatCard = ({ title, value, danger }) => (
  <div className={`stat-box ${danger ? "danger" : ""}`}>
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

export default DashboardPage;