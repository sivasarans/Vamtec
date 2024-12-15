const express = require('express');
const pool = require('../config/db'); // Importing database connection pool
const router = express.Router();



  router.put('/', async (req, res) => {
    const { user_id, leave_type, leave_days } = req.body;
  
    // Ensure required fields are provided
    if (!user_id || !leave_type || !leave_days) {
      return res.status(400).send('User ID, leave type, and leave days are required');
    }
  
    try {
      // Update the leave balance by reducing the leave days
      const result = await pool.query(
        `UPDATE leave_data SET "${leave_type}" = "${leave_type}" - $1 
         WHERE user_id = $2 AND "${leave_type}" >= $1 
         RETURNING "${leave_type}"`, 
        [leave_days, user_id]
      );
  
      if (result.rows.length === 0) {
        return res.status(400).send('Insufficient leave balance or user not found');
      }
  
      const updatedBalance = result.rows[0][leave_type];  // Extract the updated leave balance
  
      res.status(200).json({
        message: `${leave_type} balance updated successfully. New balance: ${updatedBalance}`,
        data: { [leave_type]: updatedBalance },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error reducing leave balance');
    }
  });
  
  

module.exports = router;
