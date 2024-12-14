const express = require('express');
const pool = require('../config/db'); // Import the database connection

const router = express.Router();

// Endpoint to get the user list for attendance
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Users');
    if (result.rows.length > 0) {
      res.status(200).json(result.rows); // Return the user list
    } else {
      res.status(404).json({ message: 'No users found.' });
    }
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Endpoint to add or update attendance
router.post('/', async (req, res) => {
  const { userId, date, inTime, outTime, name } = req.body;

  try {
    // Check if attendance for the given user and date already exists
    const result = await pool.query(
      'SELECT * FROM Attendance WHERE user_id = $1 AND date = $2',
      [userId, date]
    );

    if (result.rows.length > 0) {
      // Update existing attendance
      await pool.query(
        `UPDATE Attendance 
         SET in_time = $1, out_time = $2, updated_at = CURRENT_TIMESTAMP 
         WHERE user_id = $3 AND date = $4`,
        [inTime || '09:30:00', outTime || '17:00:00', userId, date]
      );
      res.status(200).json({ message: 'Attendance updated successfully.' });
    } else {
      // Insert new attendance record
      await pool.query(
        `INSERT INTO Attendance (user_id, name, date, in_time, out_time) 
         VALUES ($1, $2, $3, $4, $5)`,
        [userId, name, date, inTime || '09:30:00', outTime || '17:00:00']
      );
      res.status(200).json({ message: 'Attendance added successfully.' });
    }
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ message: 'Error updating attendance.' });
  }
});

module.exports = router;
