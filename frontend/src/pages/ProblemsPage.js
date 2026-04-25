import React from 'react';
import ProblemList from '../components/ProblemList';

const ProblemsPage = () => {

  // 🔥 same image jo tu card me use kar raha hai (Medical Assistance)
  const heroImage = "https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80";

  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: '280px',                 // ✅ fixed height
          backgroundSize: 'cover',
          backgroundPosition: 'top center' // 🔥 bottom se cut
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