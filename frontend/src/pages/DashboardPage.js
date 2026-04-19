import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const DashboardPage = () => {
  const [data, setData] = useState({
    totalVolunteers: 0,
    totalProblems: 0,
    availableVolunteers: 0,
    highPriorityProblems: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.log('Dashboard fetch error:', err));
  }, []);

  const barData = [
    { name: 'Volunteers', value: data.totalVolunteers },
    { name: 'Problems', value: data.totalProblems }
  ];

  const pieData = [
    { name: 'Available', value: data.availableVolunteers },
    { name: 'Busy', value: data.totalVolunteers - data.availableVolunteers }
  ];

  const COLORS = ['#4CAF50', '#FF5722'];

  return (
    <>
      <div
        className="hero-banner"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)',
          minHeight: '340px'
        }}
      >
        <div className="hero-content">
          <p className="hero-tagline">Dashboard · Operations · Insight</p>
          <h1 className="hero-title">Crisis Intelligence at a Glance</h1>
          <p className="hero-subtitle">
            Track volunteer deployment, problem severity, and availability trends with a clean analytics dashboard designed for fast decision-making.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="page-card">
          <div className="section-grid section-grid-2">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Total Volunteers</h3>
              <p style={{ fontSize: '3rem', fontWeight: '700' }}>{data.totalVolunteers}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Total Problems</h3>
              <p style={{ fontSize: '3rem', fontWeight: '700' }}>{data.totalProblems}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#1B5E20', marginBottom: '10px' }}>Available Volunteers</h3>
              <p style={{ fontSize: '3rem', fontWeight: '700', color: '#4CAF50' }}>{data.availableVolunteers}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: data.highPriorityProblems > 0 ? '#F44336' : '#1B5E20', marginBottom: '10px' }}>High Priority</h3>
              <p style={{ fontSize: '3rem', fontWeight: '700', color: data.highPriorityProblems > 0 ? '#F44336' : '#111825' }}>{data.highPriorityProblems}</p>
            </div>
          </div>
        </div>

        <div className="section-grid section-grid-2 page-section">
          <div className="page-card">
            <h2 className="page-title">Comparison Analysis</h2>
            <BarChart width={520} height={320} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </div>
          <div className="page-card">
            <h2 className="page-title">Volunteer Distribution</h2>
            <PieChart width={520} height={320}>
              <Pie
                data={pieData}
                cx={260}
                cy={160}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;