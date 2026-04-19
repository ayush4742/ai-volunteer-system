import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1600&q=80)'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Real volunteers. Real problems. Real help.</p>
          <h1 className="hero-title">AI Crisis Management System</h1>
          <p className="hero-subtitle">
            A smart platform that connects real-world problems with the right volunteers instantly, using intelligent matching and predictive insights.
          </p>
          <div className="hero-actions">
            <Link className="hero-button primary" to="/add-problem">
              Report a Problem
            </Link>
            <Link className="hero-button secondary" to="/add-volunteer">
              Join as Volunteer
            </Link>
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="section-grid section-grid-3 home-feature-grid">
          <div className="card-hero home-feature-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80)' }}>
            <div className="card-hero-label">Food Distribution</div>
          </div>
          <div className="card-hero home-feature-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80)' }}>
            <div className="card-hero-label">Disaster Relief</div>
          </div>
          <div className="card-hero home-feature-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80)' }}>
            <div className="card-hero-label">Medical Assistance</div>
          </div>
        </div>

        <div className="page-section">
          <div className="page-card">
            <p className="hero-tagline">About the Platform</p>
            <h2 className="page-title">Helping communities faster, with less friction</h2>
            <p className="page-caption">
              The system solves the problem of slow, disconnected crisis response. People report urgent needs, volunteers sign up with their skills, and the platform makes the right match quickly.
            </p>
            <p className="page-caption">
              It works like this: someone reports a problem, the platform looks at location, skills, and availability, and then suggests volunteers that can help right away. That means faster assistance and clearer coordination when every minute counts.
            </p>
            <p className="page-caption">
              This is useful in the real world because it keeps help moving, avoids wasted effort, and gives responders a single place to track problems and volunteer status.
            </p>
          </div>
        </div>

        <div className="page-section">
          <p className="hero-tagline">Use cases</p>
          <h2 className="page-title">Real situations where help makes a difference</h2>
          <div className="scroll-row">
            <div className="scroll-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=900&q=80)' }}>
              <div className="scroll-card-label">Flood response</div>
            </div>
            <div className="scroll-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=900&q=80)' }}>
              <div className="scroll-card-label">Medical emergency</div>
            </div>
            <div className="scroll-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80)' }}>
              <div className="scroll-card-label">Food shortage</div>
            </div>
          </div>
        </div>

        <footer className="home-footer">
          <div>
            <p>© 2026 AI Crisis Management System</p>
            <p>Built for Google Solution Challenge</p>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;