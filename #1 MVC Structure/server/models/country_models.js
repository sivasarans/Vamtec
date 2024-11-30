const pool = require('../config/db');
const Queue = require('bull');
const taskQueue = new Queue('country-queue', 'redis://localhost:6379');


const countryModels = {
    getAllCountries: async () => {
        try {
            const { rows } = await pool.query('SELECT * FROM country');
            return rows;
        } catch (err) {
            throw err;
        }
    },

    create: async (countryCode, countryName) => {
        try {
            await taskQueue.add({ countryCode, countryName });

            const { rows } = await pool.query(
                'INSERT INTO country (country_code, country_name) VALUES ($1, $2) RETURNING *',
                [countryCode, countryName]
            );
            return rows[0];
        } catch (err) {
            throw err;
        }
    },

    update: async (id, countryCode, countryName) => {
        try {
            const { rows, rowCount } = await pool.query(
                'UPDATE country SET country_code = $1, country_name = $2 WHERE id = $3 RETURNING *',
                [countryCode, countryName, id]
            );
            return rowCount ? rows[0] : null;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const { rowCount } = await pool.query(
                'DELETE FROM country WHERE id = $1',
                [id]
            );
            return rowCount > 0;
        } catch (err) {
            throw err;
        }
    }
};

module.exports = countryModels;
