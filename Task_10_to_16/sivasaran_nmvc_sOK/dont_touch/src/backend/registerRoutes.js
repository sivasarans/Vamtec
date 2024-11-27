const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
    user: 'Sivasaran',
    host: 'localhost',
    database: 'Sivasaran',
    password: 'password',
    port: 5432,
});
const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    })
});


router.post('/',upload.single('file'), async (req, res) => {
    console.log("Received Data:", req.body); // Debug incoming data
    const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = req.body;
    const file = req.file;
    console.log("Received File:", req.file);

    try {
        // SQL Query to insert data
        const query = `
            INSERT INTO register
            (name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, file_path) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;

        // Execute the query
        const result = await pool.query(query, [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, file.filename]);

        // Respond with the newly created record
        res.status(201).json({ message: `Hello, ${name}!`, fileUrl: file.filename });    } 
        catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to add user' });
    }
});
// // Update a user




router.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM register');
        res.json(users.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// Delete a user
router.delete('/:id', async (req, res) => {

    const { id } = req.params;

    try {
        console.log('Deleting user with ID:', id);

        await pool.query('DELETE FROM register WHERE id = $1', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log('Unable to Deleting user with ID:', id);

        res.status(500).json({ error: 'Failed to delete user' });
    }
});

router.put('/:id', upload.single('file'), async (req, res) => {
    const { id } = req.params;
    const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = req.body;
    const file = req.file;
    console.log("Received File:", req.file);

    try {
        // If no file is uploaded, set filePath to null or existing value (to avoid errors)
        const filePath = file ? file.filename : null; 

        // Update query
        const updatedUser = await pool.query(
            `UPDATE register 
             SET name = $1, 
                 organization = $2, 
                 email = $3, 
                 password = $4, 
                 num_users = $5, 
                 mobile = $6, 
                 country_name = $7, 
                 state_name = $8, 
                 expiry_date = $9,
                 file_path = $10
             WHERE id = $11 
             RETURNING *`,
            [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, filePath, id]
        );

        res.status(201).json({ message: `Hello, ${name}!`, fileUrl: filePath });   

    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});


// router.put('/:id', upload.single('file'), async (req, res) => {
//     const { id } = req.params;
//     const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = req.body;
//     const file = req.file;
//     console.log("Received File:", req.file);
//     try {
//         const queryParams = [
//             name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date
//         ];
        
//         // Only append the file path if there's a new file
//         if (file) {
//             queryParams.push(file.filename); // Add the file filename if it's present
//         }

//         // Update user query
//         const updatedUser = await pool.query(
//             `UPDATE register 
//              SET name = $1, 
//                  organization = $2, 
//                  email = $3, 
//                  password = $4, 
//                  num_users = $5, 
//                  mobile = $6, 
//                  country_name = $7, 
//                  state_name = $8, 
//                  expiry_date = $9,
//                  ${file ? 'file_path = $10' : ''}
//              WHERE id = $11 
//              RETURNING *`,
//             file ? [...queryParams, id] : [...queryParams, id] // Append file if it's there
//         );

//         res.json(updatedUser.rows[0]); // Send updated user as response
//     } catch (err) {
//         console.error('Error updating data:', err);
//         res.status(500).json({ error: 'Failed to update user' });
//     }
// });



module.exports = router;
