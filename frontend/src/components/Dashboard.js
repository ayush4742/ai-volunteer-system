import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log("Dashboard error:", err));
  }, []);

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Total Volunteers</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B5E20' }}>{data.totalVolunteers || 0}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Total Problems</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1B5E20' }}>{data.totalProblems || 0}</p>
        </div>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Available Volunteers</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>{data.availableVolunteers || 0}</p>
        </div>
        <div style={{
          backgroundColor: data.highPriorityProblems > 0 ? '#FFEBEE' : 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          border: data.highPriorityProblems > 0 ? '2px solid #F44336' : 'none'
        }}>
          <h3 style={{
            color: data.highPriorityProblems > 0 ? '#F44336' : '#1B5E20',
            marginBottom: '10px'
          }}>
            High Priority Problems
          </h3>
          <p style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: data.highPriorityProblems > 0 ? '#F44336' : 'inherit'
          }}>
            {data.highPriorityProblems || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;