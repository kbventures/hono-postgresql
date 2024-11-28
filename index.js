import { serve } from "@hono/node-server"
import { Hono } from "hono";
import { cors } from "hono/cors";
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';


dotenv.config()

const app = new Hono();

app.use(cors());

// Specific origian and configurations
// app.use(cors({
//   origin: 'https://your-react-app.onrender.com',  // Allow only this origin
// }));


// Set up PostgreSQL client
const client = new Client({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT || 5432
  })

client.connect();

// Sanity Test
app.get('/', async(c)=>{
  return c.json("Server is working")
})

// CREATE Todo
app.post('/todos', async (c) => {
    const { title } = await c.req.json()
    const result = await client.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title])
    return c.json(result.rows[0])
  })
  
  // READ All Todos
  app.get('/todos', async (c) => {
    const result = await client.query('SELECT * FROM todos')
    return c.json(result.rows)
  })
  
  // UPDATE Todo
  app.put('/todos/:id', async (c) => {
    const id = c.req.param('id')
    const { title, completed } = await c.req.json()
    const result = await client.query(
      'UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
      [title, completed, id]
    )
    return c.json(result.rows[0])
  })
  
  // DELETE Todo
  app.delete('/todos/:id', async (c) => {
    const id = c.req.param('id')
    await client.query('DELETE FROM todos WHERE id = $1', [id])
    return c.text('Todo deleted')
  })

const port = 3000;
console.log(`Server is running on port ${process.env.PORT}`);

// Start the server
serve({
  fetch: app.fetch,
  port:process.env.PORT,
});
