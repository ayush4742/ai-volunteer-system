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

  const COLORS = ['#0F766E', '#FF5722'];

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
        {/* Summary Cards Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px 24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h3 style={{
              color: '#064E3B',
              marginBottom: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Total Volunteers</h3>
            <p style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#064E3B',
              margin: '0',
              lineHeight: '1'
            }}>{data.totalVolunteers}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px 24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h3 style={{
              color: '#064E3B',
              marginBottom: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Total Problems</h3>
            <p style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#064E3B',
              margin: '0',
              lineHeight: '1'
            }}>{data.totalProblems}</p>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '32px 24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h3 style={{
              color: '#064E3B',
              marginBottom: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Available Volunteers</h3>
            <p style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#0F766E',
              margin: '0',
              lineHeight: '1'
            }}>{data.availableVolunteers}</p>
          </div>

          <div style={{
            backgroundColor: data.highPriorityProblems > 0 ? '#FFEBEE' : 'white',
            padding: '32px 24px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'default',
            border: data.highPriorityProblems > 0 ? '2px solid #F44336' : 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h3 style={{
              color: data.highPriorityProblems > 0 ? '#F44336' : '#064E3B',
              marginBottom: '16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>High Priority Problems</h3>
            <p style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: data.highPriorityProblems > 0 ? '#F44336' : '#064E3B',
              margin: '0',
              lineHeight: '1'
            }}>{data.highPriorityProblems}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px'
        }}>
          {/* Bar Chart Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#064E3B',
              textAlign: 'center'
            }}>Comparison Analysis</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0'
            }}>
              <BarChart width={480} height={320} data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F5E8" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 14, fill: '#064E3B' }}
                  axisLine={{ stroke: '#064E3B' }}
                />
                <YAxis
                  tick={{ fontSize: 14, fill: '#064E3B' }}
                  axisLine={{ stroke: '#064E3B' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8F5E8',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#0F766E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          }}>
            <h2 style={{
              margin: '0 0 24px 0',
              fontSize: '1.8rem',
              fontWeight: '700',
              color: '#064E3B',
              textAlign: 'center'
            }}>Volunteer Distribution</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '16px 0'
            }}>
              <PieChart width={480} height={320}>
                <Pie
                  data={pieData}
                  cx={240}
                  cy={160}
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: '14px', fontWeight: '600' }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E8F5E8',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
