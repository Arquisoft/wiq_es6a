// questiongen-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Question = require('./questiongen-model')

const app = express();
const port = 8003;

const preguntas = new Map();
setPreguntas();

const queryMap = new Map();
setQueries();


// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

app.post('/addquestion', async (req, res) => {
    try {
        const newQuestion = new Question({
            type: req.body.type,
            attribute: req.body.attribute,
            right: req.body.right,
            wrong1: req.body.wrong1,
            wrong2: req.body.wrong2,
            wrong3: req.body.wrong3,
        });

        await newQuestion.save();
        res.json(newQuestion);
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
  queryMap.set("capital", `SELECT DISTINCT ?country ?countryLabel ?capital ?capitalLabel
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
    ORDER BY ?countryLabel`
  );

  queryMap.set("oscar", `SELECT DISTINCT ?itemLabel ?year
    {
        ?item wdt:P31/wdt:P279* wd:Q11424 ;
              p:P166 ?awardStat .              
        ?awardStat pq:P805 ?award ;            
                  ps:P166 wd:Q102427 .        
        ?award wdt:P585 ?year .                
        SERVICE wikibase:label {              
            bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es"
        }
    }
    ORDER BY DESC(?year)`
  );

  queryMap.set("pintura", `SELECT DISTINCT ?cuadroLabel ?artistaLabel WHERE {
      ?cuadro wdt:P31 wd:Q3305213;          # Esta parte devuelve los cuadros
              wdt:P170 ?artista.            # Esta devuelve el artista creador del cuadro para asegurarse que tenga un creador y por tanto haya una respuesta valida
      OPTIONAL { ?cuadro wdt:P136 ?obraDestacada. }
      FILTER EXISTS { ?cuadro wdt:P136 ?obraDestacada. }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    LIMIT 100`
  );

  queryMap.set("eventoHistorico", `SELECT DISTINCT ?guerraLabel ?fechaInicio
    WHERE {
      ?guerra wdt:P31 wd:Q198 .
      OPTIONAL { ?guerra wdt:P580 ?fechaInicio . }
      FILTER EXISTS {?guerra wdt:P580 ?fechaInicio .}
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }`
  );

  queryMap.set("premioDeportivo", `SELECT ?player ?playerLabel ?year
    WHERE {
      ?player p:P166 ?statement.
      ?statement ps:P166 wd:Q166177.
      ?statement pq:P585 ?date.
      BIND(YEAR(?date) AS ?year).
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    ORDER BY DESC(?year)`
  );

  queryMap.set("descubrimiento", `SELECT DISTINCT ?descubrimientoLabel ?añoDescubrimiento
    WHERE {
      ?descubrimiento wdt:P31 wd:Q12772819.  # Instancia de descubrimiento científico
      
      ?descubrimiento wdt:P585 ?añoDescubrimiento .
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    LIMIT 100`
  );

  queryMap.set("invencion", `SELECT DISTINCT ?invencionLabel ?inventorLabel
    WHERE {
      ?invencion wdt:P31 wd:Q14208553.
      OPTIONAL { ?invencion wdt:P61 ?inventor . }
      FILTER EXISTS {?invencion wdt:P61 ?inventor .}
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    LIMIT 100`
  );

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