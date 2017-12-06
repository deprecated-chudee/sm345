const mongoose = require('mongoose');

const User = require('./user');
const Department = require('./department');

const EmployeeSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    phone: String,
    check: Number,
    department: { type:mongoose.Schema.Types.ObjectId, ref: 'Department' },
    isManager: Boolean
});

const Employee = module.exports = mongoose.model('employee', EmployeeSchema);