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
        getAtributo();
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

function setPreguntas(){
    preguntas.set("capital","Cuál es la capital de");       //Tipo: capital de país, Atributo: el país, Ejemplo: ¿Cuál es la capital de Italia?
    preguntas.set("oscar","En qué año ganó el oscar");      //Tipo: premios oscar, Atributo: la película que lo ganó, Ejemplo: ¿En qué año ganó el oscar Gladiator?
    preguntas.set("pintura","Quién pintó");                 //Tipo: pintura, Atributo: el nombre del cuadro, Ejemplo: ¿Quién pintó la noche estrellada?
    preguntas.set("eventoHistorico","En qué año sucedió");  //Tipo: evento histórico, Atributo: el evento histórico, Ejemplo: ¿En qué año sucedió la revolución francesa?
    preguntes.set("premioDeportivo","Quién ganó");          //Tipo: premio deportivo, Atributo: el premio que se ganó, Ejemplo: ¿Quién ganó el balón de oro?
    preguntas.set("descubrimiento", "Quién descubrió");     //Tipo: descubrimiento, Atributo: lo que se descubrió, Ejemplo: ¿Quién descubrió la gravedad?
    preguntas.set("invencion","Quién inventó");             //Tipo: invencion, Atributo: el invento, Ejemplo: ¿Quién inventó el teléfono?
  }

function setQueries()
{
  queryMap.set("capital", `SELECT ?capitalLabel WHERE {
    ?capital wdt:P31 wd:Q6256; SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }`);
  
  queryMap.set("oscar", `SELECT ?filmLabel WHERE {
    ?film wdt:P31 wd:Q11424;
          wdt:P166 wd:Q102427.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
  }`);

  queryMap.set("pintura", `SELECT ?cuadro ?cuadroLabel ?artista ?artistaLabel WHERE {
    ?cuadro wdt:P31 wd:Q3305213;          # Esta parte devuelve los cuadros
            wdt:P170 ?artista.            # Esta devuelve el artista creador del cuadro para asegurarse que tenga un creador y por tanto haya una respuesta valida
    OPTIONAL { ?cuadro wdt:P136 ?obraDestacada. }
    FILTER EXISTS { ?cuadro wdt:P136 ?obraDestacada. }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  LIMIT 100`);

  queryMap.set("eventoHistorico", `SELECT ?eventoHistorico ?eventoHistoricoLabel WHERE {
    ?eventoHistorico wdt:P31 wd:Q198.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
  }`);

  queryMap.set("premioDeportivo", `SELECT ?premioDeportivo ?premioDeportivoLabel WHERE {
    ?premioDeportivo wdt:P31 wd:Q15229207.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }`);
  
  queryMap.set("descubrimiento", `SELECT ?descubrimiento ?descubrimientoLabel
  WHERE {
    ?descubrimiento wdt:P31 wd:Q12772819.  # Instancia de descubrimiento científico
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  LIMIT 100`);

  queryMap.set("invencion", `SELECT ?invencion ?invencionLabel
  WHERE {
    ?invencion wdt:P31 wd:Q14208553.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  LIMIT 100`);

}

function getAtributo(){

    const sparqlQuery = `SELECT ?capitalLabel WHERE {
      ?capital wdt:P31 wd:Q6256; SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
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