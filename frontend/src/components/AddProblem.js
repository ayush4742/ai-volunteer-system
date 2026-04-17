import React, { useState } from "react";
import axios from "axios";

const AddProblem = () => {
  const [data, setData] = useState({
    title: "",
    location: "",
    priority: "high"
  });

  const handleAdd = async () => {
    await axios.post("http://localhost:5000/api/problem/add", data);
    alert("Problem Added");
  };

  return (
    <div className="card">
      <h2>🚨 Add Problem</h2>
      <input placeholder="Title" onChange={e => setData({...data, title: e.target.value})}/>
      <input placeholder="Location" onChange={e => setData({...data, location: e.target.value})}/>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddProblem;