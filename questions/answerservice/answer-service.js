// answer-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Answer = require('./answer-model')
const SPARQLQueryDispatcher = require("../SPARQLQueryDispatcher");

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/answerdb';
mongoose.connect(mongoUri);


const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/addanswer', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        // validateRequiredFields(req, ['answername', 'password']);

        // Encrypt the password before saving it
        // const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newAnswer = new Answer({
            type: req.body.type,
            value: req.body.value,
            // rightAnswer: req.body.rightAnswer,
            // wrongAnswer1: req.body.wrongAnswer1,
            // wrongAnswer2: req.body.wrongAnswer2,
            // wrongAnswer3: req.body.wrongAnswer3,
        });

        await newAnswer.save();
        res.json(newAnswer);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
  });

app.post('/getanswer', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['type', 'value']);

      const sparqlQueryRightAnswer = `SELECT DISTINCT ?item ?itemLabel                                                                  
                  WHERE {
                  ?item wdt:P1376 wd:Q142. # capitalof France
                  ?item wdt:P31 wd:Q5119.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}`;

      const sparqlQueryWrongAnswers = `SELECT ?capitalLabel WHERE {
            ?capital wdt:P31 wd:Q6256;
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }}`;

      const listaCapitales=await queryDispatcher.query( sparqlQueryWrongAnswers );

      const respuestaCorrecta=await queryDispatcher.query( sparqlQueryRightAnswer );

      queryDispatcher.query( sparqlQueryRightAnswer ).then( console.log );

      queryDispatcher.query( sparqlQueryWrongAnswers ).then( console.log );

    const { type, value } = req.body;
    
    // Find the answer by type in the database
    const answer = await Answer.findOne({ value });

    // Check if the answer exists
    if (answer) {
      // Respond with the answer information
      res.json({ type: answer.type, value: answer.value });
    } else {
      res.status(401).json({ error: 'Answer not found' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  

const server = app.listen(port, () => {
  console.log(`Answer Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server