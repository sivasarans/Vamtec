const [express, pg, cors] = [require('express'), require('pg'), require('cors')];//server creation, Pool to manage PostgreSQL connections,
const { Pool } = pg; // Destructure Pool from pg
const app = express(), port = 5000;  // Creating express app , setting server port: 5000
app.use(cors()).use(express.json()); // Enabling CORS and using express.json() to parse JSON data
const pool = new Pool({ user: 'Sivasaran', host: 'localhost', database: 'Sivasaran', password: 'password', port: 5432 });  
// Setting up PostgreSQL connection pool with credentials

app.post('/addFormData', async (req, res) => {  // POST route to handle form data submission
  const { name, email, age } = req.body;  // Destructuring form data from request body
  try { await pool.query('INSERT INTO users(name, email, age) VALUES($1, $2, $3)', [name, email, age]);//Insert [query,values] into PgSQL 
    res.status(201).send('Data inserted successfully');  } // Sending success response
  catch (err) { res.status(500).send('Error inserting data'); console.error(err); }      });// Sending error response
app.listen(port, () => { console.log(`Success: http://localhost:${port}`)});