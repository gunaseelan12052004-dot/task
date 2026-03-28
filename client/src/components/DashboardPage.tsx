import React from 'react';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Clients', value: '200', icon: 'bi-graph-up', color: '#22c55e', bgColor: '#f0fdf4' },
    { label: 'Total Properties', value: '10', icon: 'bi-graph-up', color: '#22c55e', bgColor: '#f0fdf4' },
    { label: 'Total Inspections', value: '2', icon: 'bi-graph-down', color: '#ef4444', bgColor: '#fef2f2' },
    { label: 'Pending Inspections', value: '2', icon: 'bi-bar-chart-line', color: '#eab308', bgColor: '#fefce8' },
    { label: 'Closed Inspections', value: '10', icon: 'bi-clipboard-data', color: '#eab308', bgColor: '#fefce8' }
  ];

  const quickActions = [
    { label: 'Create Inspection', icon: 'bi-pencil-square' },
    { label: 'Add Property', icon: 'bi-plus-lg' },
    { label: 'Add Agent', icon: 'bi-plus-lg' },
    { label: 'Add Inspector', icon: 'bi-plus-lg' }
  ];

  const recentActivity = [
    { id: 'INSP - 10245', property: 'Greenview apartme...', agent: 'Bluenest reality', inspector: 'John mathews', status: 'Pending', time: '2 mins ago', action: 'View', badgeClass: 'badge-pending' },
    { id: 'INSP - 10244', property: 'Palm residency - Villa', agent: 'Urbankey estates', inspector: 'Sarah collins', status: 'Assigned', time: '1 hour ago', action: 'View', badgeClass: 'badge-assigned' },
    { id: 'INSP - 10243', property: 'Lakeview towers', agent: 'Bluenest reality', inspector: 'Mark robinson', status: 'Active', time: 'Today, 11.30 AM', action: 'View', badgeClass: 'badge-active' },
    { id: 'INSP - 10242', property: 'Maple street house', agent: 'Primelet agents', inspector: 'Emma watson', status: 'Completed', time: '2 days ago', action: 'View Report', badgeClass: 'badge-completed' },
    { id: 'INSP - 10243', property: 'Sunrise commercial complex', agent: 'Urbankey estates', inspector: 'David lee', status: 'Closed', time: '3 days ago', action: 'View', badgeClass: 'badge-closed' },
    { id: 'INSP - 10242', property: 'Oakwood cottage', agent: 'Primelet agents', inspector: 'Emma watson', status: 'Cancelled', time: '5 days ago', action: 'View', badgeClass: 'badge-cancelled' }
  ];

  return (
    <div className="dashboard-container">
      {/* Stats Section */}
      <div className="stats-grid mb-5">
        {stats.map((stat, i) => (
          <div className="stat-card" key={i}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-icon-wrapper" style={{ color: stat.color, backgroundColor: stat.bgColor, border: `1px solid ${stat.color}40` }}>
                <i className={`bi ${stat.icon}`}></i>
              </div>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <div className="stat-line" style={{ backgroundColor: stat.color }}></div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="mb-5">
        <h5 className="section-title">Quick actions</h5>
        <div className="quick-actions-grid">
          {quickActions.map((action, i) => (
            <div className="action-card" key={i}>
              <div className="action-icon">
                <i className={`bi ${action.icon}`}></i>
              </div>
              <span className="action-label">{action.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity-section">
        <h5 className="section-title">Recent Activity</h5>
        <div className="table-responsive bg-white rounded-3 shadow-sm border-0">
          <table className="table custom-table mb-0">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Property</th>
                <th>Agent</th>
                <th>Inspector</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((activity, i) => (
                <tr key={i}>
                  <td className="text-secondary">{activity.id}</td>
                  <td className="text-secondary">{activity.property}</td>
                  <td className="text-secondary">{activity.agent}</td>
                  <td className="text-secondary">{activity.inspector}</td>
                  <td>
                    <span className={`status-badge ${activity.badgeClass}`}>
                      {activity.status}
                    </span>
                  </td>
                  <td className="text-secondary">{activity.time}</td>
                  <td>
                    <a href="#" className="action-link">{activity.action}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
