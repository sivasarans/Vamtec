    const express = require('express');
    const { Pool } = require('pg');
    const cors = require('cors');
    const app = express();

    // Set up PostgreSQL connection pool
    const pool = new Pool({
    user: 'Sivasaran',
    host: 'localhost',
    database: 'Sivasaran',
    password: 'password',
    port: 5432,
    });

    app.use(cors());

    // Middleware for parsing JSON
    app.use(express.json());

    app.post('/login', async (req, res) => {
        const { user_id, password } = req.body;
      
        // Validate input fields
        if (!user_id || !password) {
          return res.status(400).json({ error: 'User_id and password are required' });
        }
      
        try {
          // Query the database for the user by user_id
          const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
          const user = result.rows[0];
      
          if (!user) {
            return res.status(401).json({ error: 'Invalid User_id. Please check and try again.' });
          }
      
          // Directly compare plain text password
          if (user.password !== password) {
            return res.status(401).json({ error: 'Incorrect password. Please check and try again.' });
          }
      
          // Successful login
          res.status(200).json({
            message: 'Login successful',
            user: { 
              id: user.id, 
              name: user.name, 
              role: user.role_name, 
              user_id: user_id,
              email: user.email,  // You can add more fields if needed
            },
          });
        } catch (err) {
          // Log unexpected errors
          console.error('Unexpected error:', err);
          res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
        }
      });
      
    // Start the server
    app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
    });
