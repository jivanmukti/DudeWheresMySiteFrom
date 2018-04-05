// Given an array of lattitude and longitude, serve a pag to the client with a rendered map
const express = require('express');
// Set app to be an instance of 'express'
const app = express();
// Allow path.join
const path = require('path');
// Allow req.body
const bodyParser = require('body-parser');

// Array of coordinates
let coord;
let count = 0;

// Set CORS access for the whole site
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) res.sendStatus(200);
  else next();
});

// Allow JSON parsing and access to req.body
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// Serve website 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Recieve GET request from google maps function for lat/lng data
app.get('/points', (req, res) => {
  count = 0;
  console.log('THIS IS POINT ROUTE: ', coord);
  res.send(coord);
});

// Recieve lat/lng POST data from Chrome extension
app.post('/recieve', (req, res) => {
  count += 1;
  if (count <= 1) {
    console.log('THIS IS THE DATA RECIEVED: ', req.body);
    coord = req.body;
  }
  res.status(200).send({});
});

// Listening on port 3000
app.listen(3000);