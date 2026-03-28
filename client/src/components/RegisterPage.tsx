import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import solaceLogo from '../assets/solace logo.png';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    conform_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    if (formData.password !== formData.conform_password) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMsg('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="split-layout">
      {/* Left Panel: Register Form */}
      <div className="left-panel">
        <div className="form-container">
          <h2 className="welcome-title">Create an Account</h2>
          <p className="welcome-subtitle">Join Alphagnito today</p>

          {error && (
            <div className="alert alert-danger" role="alert" style={{ fontSize: '0.85rem', padding: '0.75rem' }}>
              <i className="bi bi-exclamation-circle-fill me-2"></i>{error}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success" role="alert" style={{ fontSize: '0.85rem', padding: '0.75rem' }}>
              <i className="bi bi-check-circle-fill me-2"></i>{successMsg}
            </div>
          )}

          <form onSubmit={handleRegister}>
            
            <div className="custom-floating-input">
              <input 
                type="text" 
                id="full_name" 
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
              <label htmlFor="full_name" className="custom-floating-label">Full Name</label>
            </div>

            <div className="custom-floating-input">
              <input 
                type="email" 
                id="email" 
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className="custom-floating-label">Email address</label>
            </div>

            <div className="custom-floating-input">
              <input 
                type="tel" 
                id="phone" 
                placeholder="+1 234 567 8900"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className="custom-floating-label">Phone Number</label>
            </div>

            <div className="custom-floating-input">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label htmlFor="password" className="custom-floating-label">Password</label>
              
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
              </button>
            </div>

            <div className="custom-floating-input" style={{ marginBottom: '2rem' }}>
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                id="conform_password" 
                placeholder="Confirm password"
                value={formData.conform_password}
                onChange={handleChange}
                required
              />
              <label htmlFor="conform_password" className="custom-floating-label">Confirm Password</label>
              
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="Toggle password visibility"
              >
                {showConfirmPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
              </button>
            </div>

            <button 
              type="submit" 
              className="btn-login mb-4" 
              disabled={loading}
            >
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Registering...</>
              ) : (
                'Register'
              )}
            </button>
            
            <p className="text-center text-muted" style={{ fontSize: '0.85rem' }}>
              Already have an account? <Link to="/" className="text-primary text-decoration-none fw-medium">Sign in here</Link>
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

export default RegisterPage;
