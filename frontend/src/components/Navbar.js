import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/add-problem', label: 'Add Problem' },
    { path: '/add-volunteer', label: 'Add Volunteer' },
    { path: '/problems', label: 'Problems' },
    { path: '/prediction', label: 'Prediction' },
    { path: '/map', label: 'Crisis Map' },
  ];

  return (
    <nav style={{
      backgroundColor: '#064E3B',
      padding: '10px 20px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '24px',
          fontWeight: 'bold',
          fontFamily: 'Times New Roman, serif'
        }}>
          AI Crisis Management
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background-color 0.3s',
                backgroundColor: location.pathname === item.path ? '#5EEAD4' : 'transparent',
                fontFamily: 'Times New Roman, serif'
              }}
              onMouseOver={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = '#0F766E';
                }
              }}
              onMouseOut={(e) => {
                if (location.pathname !== item.path) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
