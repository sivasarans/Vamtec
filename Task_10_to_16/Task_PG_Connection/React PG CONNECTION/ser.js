const express = require('express');
const app = express();

// Route to handle GET requests to '/greet/:name'
app.get('/greet/:name', (req, res) => {
  // Accessing the 'name' parameter from the URL
  const name = req.params.name; // The 'name' in the URL
  res.send(`Hello, ${name}!`);
});

// Starting the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
