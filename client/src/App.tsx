import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminLayout from './components/AdminLayout';
import AgentsPage from './components/AgentsPage';
import DashboardPage from './components/DashboardPage';
import PlaceholderPage from './components/PlaceholderPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    // State updates in React are async, so navigate to /dashboard and let the Route handle it
    setTimeout(() => navigate('/dashboard'), 0);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Admin Routes */}
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            <AdminLayout user={user} onLogout={handleLogout}>
              <DashboardPage />
            </AdminLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
      
      <Route 
        path="/agents" 
        element={
          isAuthenticated ? (
            <AdminLayout user={user} onLogout={handleLogout}>
              <AgentsPage />
            </AdminLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route 
        path="/admin/:section" 
        element={
          isAuthenticated ? (
            <AdminLayout user={user} onLogout={handleLogout}>
              <PlaceholderWrapper />
            </AdminLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Small wrapper to extract the title from URL params
import { useParams } from 'react-router-dom';
const PlaceholderWrapper = () => {
  const { section } = useParams();
  const title = section ? section.charAt(0).toUpperCase() + section.slice(1) : 'Page';
  return <PlaceholderPage title={title} />;
};

export default App;
