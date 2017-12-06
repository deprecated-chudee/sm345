const mongoose = require('mongoose');

const Employee = require('./employee');
const Professor = require('./professor');
const Student = require('./student');

const DepartmentSchema = new mongoose.Schema({
    name: String,
    number: Number,
    phone: String,
    employees: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee',
        required: false
    }],
    professors: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Professor',
        required: false
    }],
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: false 
    }]
});

const Department = module.exports = mongoose.model('department', DepartmentSchema);

module.exports.addDepartment = async (newDepartment) => {
    try {
        let saveDepartment = newDepartment.save()
        return saveDepartment
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.getDepartment = async (departmentName) => {
    try {
        return Department.findOne({name: departmentName})
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.insertStudent = async (student, departmentName) => {
    try {
        return Department.update({name: departmentName}, {$push: {students: student}}, { upsert: true })
    }
    catch(e) {
        throw Error(e)
    }
}