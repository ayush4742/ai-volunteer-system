import React, { useState } from "react";
import axios from "axios";

const Prediction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/predict");
      setData(res.data.predictions);
    } catch (err) {
      console.log("Prediction error:", err);
      alert("Failed to get predictions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          backgroundColor: '#064E3B',
          color: 'white',
          padding: '15px 30px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '30px',
          fontFamily: 'Times New Roman, serif',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#042f24')}
        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#064E3B')}
      >
        {loading ? "Analyzing..." : "Get Crisis Predictions"}
      </button>

      {data.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {data.map((p, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: `5px solid ${p.risk === 'High risk' ? '#F44336' : '#FF9800'}`
            }}>
              <h3 style={{
                color: p.risk === 'High risk' ? '#F44336' : '#FF9800',
                marginBottom: '10px'
              }}>
                {p.risk}
              </h3>
              <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <b>Location:</b> {p.location}<br/>
                <b>Issue:</b> {p.issue}<br/>
                <b>Message:</b> {p.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prediction;
