import React, { useState } from "react";
import axios from "axios";

const AddVolunteer = ({ onAdd }) => {
  const [data, setData] = useState({
    name: "",
    skills: "",
    location: "",
    availability: true,
    rating: 5
  });

  const handleAdd = async () => {
    await axios.post("https://ai-volunteer-system.onrender.com/api/volunteer/register", {
      ...data,
      skills: data.skills.split(",")
    });
    alert("Volunteer Registered Successfully!");
    setData({ name: "", skills: "", location: "", availability: true, rating: 5 });
    if (onAdd) onAdd();
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', color: '#064E3B' }}>
          Full Name
        </label>
        <input
          type="text"
          placeholder="e.g., John Doe"
          value={data.name}
          onChange={e => setData({...data, name: e.target.value})}
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
          Skills (comma-separated)
        </label>
        <input
          type="text"
          placeholder="e.g., cooking, driving, medical"
          value={data.skills}
          onChange={e => setData({...data, skills: e.target.value})}
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
          placeholder="e.g., Mumbai, India"
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
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontSize: '18px', color: '#064E3B' }}>
          Rating (1-5)
        </label>
        <input
          type="number"
          min="1"
          max="5"
          value={data.rating}
          onChange={e => setData({...data, rating: parseInt(e.target.value)})}
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
          Available
        </label>
        <input
          type="checkbox"
          checked={data.availability}
          onChange={e => setData({...data, availability: e.target.checked})}
          style={{ transform: 'scale(1.5)' }}
        />
      </div>
      <button
        onClick={handleAdd}
        style={{
          backgroundColor: '#064E3B',
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
        onMouseOver={(e) => e.target.style.backgroundColor = '#042f24'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#064E3B'}
      >
        Join as Volunteer
      </button>
    </div>
  );
};

export default AddVolunteer;
