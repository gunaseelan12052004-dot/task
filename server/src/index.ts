import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Login endpoint
app.post('/api/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Simple mock authentication (replace with DB check later)
  if (email === 'admin@example.com' && password === 'admin123') {
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User'
      }
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid email or password' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
