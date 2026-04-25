import React, { useState } from "react";
import axios from "axios";

const AddProblem = ({ onAdd }) => {
  const [data, setData] = useState({
    title: "",
    location: "",
    priority: "high"
  });

  const handleAdd = async () => {
    await axios.post("https://ai-volunteer-system.onrender.com/api/problem/add", data);
    alert("Problem Added Successfully!");
    setData({ title: "", location: "", priority: "high" });
    if (onAdd) onAdd();
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', color: '#064E3B' }}>
          Problem Title
        </label>
        <input
          type="text"
          placeholder="e.g., Food shortage in Delhi"
          value={data.title}
          onChange={e => setData({...data, title: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            marginBottom: '15px',
            fontFamily: 'Times New Roman, serif'
          }}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', color: '#064E3B' }}>
          Location
        </label>
        <input
          type="text"
          placeholder="e.g., Delhi, India"
          value={data.location}
          onChange={e => setData({...data, location: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            marginBottom: '15px',
            fontFamily: 'Times New Roman, serif'
          }}
        />
      </div>
      <div style={{ marginBottom: '30px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', color: '#064E3B' }}>
          Priority
        </label>
        <select
          value={data.priority}
          onChange={e => setData({...data, priority: e.target.value})}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            fontFamily: 'Times New Roman, serif'
          }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <button
        onClick={handleAdd}
        style={{
          backgroundColor: '#0F766E',
          color: 'white',
          padding: '15px 30px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          width: '100%',
          fontFamily: 'Times New Roman, serif',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0d5a4f'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#0F766E'}
      >
        Report Problem
      </button>
    </div>
  );
};

export default AddProblem;
