const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');

const router = express.Router();
const db = new Pool({ 
    user: 'Sivasaran', 
    host: 'localhost', 
    database: 'Sivasaran', 
    password: 'password', 
    port: 5432 
});

// Multer configuration for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

// POST route to handle file upload and data insertion
router.post('/', upload.single('file'), async (req, res) => {
    const { name, email, password } = req.body;
    const file = req.file;

    try {
        // Insert data into the database including email and password
        await db.query('INSERT INTO sample_ppt (name, email, password, file_path) VALUES ($1, $2, $3, $4)', 
            [name, email, password, file.filename]);
        res.status(201).json({ message: `Hello, ${name}!`, fileUrl: file.filename });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
    }
});

// GET route to fetch all records
router.get('/records', async (req, res) => {
    try {
        // Fetch name, email, password, and file_path
        const result = await db.query('SELECT id, name, email, password, file_path FROM sample_ppt');
        res.status(200).json(result.rows);
        console.log(result.rows);
    } catch (err) {
        console.error('Error fetching records:', err);
        res.status(500).send('Error fetching records');
    }
});

module.exports = router;
