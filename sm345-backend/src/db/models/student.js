const mongoose = require('mongoose');

const User = require('./user');
const Department = require('./department');
const Survey = require('./survey');

const StudentSchema = new mongoose.Schema({
    user: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    address: String,
    phone: String,
    major: { type:mongoose.Schema.Types.ObjectId, ref: 'Department' },
    minor: { type:mongoose.Schema.Types.ObjectId, ref: 'Department', required: false },
    surveys: [{ type:mongoose.Schema.Types.ObjectId, ref: 'Survey', required: false }],
    isManager: Boolean
});

const Student = module.exports =  mongoose.model('student', StudentSchema);

module.exports.addStudent = async (newStudent) => {
    try {
        return await newStudent.save()
    } catch(e) {
        throw Error(e)
    }
}