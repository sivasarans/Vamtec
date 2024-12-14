const express = require('express');
const { Pool } = require('pg');
const XLSX = require('xlsx');
const { Parser } = require('json2csv'); // Required for CSV generation
const cors = require('cors');
const app = express();
const port = 5000;

// PostgreSQL connection pool
const pool = new Pool({ user: 'Sivasaran', host: 'localhost', database: 'Sivasaran', password: 'password', port: 5432 });

app.use(cors());

// Route to export LeaveRequests data to Excel or CSV based on format
app.get('/download-leave-requests', async (req, res) => {
  const format = req.query.format || 'excel'; // Default to 'excel' if no format is specified

  try {
    // Query the database to get the LeaveRequests data
    const result = await pool.query('SELECT * FROM LeaveRequests');
    const data = result.rows;

    if (format === 'excel') {
      // Generate Excel file
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Leave Requests');

      // Write the workbook to a buffer
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      // Set response headers for Excel download
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=LeaveRequests.xlsx');

      // Send the Excel file as a response
      res.send(excelBuffer);
    } else if (format === 'csv') {
      // Generate CSV file
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(data);

      // Set response headers for CSV download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=LeaveRequests.csv');

      // Send the CSV file as a response
      res.send(csv);
    } else {
      res.status(400).send('Invalid format');
    }
  } catch (err) {
    console.error('Error downloading LeaveRequests:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
