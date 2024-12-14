const pool = require('../config/db'); 

const registerModels = {
    getAllUsers: async () => {
        const { rows } = await pool.query('SELECT * FROM register');
        return rows;
    },

    createUser: async (userData, filePath) => {
        const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = userData;

        const query = `
            INSERT INTO register
            (name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, file_path)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, filePath]);
        return rows[0];
    },

    updateUser: async (id, userData, filePath) => {
        const { name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date } = userData;

        const query = `
            UPDATE register
            SET name = $1, 
                organization = $2, 
                email = $3, 
                password = $4, 
                num_users = $5, 
                mobile = $6, 
                country_name = $7, 
                state_name = $8, 
                expiry_date = $9, 
                file_path = $10
            WHERE id = $11
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [name, organization, email, password, num_users, mobile, country_name, state_name, expiry_date, filePath, id]);
        if (rows.length === 0) throw new Error('User not found');
        return rows[0];
    },

    deleteUser: async (id) => {
        const { rowCount } = await pool.query('DELETE FROM register WHERE id = $1 RETURNING *', [id]);
        if (rowCount === 0) throw new Error('User not found');
        return true;
    },
};

module.exports = registerModels;
