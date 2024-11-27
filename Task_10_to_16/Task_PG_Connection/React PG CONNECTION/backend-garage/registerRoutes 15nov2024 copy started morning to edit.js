const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const db = new Pool({
  user: 'Sivasaran',
  host: 'localhost',
  database: 'Sivasaran',
  password: 'password',
  port: 5432
});

// Fetch all countries
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

module.exports = router;
