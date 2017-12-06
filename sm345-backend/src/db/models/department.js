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

module.exports.getDepartmentByName = async (name) => {
    try {
        return Department.findOne({name: name})
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.insertStudentByName = async (student, name) => {
    try {
        return Department.update({name: name}, {$push: {students: student}}, { upsert: true })
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.insertProfessorByName = async (professor, name) => {
    try {
        return Department.update({name: name}, {$push: {professors: professor}}, { upsert: true })
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.insertEmployeeByName = async (employee, name) => {
    try {
        return Department.update({name: name}, {$push: {employees: employee}}, { upsert: true })
    }
    catch(e) {
        throw Error(e)
    }
}