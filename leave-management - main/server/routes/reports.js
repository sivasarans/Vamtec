const express = require('express');
const XLSX = require('xlsx');
const { Parser } = require('json2csv');
const pool = require('../config/db'); // Importing database connection pool

const router = express.Router();

// Route to export LeaveRequests data to Excel or CSV
router.get('/', async (req, res) => {
  const format = req.query.format || 'excel';

  try {
    const result = await pool.query('SELECT * FROM LeaveRequests');
    const data = result.rows;

    if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leave Requests');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=LeaveRequests.xlsx');
      res.send(excelBuffer);
    } else if (format === 'csv') {
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(data);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=LeaveRequests.csv');
      res.send(csv);
    } else {
      res.status(400).send('Invalid format');
    }
  } catch (err) {
    console.error('Error downloading LeaveRequests:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
