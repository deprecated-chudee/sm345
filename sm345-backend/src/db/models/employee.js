const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./user');
const Department = require('./department');

const Employee = new Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    phone: String,
    department: { type:mongoose.Schema.Types.ObjectId, ref: 'Department', required: false }
});

Employee.statics.addEmployee = function(user, name, phone, department) {
    const employee = new this({
        user: user,
        name: name,
        phone: phone,
        department: department
    });

    return employee.save();
}

module.exports = mongoose.model('Employee', Employee);
