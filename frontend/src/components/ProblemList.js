import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔥 NEW

const ProblemList = ({ onMatch, solvedProblemId }) => {
  const [problems, setProblems] = useState([]);
  const [result, setResult] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [tracking, setTracking] = useState(false);

  const navigate = useNavigate(); // 🔥 NEW

  // 🔹 Fetch problems
  useEffect(() => {
    axios.get("https://ai-volunteer-system.onrender.com/api/problem")
      .then(res => setProblems(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🚀 MATCH FUNCTION
  const handleMatch = async (id) => {
    try {
      setLoadingId(id);

      const res = await axios.post("https://ai-volunteer-system.onrender.com/api/match", {
        problemId: id
      });

      console.log("FULL RESPONSE:", res.data);
      console.log("ROUTE:", res.data.route);

      setResult(res.data);

      // 🔥 route send to App
      if (onMatch) {
        onMatch(res.data.route || []);
      }

      setTracking(true);

      // 🔥 REDIRECT TO MAP PAGE
    navigate("/map", {
      state: {
        route: res.data.route || [],
        result: res.data   // 🔥 IMPORTANT
      }
    }); 

    } catch (err) {
      console.error("MATCH ERROR:", err.response?.data || err.message);
      alert("Match failed");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <h2 style={{ color: '#064E3B', marginBottom: '20px' }}>Active Problems</h2>

      {problems.map((p) => (
        <div key={p._id} style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#064E3B' }}>{p.title}</h3>
            <p style={{ margin: 0, color: '#666' }}>📍 {p.location}</p>
          </div>

          <button
            onClick={() => handleMatch(p._id)}
            disabled={loadingId === p._id || solvedProblemId === p._id}
            style={{
              backgroundColor: solvedProblemId === p._id ? '#0F766E' : '#064E3B',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: loadingId === p._id ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontFamily: 'Times New Roman, serif',
              transition: 'background-color 0.3s'
            }}
          >
            {solvedProblemId === p._id
              ? "Solved ✅"
              : (loadingId === p._id ? "Matching..." : "Find Match")}
          </button>
        </div>
      ))}

      {/* 🔥 RESULT */}
      {result && (
        <div style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h3 style={{ color: '#064E3B', marginBottom: '20px' }}>Match Result</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <h4 style={{ color: '#F44336', marginBottom: '10px' }}>Problem Details</h4>
              <p><b>Title:</b> {result.problem}</p>
              <p><b>Location:</b> {result.location}</p>
              <p><b>Priority:</b> {result.priority}</p>
            </div>
            <div>
              <h4 style={{ color: '#0F766E', marginBottom: '10px' }}>Assigned Volunteer</h4>
              <p><b>Name:</b> {result.assignedVolunteer}</p>
              <p><b>Skills:</b> {result.volunteerSkills?.join(", ")}</p>
              <p><b>Rating:</b> ⭐ {result.volunteerRating}</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#064E3B', marginBottom: '10px' }}>Match Score: {result.score}/10</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <p><b>Skill Match:</b> {result.breakdown.skill}</p>
              <p><b>Location Match:</b> {result.breakdown.location}</p>
              <p><b>Priority:</b> {result.breakdown.priority}</p>
              <p><b>Rating:</b> {result.breakdown.rating}</p>
              <p><b>Availability:</b> {result.breakdown.availability}</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#064E3B', marginBottom: '10px' }}>🗺️ Route Information</h4>
            <p><b>Distance:</b> {result.distance}</p>
            <p><b>Estimated Time:</b> {result.eta}</p>
          </div>

          {/* 🔥 LIVE STATUS */}
          {tracking && (
            <p style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: '18px',
              textAlign: 'center',
              padding: '10px',
              backgroundColor: '#E3F2FD',
              borderRadius: '8px'
            }}>
              🚑 Volunteer is moving in real-time...
            </p>
          )}

          <p style={{ color: "green", fontWeight: "bold", fontSize: '16px', textAlign: 'center' }}>
            {result.status}
          </p>

          <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center' }}>
            <b>Decision Reason:</b> {result.reason}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemList;
