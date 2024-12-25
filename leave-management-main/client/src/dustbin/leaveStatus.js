const express = require('express');
const pool = require('../config/db'); // Importing database connection pool
const router = express.Router();


  router.put('/put/leave-applications/:id', async (req, res) => {
    // const { id } = req.params;
    const { status, reject_reason, id } = req.body;
    try {
      await pool.query(
        'UPDATE leave_applications SET status = $1, reject_reason = $2 WHERE id = $3',
        [status, reject_reason || '', id]
      );
      res.send('Leave status updated successfully!!!');
    } catch (error) {
      console.error('Error updating leave status:', error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
