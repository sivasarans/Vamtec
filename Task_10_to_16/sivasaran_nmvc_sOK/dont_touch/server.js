const express = require('express');
const cors = require('cors');
const path = require('path');

const countryRoutes = require('./src/backend/countryRoutes'); // Import country routes
const stateRoutes = require('./src/backend/stateRoutes'); // Import state routes
const registerRoutes = require('./src/backend/registerRoutes'); // Import register routes (add this for user registration)
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));







app.use('/countries', countryRoutes);// Use country routes with '/countries' prefix
app.use('/states', stateRoutes);  // // Use state routes with '/states' prefix
app.use('/register', registerRoutes); // Use register routes with '/register' prefix







app.listen(5000, () => console.log('Server running on http://localhost:5000'));
