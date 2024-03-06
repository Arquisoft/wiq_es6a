const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    attribute: {
      type: String,
      required: true,
    },
    right: {
      type: String,
      required: true,
    },
    wrong1: {
      type: String,
      required: true,
    },
    wrong2: {
      type: String,
      required: true,
    },
    wrong3: {
      type: String,
      required: true,
    },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer