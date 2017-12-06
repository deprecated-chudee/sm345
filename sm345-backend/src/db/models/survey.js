const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    name: String
});

const Survey = module.exports =  mongoose.model('survey', SurveySchema);