const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');

const app = express();
const db = new Pool({ user: 'Sivasaran', host: 'localhost', database: 'Sivasaran', password: 'password', port: 5432 });

const upload = multer({
  storage: multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      // console.log("File",file);console.log("req",req);console.log("cb",cb);
    cb(null, `${Date.now()}-${file.originalname}`);
    // console.log("cb updated ",cb);
    }})  });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/sample', upload.single('file'), async (req, res) => {
  const { name } = req.body;
  const file = req.file;
  // if (!file) return res.status(400).send('File not provided');

  try {
    await db.query('INSERT INTO sample_ppt (name, file_path) VALUES ($1, $2)', [name, file.filename]);
    res.status(201).json({ message: `Hello, ${name}!`, fileUrl: file.filename });
  } catch (err) {
    res.status(500).send('Error inserting data');
  }
});

app.get('/records', async (req, res) => {
  try {
    const result = await db.query('SELECT id, name, file_path FROM sample_ppt');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching records');
  }
});

app.listen(5555, () => console.log('Server running on port 5555'));
