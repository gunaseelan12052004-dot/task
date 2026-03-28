import React from 'react';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Agents', value: '1,280', icon: 'bi-people', color: '#1e3a8a' },
    { label: 'Properties', value: '428', icon: 'bi-building', color: '#059669' },
    { label: 'Inspections', value: '85', icon: 'bi-search', color: '#ea580c' },
    { label: 'Total Revenue', value: '$24.5k', icon: 'bi-currency-dollar', color: '#7c3aed' }
  ];

  const recentActivity = [
    { title: 'New Agent Added', description: 'Agent Michael joined the team', time: '2 mins ago' },
    { title: 'Property Inspection', description: 'Inspection completed for Bluenest Reality', time: '1 hour ago' },
    { title: 'Agent Updated', description: 'Sophie updated her profile info', time: '3 hours ago' },
    { title: 'Audit Log', description: 'Admin Dinesh Karthick updated settings', time: '5 hours ago' }
  ];

  return (
    <div className="dashboard-container">
      <h2 className="mb-4">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {stats.map((stat, i) => (
          <div className="col-md-3" key={i}>
            <div className="stat-card shadow-sm border-0 rounded-3 p-4 bg-white h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted fw-semibold small text-uppercase">{stat.label}</span>
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  <i className={`bi ${stat.icon}`}></i>
                </div>
              </div>
              <h3 className="fw-bold mb-0">{stat.value}</h3>
              <p className="text-success small mb-0 mt-2">
                <i className="bi bi-arrow-up-short"></i> +5.2% from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Recent Activity */}
        <div className="col-md-6">
          <div className="activity-card shadow-sm border-0 rounded-3 p-4 bg-white h-100">
            <h5 className="fw-bold mb-4">Recent Activity</h5>
            <div className="activity-list">
              {recentActivity.map((activity, i) => (
                <div className="activity-item d-flex gap-3 mb-4 last-no-border" key={i}>
                  <div className="activity-indicator"></div>
                  <div className="activity-content">
                    <h6 className="mb-1 text-dark fw-semibold">{activity.title}</h6>
                    <p className="mb-0 text-muted small">{activity.description}</p>
                    <span className="text-muted smaller mt-1 d-block" style={{ fontSize: '0.75rem' }}>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Placeholder Chart Section */}
        <div className="col-md-6">
          <div className="chart-card shadow-sm border-0 rounded-3 p-4 bg-white h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <div className="chart-placeholder">
              <i className="bi bi-bar-chart-line display-1 text-muted opacity-25"></i>
              <h5 className="text-muted mt-3">Monthly Analytics</h5>
              <p className="text-muted small">Data visualization placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
