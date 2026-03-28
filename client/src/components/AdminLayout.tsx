import React from 'react';
import solaceLogo from '../assets/solace logo.png'; // Assuming same logo but scaled down
import profilePic from '../assets/Ellipse 6191.png';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css'; // We'll create specific CSS for this

interface AdminLayoutProps {
  children: React.ReactNode;
  user: any; // Passed from App state
  onLogout?: () => void;
}

const SIDEBAR_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: 'bi-grid' },
  { name: 'Agents', path: '/agents', icon: 'bi-person' },
  { name: 'Inspectors', path: '/admin/inspectors', icon: 'bi-person-badge' },
  { name: 'Properties', path: '/admin/properties', icon: 'bi-building' },
  { name: 'Inspections', path: '/admin/inspections', icon: 'bi-search' },
  { name: 'Reports', path: '/admin/reports', icon: 'bi-file-text' },
  { name: 'Audit Logs', path: '/admin/audit', icon: 'bi-journal-text' },
  { name: 'Settings', path: '/admin/settings', icon: 'bi-gear' }
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ backgroundColor: '#0f172a' }}>
        <div className="sidebar-header">
          <img src={solaceLogo} alt="Alphagnito Logo" className="sidebar-logo" />
          <h2 className="sidebar-brand">Alphagnito</h2>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.name} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  <i className={`bi ${item.icon} nav-icon`}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="admin-main">
        {/* Top Header */}
        <header className="admin-header">
          <div className="header-search">
            <i className="bi bi-search search-icon"></i>
            <input type="text" placeholder="Search agents" className="search-input" />
          </div>

          <div className="header-actions">
            <button className="btn-icon">
              <i className="bi bi-bell"></i>
            </button>
            <div className="user-profile">
              <div className="avatar-wrapper">
                <img 
                  src={profilePic} 
                  alt={user?.full_name || 'User'} 
                  className="avatar" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'Admin')}&background=random`;
                  }}
                />
              </div>
              <div className="user-info d-none d-md-block">
                <p className="user-name">{user?.full_name || 'Admin User'}</p>
                <p className="user-role">{user?.role || 'Admin'}</p>
              </div>
            </div>
            {onLogout && (
              <button 
                className="btn-icon" 
                onClick={onLogout} 
                title="Logout"
                style={{ marginLeft: '0.5rem', color: '#ef4444' }}
              >
                <i className="bi bi-box-arrow-right"></i>
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
