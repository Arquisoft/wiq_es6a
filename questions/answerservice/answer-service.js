// answer-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Answer = require('./answer-model')

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/answerdb';
mongoose.connect(mongoUri);

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
            attribute: req.body.attribute,
            right: req.body.right,
            wrong1: req.body.wrong1,
            wrong2: req.body.wrong2,
            wrong3: req.body.wrong3,
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
    validateRequiredFields(req, ['type', 'attribute']);

    const { type, attribute } = req.body;
    
    // Find the answer by type in the database
    const answer = await Answer.findOne({ attribute });

    // Check if the answer exists
    if (answer) {
      // Respond with the answer information
      res.json({ type: answer.type, attribute: answer.attribute, right: answer.right, 
                 wrong1: answer.wrong1, wrong2: answer.wrong2, wrong3: answer.wrong3, });
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