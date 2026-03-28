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
      <aside className="admin-sidebar">
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
            <input type="text" placeholder="Search agents, Inspectors etc" className="search-input" />
          </div>

          <div className="header-actions">
            <button className="btn-icon position-relative border-0 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '12px' }}>
              <i className="bi bi-bell" style={{ color: '#10b981' }}></i>
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle" style={{ width: '8px', height: '8px', marginTop: '10px', marginLeft: '-12px' }}>
                <span className="visually-hidden">New alerts</span>
              </span>
            </button>
            <div className="user-profile shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '50px', padding: '0.4rem 1rem 0.4rem 0.4rem', border: '1px solid #f1f5f9' }}>
              <div className="avatar-wrapper" style={{ border: 'none', width: '36px', height: '36px', boxShadow: 'none' }}>
                <img 
                  src={profilePic} 
                  alt={user?.full_name || 'Dinesh Karthick'} 
                  className="avatar rounded-circle" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'Dinesh Karthick')}&background=random`;
                  }}
                />
              </div>
              <div className="user-info d-none d-md-flex flex-column justify-content-center" style={{ gap: '0px' }}>
                <p className="user-name mb-0" style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>{user?.full_name || 'Dinesh Karthick'}</p>
                <p className="user-role mb-0" style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{user?.role || 'Admin'}</p>
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
