// questionask-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Question = require('./questionask-model')

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

app.post('/getquestion', async (req, res) => {
  try {
    // Check if required fields are present in the request body
    validateRequiredFields(req, ['type', 'attribute']);

    const { type, attribute } = req.body;
    
    // Find the question in the database
    const question = await Question.findOne({ attribute });

    // Check if the question exists
    if (question) {
      // Respond with the question information
      res.json({ type: question.type, attribute: question.attribute, right: question.right, 
                 wrong1: question.wrong1, wrong2: question.wrong2, wrong3: question.wrong3, });
    } else {
      res.status(401).json({ error: 'Question not found' });
    } 
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' }); 
    }
  });  

const server = app.listen(port, () => {
  console.log(`Question Asking Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server