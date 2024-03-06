const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    // rightAnswer:{
    //     type: String,
    //     required: true,
    // },
    // wrongAnswer1:{
    //     type: String,
    //     required: true,
    // },
    // wrongAnswer2:{
    //     type: String,
    //     required: true,
    // },
    // wrongAnswer3:{
    //     type: String,
    //     required: true,
    // },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer