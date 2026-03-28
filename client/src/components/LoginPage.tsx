import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess: (user: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <div className="auth-container">
      <div className="glass-card text-center">
        
        <div className="mb-4">
          <div className="d-inline-flex justify-content-center align-items-center rounded-circle bg-primary bg-opacity-25" style={{ width: '80px', height: '80px' }}>
            <i className="bi bi-shield-lock-fill text-primary" style={{ fontSize: '2.5rem' }}></i>
          </div>
        </div>
        
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Log in to your account to continue</p>
        
        {error && (
          <div className="alert alert-danger bg-danger bg-opacity-25 border-danger text-light mb-4" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="text-start">
          <div className="form-floating mb-3">
            <input 
              type="email" 
              className="form-control" 
              id="floatingInput" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input 
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input bg-transparent border-secondary" type="checkbox" value="" id="rememberMe" />
              <label className="form-check-label text-muted" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary text-decoration-none fw-medium" style={{ fontSize: '0.9rem' }}>Forgot password?</a>
          </div>

          <button 
            type="submit" 
            className="btn btn-gradient w-100 mb-4" 
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authenticating...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div className="divider">Or continue with</div>
        
        <div className="d-flex gap-3 justify-content-center mt-3">
          <button className="btn social-btn flex-grow-1 py-2">
            <i className="bi bi-google me-2"></i> Google
          </button>
          <button className="btn social-btn flex-grow-1 py-2">
            <i className="bi bi-github me-2"></i> Github
          </button>
        </div>
        
        <p className="text-muted mt-4 mb-0">
          Don't have an account? <a href="#" className="text-primary text-decoration-none fw-semibold">Register here</a>
        </p>

        {/* Small hint for test credentials */}
        <div className="mt-4 pt-3 border-top border-secondary opacity-50 text-muted" style={{ fontSize: '0.8rem' }}>
          Test Credentials:<br/>
          admin@example.com / admin123
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
