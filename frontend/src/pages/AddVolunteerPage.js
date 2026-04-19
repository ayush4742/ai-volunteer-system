import React from 'react';
import AddVolunteer from '../components/AddVolunteer';

const AddVolunteerPage = () => {
  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '320px'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Volunteer First · Make an Impact</p>
          <h1 className="hero-title">Join as Volunteer</h1>
          <p className="hero-subtitle">
            Register your skills and availability to support real-world crisis response operations.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card form-card">
          <AddVolunteer onAdd={() => window.location.reload()} />
        </div>
      </div>
    </>
  );
};

export default AddVolunteerPage;