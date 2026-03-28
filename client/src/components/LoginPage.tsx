import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import solaceLogo from '../assets/solace logo.png';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="split-layout">
      {/* Left Panel: Login Form */}
      <div className="left-panel">
        <div className="form-container">
          <h2 className="welcome-title">Welcome to Alphagnito</h2>
          <p className="welcome-subtitle">Sign in to your account</p>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ fontSize: '0.85rem', padding: '0.75rem' }}>
              <i className="bi bi-exclamation-circle-fill me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            
            <div className="custom-floating-input">
              <input 
                type="email" 
                id="email" 
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email" className="custom-floating-label">Email address</label>
            </div>

            <div className="custom-floating-input">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="1283920"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="custom-floating-label">Password</label>
              
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>

            <div className="options-row mb-5">
              <div className="form-check d-flex align-items-center gap-2">
                <input 
                  className="form-check-input mt-0" 
                  type="checkbox" 
                  id="rememberMe" 
                />
                <label className="form-check-label mb-0" htmlFor="rememberMe" style={{ fontSize: '0.85rem' }}>
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="btn-login mb-4" 
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...</>
              ) : (
                'Login'
              )}
            </button>
            
            <p className="text-center text-muted" style={{ fontSize: '0.85rem' }}>
              Don't have an account? <Link to="/register" className="text-primary text-decoration-none fw-medium">Register here</Link>
            </p>
            
          </form>
        </div>
      </div>

      {/* Right Panel: Logo Area */}
      <div className="right-panel right-container-bg d-none d-lg-flex">
        <img 
          src={solaceLogo} 
          alt="Solace Logo" 
          style={{ width: '40%', maxWidth: '300px', objectFit: 'contain' }}
        />
      </div>

    </div>
  );
};

export default LoginPage;
