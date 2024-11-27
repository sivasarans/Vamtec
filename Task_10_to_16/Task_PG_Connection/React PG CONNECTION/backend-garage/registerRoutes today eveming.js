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



router.get('/countries', async (req, res) => {
    try {
        const result = await db.query('SELECT country_name FROM country');
        res.json(result.rows);  // Returns countries as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching countries' });
    }
});

// Fetch states for a given country
router.get('/states/:country', async (req, res) => {
    const { country } = req.params;  // Get country from URL
    try {
        const result = await db.query('SELECT state_name FROM state WHERE country_name = $1', [country]);
        res.json(result.rows);  // Returns states as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching states' });
    }
});


// Route to get all registered users
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM register');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching users');
    }
});

// Route to register a new user
router.post('/', async (req, res) => {
    const {
        name, organization, email, password, num_users,
        mobile, country_name, state_name, expiry_date
    } = req.body;

    try {
        const query = `
            INSERT INTO register (name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;
        `;
        const values = [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering user');
    }
});

// Route to get a specific user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM register WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching user');
    }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name, organization, email, password, num_users,
        mobile, country_name, state_name, expiry_date
    } = req.body;

    try {
        const query = `
            UPDATE register SET
            name = $1, organization = $2, email = $3, password = $4, num_users = $5, 
            mobile = $6, country_name = $7, state_name = $8, expiry_date = $9
            WHERE id = $10 RETURNING *;
        `;
        const values = [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM register WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
});

module.exports = router;
