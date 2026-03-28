import { useState } from 'react';
import './App.css';
import LoginPage from './components/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLoginSuccess = (userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  return (
    <>
      {!isAuthenticated ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white text-center">
          <div>
            <h1 className="display-4 fw-bold mb-4 text-glow">Welcome, {user?.name || 'User'}!</h1>
            <p className="lead text-light mb-4">You have successfully logged in.</p>
            <button 
              className="btn btn-outline-light rounded-pill px-4 py-2"
              onClick={() => {
                setIsAuthenticated(false);
                setUser(null);
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
