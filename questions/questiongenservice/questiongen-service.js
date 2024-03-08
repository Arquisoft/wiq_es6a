// questiongen-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Question = require('./questiongen-model')

const app = express();
const port = 8003;

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
