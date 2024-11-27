const express = require('express');
const cors = require('cors');
const multer = require('multer');//--------------------------------------------------------------
const path = require('path');//--------------------------------------------------------------
const { Pool } = require('pg');

const app = express();

const db_connection = new Pool({
  user: 'Sivasaran',
  host: 'localhost',
  database: 'Sivasaran',
  password: 'password',
  port: 5432,
});

// Configure multer for file uploads    //--------------------------------------------------------------
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

app.post('/sample', upload.single('file'), async (req, res) => {
  const { name } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('File not provided');
  }

  console.log(`Received name: ${name}`);
  console.log(`Uploaded file: ${file.filename}`);

  try {
    await db_connection.query('INSERT INTO sample_ppt (name, file_path) VALUES ($1, $2)', [
      name,
      file.filename,
    ]);
    res.status(201).json({ message: `Hello, ${name}! Data inserted successfully.`, fileUrl: file.filename });
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error executing query');
  }
});

app.get('/records', async (req, res) => {
  try {
    const result = await db_connection.query('SELECT id, name, file_path FROM sample_ppt');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching records', err.stack);
    res.status(500).send('Error fetching records');
  }
});


app.listen(5555, () => {

  console.log('Server is running on port 5555');
});
