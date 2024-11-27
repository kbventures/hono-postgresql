// Locally 

npm install

docker-compose up -d

docker exec -it postgresql-vms psql -U vmsdbuser -d vmsdb

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);

Create .env file in root directory:
POSTGRES_USER=vmsdbuser
POSTGRES_PASSWORD=vmsdbpassword
POSTGRES_DB=vmsdb
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
PORT=3001


node index.js


curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{"title": "My New Todo"}'

curl http://localhost:3000/todos

curl -X PUT http://localhost:3000/todos/1 \
-H "Content-Type: application/json" \
-d '{"title": "Updated Todo", "completed": true}'

curl -X DELETE http://localhost:3000/todos/1



https://hono-postgresql.onrender.com/todos/


curl -X POST https://hono-postgresql.onrender.com/todos \
-H "Content-Type: application/json" \
-d '{"title": "My New Todo"}'






