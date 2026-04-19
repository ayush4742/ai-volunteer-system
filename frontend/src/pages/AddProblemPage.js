import React from 'react';
import AddProblem from '../components/AddProblem';

const AddProblemPage = () => {
  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '320px'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Report Help · Save Lives</p>
          <h1 className="hero-title">Report a Problem</h1>
          <p className="hero-subtitle">
            Share location details and urgent needs so volunteers can act quickly and safely.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card form-card">
          <AddProblem onAdd={() => window.location.reload()} />
        </div>
      </div>
    </>
  );
};

export default AddProblemPage;