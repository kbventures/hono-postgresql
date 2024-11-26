// Locally 

npm install
docker-compose up -d
docker exec -it postgresql-vms psql -U vmsdbuser -d vmsdb
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
node index.js


curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{"title": "My New Todo"}'

curl http://localhost:3000/todos

curl -X PUT http://localhost:3000/todos/1 \
-H "Content-Type: application/json" \
-d '{"title": "Updated Todo", "completed": true}'

curl -X DELETE http://localhost:3000/todos/1


// Render


https://read.highgrowthengineer.com/p/the-one-framework-every-engineer-must-kno
