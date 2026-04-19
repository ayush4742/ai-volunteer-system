import React, { useEffect, useState } from "react";
import axios from "axios";

const ProblemList = ({ onMatch, solvedProblemId }) => {
  const [problems, setProblems] = useState([]);
  const [result, setResult] = useState(null);
  const [loadingId, setLoadingId] = useState(null);
  const [tracking, setTracking] = useState(false);

  // 🔹 Fetch problems
  useEffect(() => {
    axios.get("http://localhost:5000/api/problem")
      .then(res => setProblems(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🚀 MATCH FUNCTION
  const handleMatch = async (id) => {
    try {
      setLoadingId(id);

      const res = await axios.post("http://localhost:5000/api/match", {
        problemId: id
      });

      console.log("FULL RESPONSE:", res.data);
      console.log("ROUTE:", res.data.route);

      setResult(res.data);

      // 🔥 send route to map
      if (onMatch) {
        onMatch(res.data.route || []);
      }

      setTracking(true);

    } catch (err) {
      console.error("MATCH ERROR:", err.response?.data || err.message);
      alert("Match failed ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="card">
      <h2>📋 Problems</h2>

      {problems.map((p) => (
        <div key={p._id} className="problem-item">
          <span>{p.title} - {p.location}</span>

          <button
            onClick={() => handleMatch(p._id)}
            disabled={loadingId === p._id || solvedProblemId === p._id}
          >
            {solvedProblemId === p._id
              ? "Solved ✅"
              : (loadingId === p._id ? "Matching..." : "Match")}
          </button>
        </div>
      ))}

      {/* 🔥 RESULT */}
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", borderTop: "1px solid #ccc" }}>
          <h3>🤖 Match Result</h3>

          <p><b>Problem:</b> {result.problem}</p>
          <p><b>Location:</b> {result.location}</p>
          <p><b>Priority:</b> {result.priority}</p>

          <p><b>Volunteer:</b> {result.assignedVolunteer}</p>
          <p><b>Skills:</b> {result.volunteerSkills?.join(", ")}</p>

          <p><b>Total Score:</b> {result.score}</p>

          <p><b>Distance:</b> {result.distance}</p>
          <p><b>ETA:</b> {result.eta}</p>

          {/* 🔥 LIVE STATUS */}
          {tracking && (
            <p style={{ color: "blue", fontWeight: "bold" }}>
              🚑 Volunteer is moving in real-time...
            </p>
          )}

          <h4>📊 Breakdown</h4>
          <p>Skill: {result.breakdown.skill}</p>
          <p>Location: {result.breakdown.location}</p>
          <p>Priority: {result.breakdown.priority}</p>
          <p>Rating: {result.breakdown.rating}</p>
          <p>Availability: {result.breakdown.availability}</p>

          <p><b>Reason:</b> {result.reason}</p>

          <p style={{ color: "green", fontWeight: "bold" }}>
            {result.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemList;