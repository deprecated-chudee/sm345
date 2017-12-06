const mongoose = require('mongoose');

const User = require('./user');
const Department = require('./department');

const ProfessorSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    number: Number,
    phone: String,
    tel: String,
    department: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    isManager: Boolean
});

const Professor = module.exports = mongoose.model('professor', ProfessorSchema);