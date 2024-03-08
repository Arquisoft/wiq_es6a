// question-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./question-model');

import SPARQLQueryDispatcher from '../SPARQLQueryDispatcher.js';

const app = express();
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


const preguntas = new Map();
setPreguntas();

const queryMap = new Map();
setQueries();

const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );

app.post('/question', async (req, res) => {
    try {
        getAtributo("capital");
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

function setPreguntas(){
    preguntas.set("capital","Cuál es la capital de");
}

function setQueries()
{
  queryMap.set("capital", 'SELECT ?capitalLabel WHERE {?capital wdt:P31 wd:Q6256; SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}');
}

function getAtributo(tipo)
{
  const query = queryMap.get(tipo);

  const rawData = queryDispatcher.query(query);

  const typeName = Object.keys(rawData[0]);

  const attribute = rawData[ rawData.length * Math.random() << 0 ][ typeName[0] ];

  console.log(attribute);

  return attribute;
}

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server