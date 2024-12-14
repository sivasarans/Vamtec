const express = require('express');
const router = express.Router();
const country_controllers = require('../controllers/country_controllers');

const { Pool } = require('pg');
const pool = new Pool({
    user: 'Sivasaran',
    host: 'localhost',
    database: 'Sivasaran',
    password: 'password',
    port: 5432
  });
// Get all countries
router.get('/', country_controllers.getAllCountries);
router.post('/',country_controllers.create);
router.put('/:id', country_controllers.update);
router.delete('/:id',country_controllers.delete );

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


