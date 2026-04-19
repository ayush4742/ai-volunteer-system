import React, { useEffect, useState } from 'react';
import MapView from '../components/MapView';

const MapPage = () => {
  const [problems, setProblems] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [route] = useState([]);

  const fetchData = async () => {
    try {
      const p = await fetch("http://localhost:5000/api/problem").then(res => res.json());
      const v = await fetch("http://localhost:5000/api/volunteer").then(res => res.json());

      setProblems(p);
      setVolunteers(v);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '280px'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Geospatial Response</p>
          <h1 className="hero-title">Crisis Map</h1>
          <p className="hero-subtitle">
            Explore active problem locations and volunteer movement on a responsive map designed for clarity.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card" style={{ padding: '20px' }}>
          <MapView
            problems={problems}
            volunteers={volunteers}
            route={route}
          />
        </div>
      </div>
    </>
  );
};

export default MapPage;