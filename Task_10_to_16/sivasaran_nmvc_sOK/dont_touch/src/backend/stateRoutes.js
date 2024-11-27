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

// Fetch all states
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM state');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching states' });
    }
});

router.post('/', async (req, res) => {
    const { country_name, state_name } = req.body; // Make sure you're extracting these properly

    console.log('Received data:', req.body);  // Log the received request body for debugging

    try {
        // Check if the country exists
        const countryResult = await db.query('SELECT * FROM country WHERE country_name = $1', [country_name]);
        console.log('Country result:', countryResult.rows);  // Log the query result

        if (countryResult.rows.length === 0) {
            return res.status(400).json({ error: 'Country does not exist' });
        }

        // Insert new state if country exists
        const result = await db.query(
            'INSERT INTO state (country_name, state_name) VALUES ($1, $2) RETURNING *',
            [country_name, state_name]
        );
        console.log('Inserted state:', result.rows[0]);  // Log the inserted state

        res.status(201).json(result.rows[0]);  // Return the inserted state data
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error adding state' });
    }
});


// Edit an existing state
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { country_name, state_name } = req.body;

    try {
        // Check if the country exists
        const countryResult = await db.query('SELECT * FROM country WHERE country_name = $1', [country_name]);

        if (countryResult.rows.length === 0) {
            return res.status(400).json({ error: 'Country does not exist' });
        }

        // Update the state if the country exists
        const result = await db.query(
            'UPDATE state SET country_name = $1, state_name = $2 WHERE id = $3 RETURNING *',
            [country_name, state_name, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'State not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating state' });
    }
});

// Delete a state
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM state WHERE id = $1 RETURNING *', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'State not found' });
        }

        res.json({ message: 'State deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting state' });
    }
});


module.exports = router;
