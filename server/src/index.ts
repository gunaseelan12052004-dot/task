import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import pool from './db';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Register endpoint
app.post('/api/register', async (req: Request, res: Response) => {
  const { full_name, email, phone, password, conform_password } = req.body;

  if (password !== conform_password) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const [existingUsers]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert into uth_db.users
    await pool.execute(
      `INSERT INTO users 
      (email, password, conform_password, full_name, phone, role, is_active) 
      VALUES (?, ?, ?, ?, ?, 'user', true)`,
      [email, hashedPassword, hashedPassword, full_name || null, phone || null]
    );

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Internal server error during registration' });
  }
});

// Login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    // Securely compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({ 
        success: true, 
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          name: user.full_name || user.name
        }
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while logging in'
    });
  }
});

// Fetch all agents
app.get('/api/agents', async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM agents ORDER BY agent_id DESC');
    res.json({ success: true, count: (rows as any[]).length, data: rows });
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ success: false, message: 'Server error fetching agents' });
  }
});

// Delete an agent
app.delete('/api/agents/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result]: any = await pool.execute('DELETE FROM agents WHERE agent_id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }
    
    res.json({ success: true, message: 'Agent deleted successfully' });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ success: false, message: 'Server error deleting agent' });
  }
});

// Add a new agent
app.post('/api/agents', async (req: Request, res: Response) => {
  const { agent_name, company_name, email, phone, properties_count, inspections_count, status } = req.body;

  if (!agent_name || !company_name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, company, email and phone are required' });
  }

  try {
    const is_active = status === 'Active' ? 1 : 0;
    const dbStatus = status ? status.toLowerCase() : 'active';
    
    const [result]: any = await pool.execute(
      `INSERT INTO agents (agent_name, company_name, email, phone, properties_count, inspections_count, is_active, status, join_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
      [agent_name, company_name, email, phone, properties_count || 0, inspections_count || 0, is_active, dbStatus]
    );
    res.status(201).json({ success: true, message: 'Agent added successfully', agent_id: result.insertId });
  } catch (error: any) {
    console.error('Error adding agent:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Agent with this email or phone already exists.' });
    }
    res.status(500).json({ success: false, message: 'Server error adding agent' });
  }
});

// Update an agent
app.put('/api/agents/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { agent_name, company_name, email, phone, properties_count, inspections_count, status } = req.body;

  if (!agent_name || !company_name || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Name, company, email and phone are required' });
  }

  try {
    const is_active = status === 'Active' ? 1 : 0;
    const dbStatus = status ? status.toLowerCase() : 'active';
    
    const [result]: any = await pool.execute(
      `UPDATE agents 
       SET agent_name = ?, company_name = ?, email = ?, phone = ?, properties_count = ?, inspections_count = ?, is_active = ?, status = ?
       WHERE agent_id = ?`,
      [agent_name, company_name, email, phone, properties_count || 0, inspections_count || 0, is_active, dbStatus, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Agent not found' });
    }

    res.json({ success: true, message: 'Agent updated successfully' });
  } catch (error: any) {
    console.error('Error updating agent:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Agent with this email or phone already exists.' });
    }
    res.status(500).json({ success: false, message: 'Server error updating agent' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
