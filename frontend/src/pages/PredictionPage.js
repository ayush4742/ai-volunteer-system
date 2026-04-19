import React from 'react';
import Prediction from '../components/Prediction';

const PredictionPage = () => {
  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '320px'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Prediction Insights</p>
          <h1 className="hero-title">Future Risks, Displayed Clearly</h1>
          <p className="hero-subtitle">
            Access AI-driven crisis patterns and forecasts to make proactive decisions before emergencies escalate.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card">
          <Prediction />
        </div>
      </div>
    </>
  );
};

export default PredictionPage;