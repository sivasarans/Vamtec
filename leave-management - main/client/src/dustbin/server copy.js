const fs = require('fs');
const path = require('path');

// Paths to the folders you want to create
const profileFolderPath = path.join(__dirname, 'uploads', 'users_profile');
const leaveAttachmentsFolderPath = path.join(__dirname, 'uploads', 'users_leave_attachments');
console.log(profileFolderPath);
// Function to create the folders if they don't exist
function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Create folder recursively if not exists
  }
}

// Ensure the folders exist
ensureFolderExists(profileFolderPath);
ensureFolderExists(leaveAttachmentsFolderPath);

// Your Express server code
const express = require('express');
const cors = require('cors');
const reports = require('./routes/reports');
const login = require('./routes/login');
const attendance = require('./routes/attandance');
const addUser = require('./routes/adduser');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.use('/uploads/users_profile', express.static(profileFolderPath));
app.use('/uploads/users_leave_attachments', express.static(leaveAttachmentsFolderPath));

// Route declarations
app.use('/download-leave-requests', reports);
app.use('/login', login);
app.use('/attandance', attendance);
app.use('/add_user', addUser);  // Use the add_user route here


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
