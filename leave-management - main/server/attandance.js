const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 6000;

// Create a new Pool instance to connect to the PostgreSQL database
const pool = new Pool({
  user: 'Sivasaran',         // Replace with your PostgreSQL username
  host: 'localhost',         // Host, typically localhost
  database: 'Sivasaran',     // Replace with your database name
  password: '',              // Replace with your password if applicable
  port: 5432,                // Default PostgreSQL port
});

app.use(cors());
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to get the user list for attendance
app.get('/users', async (req, res) => {
  try {
    // Query the Users table to get all users
    const result = await pool.query('SELECT * FROM Users');

    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Return the user list
      console.log(result.rows);
    } else {
      res.status(404).json({ message: 'No users found.' });
      console.log('No users found.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching users.' });

  }
});

app.post('/attendance', async (req, res) => {
  const { userId, date, inTime, outTime } = req.body;

  try {
    // Check if attendance for the given user and date already exists
    const result = await pool.query(
      'SELECT * FROM Attendance WHERE user_id = $1 AND date = $2',
      [userId, date]
    );

    if (result.rows.length > 0) {
      // If the attendance record exists, update it
      await pool.query(
        `UPDATE Attendance 
         SET in_time = $1, out_time = $2, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = $3 AND date = $4`,
        [inTime || '09:30:00', outTime || '17:00:00', userId, date]
      );
      return res.status(200).json({ message: 'Attendance updated successfully.' });
    } else {
      // If the attendance record does not exist, insert a new one
      await pool.query(
        `INSERT INTO Attendance (user_id, name, date, in_time, out_time) 
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, req.body.name, date, inTime || '09:30:00', outTime || '17:00:00']
      );
      return res.status(200).json({ message: 'Attendance added successfully.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating attendance.' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
