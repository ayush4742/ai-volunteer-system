import React from 'react';
import ProblemList from '../components/ProblemList';

const ProblemsPage = () => {
  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '75vh'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Problem Management</p>
          <h1 className="hero-title">Problems & Requests</h1>
          <p className="hero-subtitle">
            Review current problems and match volunteers fast so every emergency receives the right support.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card">
          <ProblemList />
        </div>
      </div>
    </>
  );
};

export default ProblemsPage;