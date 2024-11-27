const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5555;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const samplePptRoutes = require('./src/backend/sample_ppt');
app.use('/sample_ppt', samplePptRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
