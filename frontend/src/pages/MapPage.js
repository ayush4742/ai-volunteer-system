import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MapView from "../components/MapView";

const MapPage = () => {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const location = useLocation();
  const route = location.state?.route || [];

  useEffect(() => {
    fetch("http://localhost:5000/api/problem")
      .then(res => res.json())
      .then(setProblems);

    fetch("http://localhost:5000/api/volunteer")
      .then(res => res.json())
      .then(setVolunteers);
  }, []);

  return (
    <div className="page-content">
      <div className="page-card" style={{ padding: "20px" }}>
        <div style={{ height: "500px" }}>
          <MapView
            problems={problems || []}
            volunteers={volunteers || []}
            route={route}
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;