const express = require('express');
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

router.get('/', async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM register');
        res.json(users.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
router.post('/', async (req, res) => {
    console.log("Received Data:", req.body); // Debug incoming data
    const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = req.body;

    try {
        // SQL Query to insert data
        const query = `
            INSERT INTO register
            (name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *;
        `;

        // Execute the query
        const result = await pool.query(query, [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date]);

        // Respond with the newly created record
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to add user' });
    }
});
// // Update a user

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = req.body;

    try {
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
                 expiry_date = $9 
             WHERE id = $10 
             RETURNING *`,
            [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, id]
        );

        res.json(updatedUser.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
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

module.exports = router;
