const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'Sivasaran',
  host: 'localhost',
  database: 'Sivasaran',
  password: 'password',
  port: 5432
});

const handleError = (res, err) => res.status(500).send(err.message);

// Add a new country
router.post('/', async (req, res) => {
  const { countryCode, countryName } = req.body;
  try {
    await pool.query('INSERT INTO country (country_code, country_name) VALUES ($1, $2)', [countryCode, countryName]);
    res.status(201).send('Country added');
  } catch (err) {
    handleError(res, err);
  }
});

// Get all countries
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM country');
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});


// Update a country
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { countryCode, countryName } = req.body;
  try {
    const { rowCount, rows } = await pool.query(
      'UPDATE country SET country_code = $1, country_name = $2 WHERE id = $3 RETURNING *',
      [countryCode, countryName, id]
    );
    rowCount ? res.json(rows[0]) : res.status(404).send('Country not found');
  } catch (err) {
    handleError(res, err);
  }
});

// Delete a country
router.delete('/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM country WHERE id = $1 RETURNING *', [req.params.id]);
    rowCount ? res.send('Country deleted') : res.status(404).send('Country not found');
  } catch (err) {
    handleError(res, err);
  }
});



router.get('/fetchStateByCountry/:countryName', async (req, res) => {
  const { countryName } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT state.state_name
       FROM state
       JOIN country ON state.country_name = country.country_name
       WHERE country.country_name = $1`,
      [countryName]
    );
    if (rows.length === 0) {
      return res.status(404).send('No states found for the specified country');
    }
    res.json(rows);
  } catch (err) {
    console.error('Error fetching states:', err);  // Log the error details
    res.status(500).send('Error fetching states: ' + err.message);  // Send more descriptive error
  }
});


// Route to get all registered users
router.get('/register', async (req, res) => {
  try {
      const result = await pool.query('SELECT * FROM register');
      res.status(200).json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching users');
  }
});

module.exports = router;


