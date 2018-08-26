let 
  mongoDbUrl = 'mongodb://localhost/samplecrud',
  port = process.env.PORT || 4000;

// Express
const express = require('express');
const app = express();

// Mongo DB
const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || mongoDbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (e) => {
  console.log('db error:', e);
})

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API
const sampleCrud = require('./api/routes/sampleCrudRoutes');
sampleCrud(app); //register the route

app.listen(port);
console.log('Sample CRUD API server started on: ' + port);