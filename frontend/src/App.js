import React, { useEffect, useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AddProblem from "./components/AddProblem";
import AddVolunteer from "./components/AddVolunteer";
import ProblemList from "./components/ProblemList";
import Prediction from "./components/Prediction";
import MapView from "./components/MapView";

function App() {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [route, setRoute] = useState([]);

  // 🔥 Fetch data
  const fetchData = async () => {
    try {
      const p = await fetch("http://localhost:5000/api/problem").then(res => res.json());
      const v = await fetch("http://localhost:5000/api/volunteer").then(res => res.json());

      setProblems(p);
      setVolunteers(v);

    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>🚀 AI Crisis Management System</h1>

      <Dashboard />

      {/* ➕ Add */}
      <AddProblem onAdd={fetchData} />
      <AddVolunteer onAdd={fetchData} />

      {/* 🔥 MATCH + ROUTE */}
      <ProblemList 
        onMatch={(routeData) => {
          console.log("ROUTE RECEIVED:", routeData);
          setRoute(routeData || []);
        }}
      />

      <Prediction />

      {/* 🗺 MAP */}
      <div className="map-section">
        <h2>🗺 Crisis Map</h2>

        <MapView
          problems={problems}
          volunteers={volunteers}
          route={route}
        />
      </div>
    </div>
  );
}

export default App;