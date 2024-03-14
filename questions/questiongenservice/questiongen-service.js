// questiongen-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios'); // Importa Axios
const Question = require('./questiongen-model')

const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `#List of present-day countries and capital(s)
  SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
  WHERE
  {
    ?country wdt:P31 wd:Q3624078 .
    #not a former country
    FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
    #and no an ancient civilisation (needed to exclude ancient Egypt)
    FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}
    OPTIONAL { ?country wdt:P36 ?capital } .

    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
  }
  ORDER BY ?countryLabel`;

const generateQuestion = async () => {
    console.log(2);
    try{
        const fullUrl = endpointUrl + '?query=' + encodeURIComponent( sparqlQuery );
        console.log(3);
        const headers = { 'Accept': 'application/sparql-results+json' };
        console.log(4);
        const response = await axios.get(fullUrl, { headers });
        console.log(5);
        const jsonResponse = response.data;
        console.log(6);
        const index = Math.floor(Math.random() * 200);
        console.log(jsonResponse.results.bindings[index].capitalLabel.value +
            ' es la capital de ' +
            jsonResponse.results.bindings[index].countryLabel.value );
        const question = {
            type: 'capital',
            attribute: jsonResponse.results.bindings[index].countryLabel.value,
            right: jsonResponse.results.bindings[index].capitalLabel.value,
            wrong1: jsonResponse.results.bindings[index+1].capitalLabel.value,
            wrong2: jsonResponse.results.bindings[index+2].capitalLabel.value,
            wrong3: jsonResponse.results.bindings[index+3].capitalLabel.value,
        };
        return question;
    }catch(error){
        console.error('Error en la solicitud SPARQL:', error);
        throw error;
    }

};

app.post('/addquestion', async (req, res) => {
    console.log(1);
    const question = await generateQuestion();
    const type = question.type;
    const attribute = question.attribute;
    const right = question.right;
    const wrong1 = question.wrong1;
    const wrong2 = question.wrong2;
    const wrong3 = question.wrong3;

    try {
        const newQuestion = new Question({
            type: type,
            attribute: attribute,
            right: right,
            wrong1: wrong1,
            wrong2: wrong2,
            wrong3: wrong3,
        });

        await newQuestion.save();
        console.log(type + " " + attribute);
        res.json({ type, attribute });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
  });

const server = app.listen(port, () => {
  console.log(`Question Generator Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
