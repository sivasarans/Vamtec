const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Utility to create folders
['users_profile', 'users_leave_attachments'].forEach(folder => 
  fs.mkdirSync(path.join(__dirname, 'uploads', folder), { recursive: true })
);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/download-leave-requests', require('./routes/reports'));
app.use('/login', require('./routes/login'));
app.use('/attandance', require('./routes/attandance'));
app.use('/add_user', require('./routes/adduser'));
app.listen(5000, () => console.log(`Server running at http://localhost:5000`));
