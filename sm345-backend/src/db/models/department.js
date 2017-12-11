const mongoose = require('mongoose');

const { Schema } = mongoose;

const Employee = require('./employee');
const Professor = require('./professor');
const Student = require('./student');

const Department = new Schema({
    name: String,
    number: Number,
    phone: String,
    employees: [{ 
        type: Schema.Types.ObjectId, ref: 'Employee',
        required: false
    }],
    professors: [{ 
        type: Schema.Types.ObjectId, ref: 'Professor',
        required: false
    }],
    students: [{ 
        type: Schema.Types.ObjectId, ref: 'Student',
        required: false 
    }]
});

Department.statics.addDepartment = function(name, number, phone) {
    const department = new this({
        name: name,
        number: number,
        phone: phone
    });
    
    return department.save();
}

Department.statics.getDepartmentById = function(id) {
    return this.findById(id).exec();
}

Department.statics.getDepartmentByName = function(name) {
    return this.findOne({name: name}).exec();
}

Department.statics.insertStudentByName = function(student, name) {
    return this.update({name: name}, {$push: {students: student}}, {upsert: true}).exec();
}

Department.statics.insertProfessorByName = function(professor, name) {
    return this.update({name: name}, {$push: {professors: professor}}, { upsert: true }).exec();
}

Department.statics.insertEmployeeByName = function(employee, name) {
    return this.update({name: name}, {$push: {employees: employee}}, { upsert: true }).exec();
}

module.exports = mongoose.model('Department', Department);