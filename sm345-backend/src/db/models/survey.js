const mongoose = require('mongoose');

const { Schema } = mongoose;

const Survey = new Schema({
    name: String
});

module.exports =  mongoose.model('Survey', Survey);