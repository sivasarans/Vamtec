const express = require('express');
const router = express.Router();
const { Pool } = require('pg');  // Add `Pool` import for PostgreSQL connection
const cors = require('cors');

// PostgreSQL pool configuration
const db = new Pool({
    user: 'Sivasaran',
    host: 'localhost',
    database: 'Sivasaran',
    password: 'password',  // Replace 'password' with your actual password
    port: 5432
});

// Enable CORS globally for all routes
const app = express();
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON bodies for POST, PUT requests

// Fetch all registered users
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM register');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching registered users' });
    }
});

// Register a new user
router.post('/', async (req, res) => {
    const {
        name,
        organization,
        email,
        password,
        num_users,
        mobile,
        country_name,
        state_name,
        expiry_date,
        photo
    } = req.body;

    try {
        // Check if the country exists
        const countryResult = await db.query('SELECT * FROM country WHERE country_name = $1', [country_name]);

        if (countryResult.rows.length === 0) {
            return res.status(400).json({ error: 'Country does not exist' });
        }

        // Check if the state exists
        const stateResult = await db.query('SELECT * FROM state WHERE state_name = $1', [state_name]);

        if (stateResult.rows.length === 0) {
            return res.status(400).json({ error: 'State does not exist' });
        }

        // Insert new user into the register table
        const result = await db.query(
            `INSERT INTO register (name, organization, email, password, num_users, mobile, 
            country_name, state_name, expiry_date, photo) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, photo]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Edit an existing user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        organization,
        email,
        password,
        num_users,
        mobile,
        country_name,
        state_name,
        expiry_date,
        photo
    } = req.body;

    try {
        // Check if the country exists
        const countryResult = await db.query('SELECT * FROM country WHERE country_name = $1', [country_name]);

        if (countryResult.rows.length === 0) {
            return res.status(400).json({ error: 'Country does not exist' });
        }

        // Check if the state exists
        const stateResult = await db.query('SELECT * FROM state WHERE state_name = $1', [state_name]);

        if (stateResult.rows.length === 0) {
            return res.status(400).json({ error: 'State does not exist' });
        }

        // Update the user
        const result = await db.query(
            `UPDATE register SET name = $1, organization = $2, email = $3, password = $4, 
            num_users = $5, mobile = $6, country_name = $7, state_name = $8, expiry_date = $9, photo = $10
            WHERE id = $11 RETURNING *`,
            [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, photo, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM register WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting user' });
    }
});

module.exports = router;
