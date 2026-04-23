import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapView from "../components/MapView";

const MapPage = () => {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const location = useLocation();
  const route = location.state?.route || [];
  const result = location.state?.result;   // 🔥 ADD THIS

  useEffect(() => {
    fetch("http://localhost:5000/api/problem")
      .then(res => res.json())
      .then(setProblems);

    fetch("http://localhost:5000/api/volunteer")
      .then(res => res.json())
      .then(setVolunteers);
  }, []);

  return (
  <div className="page-content">
    <div className="page-card" style={{ padding: "20px" }}>

      {/* 🔥 RESULT UI (YAHAN ADD KARNA HAI) */}
      {result && (
  <div style={{
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  }}>
    <h3 style={{ color: '#064E3B', marginBottom: '20px' }}>
      Match Result
    </h3>

    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '20px'
    }}>
      <div>
        <h4 style={{ color: '#F44336' }}>Problem Details</h4>
        <p><b>Title:</b> {result.problem}</p>
        <p><b>Location:</b> {result.location}</p>
        <p><b>Priority:</b> {result.priority}</p>
      </div>

      <div>
        <h4 style={{ color: '#0F766E' }}>Assigned Volunteer</h4>
        <p><b>Name:</b> {result.assignedVolunteer}</p>
        <p><b>Skills:</b> {result.volunteerSkills?.join(", ")}</p>
        <p><b>Rating:</b> ⭐ {result.volunteerRating}</p>
      </div>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ color: '#064E3B' }}>
        Match Score: {result.score}/10
      </h4>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '10px'
      }}>
        <p><b>Skill Match:</b> {result.breakdown?.skill}</p>
        <p><b>Location Match:</b> {result.breakdown?.location}</p>
        <p><b>Priority:</b> {result.breakdown?.priority}</p>
        <p><b>Rating:</b> {result.breakdown?.rating}</p>
        <p><b>Availability:</b> {result.breakdown?.availability}</p>
      </div>
    </div>

    <div style={{ marginBottom: '20px' }}>
      <h4 style={{ color: '#064E3B' }}>🗺 Route Information</h4>
      <p><b>Distance:</b> {result.distance}</p>
      <p><b>Estimated Time:</b> {result.eta}</p>
    </div>

    <p style={{
      color: "blue",
      fontWeight: "bold",
      textAlign: "center"
    }}>
      🚑 Volunteer is moving in real-time...
    </p>

    <p style={{
      color: "green",
      fontWeight: "bold",
      textAlign: "center"
    }}>
      {result.status}
    </p>

    <p style={{
      fontStyle: "italic",
      color: "#666",
      textAlign: "center"
    }}>
      <b>Decision Reason:</b> {result.reason}
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

export default MapPage;