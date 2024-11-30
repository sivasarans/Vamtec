const { Pool } = require('pg');
const pool = new Pool({
    user: 'Sivasaran',
    host: 'localhost',
    database: 'Sivasaran',
    password: 'password',
    port: 5432
  });
  
module.exports = pool;