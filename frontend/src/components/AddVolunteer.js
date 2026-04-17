import React, { useState } from "react";
import axios from "axios";

const AddVolunteer = () => {
  const [data, setData] = useState({
    name: "",
    skills: "",
    location: "",
    availability: true,
    rating: 5
  });

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/volunteer/register", {
      ...data,
      skills: data.skills.split(",")
    });
    alert("Volunteer Added");
  };

  return (
    <div className="card">
      <h2>👤 Add Volunteer</h2>
      <input placeholder="Name" onChange={e => setData({...data, name: e.target.value})}/>
      <input placeholder="Skills" onChange={e => setData({...data, skills: e.target.value})}/>
      <input placeholder="Location" onChange={e => setData({...data, location: e.target.value})}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddVolunteer;