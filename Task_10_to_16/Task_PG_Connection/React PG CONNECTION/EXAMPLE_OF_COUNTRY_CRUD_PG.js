const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
  user: 'Sivasaran',
  host: 'localhost',
  database: 'Sivasaran',
  password: 'password',
  port: 5432
});

app.use(cors());
app.use(express.json());

const handleError = (res, err) => res.status(500).send(err.message);

app.post('/countries', async (req, res) => {
  const { countryCode, countryName } = req.body;
  try {
    await pool.query('INSERT INTO country (country_code, country_name) VALUES ($1, $2)', [countryCode, countryName]);
    res.status(201).send('Country added');
  } catch (err) {
    handleError(res, err);
  }
});

app.get('/countries', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM country');
    res.json(rows);
  } catch (err) {
    handleError(res, err);
  }
});

app.put('/countries/:id', async (req, res) => {
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

app.delete('/countries/:id', async (req, res) => {
  try {
    const { rowCount } = await pool.query('DELETE FROM country WHERE id = $1 RETURNING *', [req.params.id]);
    rowCount ? res.send('Country deleted') : res.status(404).send('Country not found');
  } catch (err) {
    handleError(res, err);
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
