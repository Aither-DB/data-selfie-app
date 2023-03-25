const express = require('express');
const Datastore = require('nedb');

const app = express();
const port = 3001;
app.listen(port, ()=>console.log(`The server is running on port ${port}`));
app.use(express.static('public'));
app.use(express.json( {limit:'1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get("/api", (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      response.send(data);
    });
  });
  
  app.post("/api", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
  });
  