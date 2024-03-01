const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    tipo: {
      type: String,
      required: true,
    },
    atributo: {
      type: String,
      required: true,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question