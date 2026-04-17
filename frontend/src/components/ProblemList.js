import React, { useEffect, useState } from "react";
import axios from "axios";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/problem")
      .then(res => setProblems(res.data));
  }, []);

  const handleMatch = async (id) => {
    const res = await axios.post("http://localhost:5000/api/match", {
      problemId: id
    });
    setResult(res.data);
  };

  return (
    <div className="card">
      <h2>📋 Problems</h2>

      {problems.map((p) => (
        <div key={p._id} className="problem-item">
          <span>{p.title} - {p.location}</span>
          <button onClick={() => handleMatch(p._id)}>Match</button>
        </div>
      ))}

      {/* 🔥 MATCH RESULT FULL UPGRADE */}
      {result && (
        <div style={{ marginTop: "20px", padding: "10px", borderTop: "1px solid #ccc" }}>
          <h3>🤖 Match Result</h3>

          <p><b>Problem:</b> {result.problem}</p>
          <p><b>Location:</b> {result.location}</p>
          <p><b>Priority:</b> {result.priority}</p>

          <p><b>Volunteer:</b> {result.assignedVolunteer}</p>

          {/* 🔥 NEW */}
          <p><b>Skills:</b> {result.volunteerSkills?.join(", ")}</p>

          <p><b>Total Score:</b> {result.score}</p>

          {/* 🔥 BREAKDOWN */}
          <h4>📊 Score Breakdown</h4>
          <p>Skill: {result.breakdown.skill}</p>
          <p>Location: {result.breakdown.location}</p>
          <p>Priority: {result.breakdown.priority}</p>
          <p>Rating: {result.breakdown.rating}</p>
          <p>Availability: {result.breakdown.availability}</p>

          {/* 🔥 REASON */}
          <p><b>Reason:</b> {result.reason}</p>

          {/* 🔥 STATUS */}
          <p style={{ color: "green" }}>
            {result.status}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemList;