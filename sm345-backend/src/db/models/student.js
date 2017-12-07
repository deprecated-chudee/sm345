const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./user');
const Department = require('./department');
const Survey = require('./survey');

const Student = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    major: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    minor: { type: Schema.Types.ObjectId, ref: 'Department', required: false },
    surveys: [{ type: Schema.Types.ObjectId, ref: 'Survey', required: false }],
    isManager: { type: Boolean, default: false },
    isMentor: { type: Boolean, default: false },
    isMentee: { type: Boolean, default: false },
});

Student.statics.addStudent = function(user, name, address, phone, major, minor) {
    const student = new this({
        user: user,
        name: name,
        address: address,
        phone: phone,
        major: major,
        minor: minor,
        isManager: false,
        isMentor: false,
        isMentee: false
    })

    return student.save()
}

Student.statics.getStudentByName = function(name) {
    return this.findOne({name: name});
}

Student.statics.changeMentor = function(mentorId) {
    return this.update({_id: mentorId, isMentor: false}, {$set: {isMentor: true}}).exec();
}

module.exports = mongoose.model('Student', Student);