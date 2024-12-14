const pool = require('../config/db')

const stateModels = {
    getAllStates: async () => {
        const { rows } = await pool.query('SELECT * FROM state');
        return rows;
    },

    createState: async (countryName, stateName) => {
        // Check if the country exists
        const countryResult = await pool.query('SELECT * FROM country WHERE country_name = $1', [countryName]);
        if (countryResult.rows.length === 0) throw new Error('Country does not exist');

        // Insert the state
        const { rows } = await pool.query(
            'INSERT INTO state (country_name, state_name) VALUES ($1, $2) RETURNING *',
            [countryName, stateName]
        );
        return rows[0];
    },

    updateState: async (id, countryName, stateName) => {
        // Check if the country exists
        const countryResult = await pool.query('SELECT * FROM country WHERE country_name = $1', [countryName]);
        if (countryResult.rows.length === 0) throw new Error('Country does not exist');

        // Update the state
        const { rows, rowCount } = await pool.query(
            'UPDATE state SET country_name = $1, state_name = $2 WHERE id = $3 RETURNING *',
            [countryName, stateName, id]
        );

        if (rowCount === 0) throw new Error('State not found');
        return rows[0];
    },

    deleteState: async (id) => {
        const { rowCount } = await pool.query('DELETE FROM state WHERE id = $1 RETURNING *', [id]);
        if (rowCount === 0) throw new Error('State not found');
        return true;
    }
};

module.exports = stateModels;
