import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapView from "../components/MapView";

const MapPage = () => {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  // 🔥 LIVE STATE
  const [liveEta, setLiveEta] = useState(null);
  const [liveDistance, setLiveDistance] = useState(null);

  const location = useLocation();
  const route = location.state?.route || [];
  const result = location.state?.result;

  useEffect(() => {
    fetch("https://ai-volunteer-system.onrender.com/api/problem")
      .then(res => res.json())
      .then(setProblems);

    fetch("https://ai-volunteer-system.onrender.com/api/volunteer")
      .then(res => res.json())
      .then(setVolunteers);
  }, []);

  // 🔥 INIT LIVE VALUES
  useEffect(() => {
    if (result) {
      const dist = parseFloat(result.distance);
      const eta = parseFloat(result.eta);

      setLiveDistance(dist);
      setLiveEta(eta);
    }
  }, [result]);

  // 🔥 LIVE DECREASING (SYNC FEEL)
  useEffect(() => {
    if (!liveEta || !liveDistance) return;

    const interval = setInterval(() => {
      setLiveEta(prev => (prev > 0 ? (prev - 1).toFixed(0) : 0));
      setLiveDistance(prev => (prev > 0 ? (prev - 0.3).toFixed(2) : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [liveEta]);

  return (
    <div className="page-content">
      <div className="page-card" style={{ padding: "20px" }}>

        {/* 🔥 RESULT UI */}
        {result && (
          <div className="fade-in">

            <h2 style={{
              textAlign: "center",
              color: "#064E3B",
              marginBottom: "20px"
            }}>
              🚀 Match Result
            </h2>

            {/* 🔴 + 🟢 */}
            <div className="grid-2">

              <div className="card red slide-left">
                <h4>🚨 Problem Details</h4>
                <p>📌 <b>{result.problem}</b></p>
                <p>📍 {result.location}</p>
                <p>⚡ {result.priority}</p>
              </div>

              <div className="card green slide-right">
                <h4>👤 Volunteer</h4>
                <p><b>{result.assignedVolunteer}</b></p>
                <p>🛠 {result.volunteerSkills?.join(", ")}</p>
                <p>⭐ {result.volunteerRating}</p>
              </div>

            </div>

            {/* ⭐ SCORE */}
            <div className="score pulse">
              ⭐ {result.score}/10 Match Score
            </div>

            {/* 📊 */}
            <div className="mini-grid">
              <MiniBox label="Skill" value={result.breakdown?.skill} />
              <MiniBox label="Location" value={result.breakdown?.location} />
              <MiniBox label="Priority" value={result.breakdown?.priority} />
              <MiniBox label="Rating" value={result.breakdown?.rating} />
              <MiniBox label="Availability" value={result.breakdown?.availability} />
            </div>

            {/* 🚑 LIVE ROUTE */}
            <div className="route-live">
              <RouteBox title="📍 Distance" value={`${liveDistance} km`} />
              <RouteBox title="⏱ ETA" value={`${liveEta} mins`} />
            </div>

            {/* 🚑 LIVE TEXT */}
            <p className="live-text">
              🚑 Volunteer is moving in real-time...
            </p>

            <p className="status">
              {result.status}
            </p>

            <p className="reason">
              {result.reason}
            </p>

          </div>
        )}

        {/* 🗺 MAP */}
        <div style={{ height: "500px" }}>
          <MapView
            problems={problems || []}
            volunteers={volunteers || []}
            route={route}
          />
        </div>

      </div>
    </div>
  );
};


// 🔹 COMPONENTS
const MiniBox = ({ label, value }) => (
  <div className="mini-box">
    <p>{label}</p>
    <b>{value}</b>
  </div>
);

const RouteBox = ({ title, value }) => (
  <div className="route-box">
    <p>{title}</p>
    <h3>{value}</h3>
  </div>
);

export default MapPage;