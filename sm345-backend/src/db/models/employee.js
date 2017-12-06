const mongoose = require('mongoose');

const User = require('./user');
const Department = require('./department');

const EmployeeSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    phone: String,
    department: { type:mongoose.Schema.Types.ObjectId, ref: 'Department', required: false },
    isManager: Boolean
});

const Employee = module.exports = mongoose.model('employee', EmployeeSchema);

module.exports.addEmployee = async (newEmployee) => {
    try {
        return await newEmployee.save()
    } catch(e) {
        throw Error(e)
    }
}