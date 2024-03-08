// question-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./question-model');

const app = express();
const port = 8001;
const SPARQLQueryDispatcher=require("../SPARQLQueryDispatcher");
// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);



const preguntas = new Map();
setPreguntas();

const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );

app.post('/question', async (req, res) => {
    try {
        getAtributo();
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

function setPreguntas(){
    preguntas.set("capital","Cuál es la capital de");
}

function getAtributo(){
    const sparqlQuery = `SELECT ?capitalLabel WHERE {
  ?capital wdt:P31 wd:Q6256;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`;

    queryDispatcher.query( sparqlQuery ).then( console.log );
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