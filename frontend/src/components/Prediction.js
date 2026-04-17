import React, { useState } from "react";
import axios from "axios";

const Prediction = () => {
  const [data, setData] = useState([]);

  const handlePredict = async () => {
    const res = await axios.get("http://localhost:5000/api/predict");
    setData(res.data.predictions);
  };

  return (
    <div className="card">
      <h2>🔮 Prediction</h2>
      <button onClick={handlePredict}>Get Prediction</button>

      {data.map((p, i) => (
        <p key={i}>{p.message}</p>
      ))}
    </div>
  );
};

export default Prediction;