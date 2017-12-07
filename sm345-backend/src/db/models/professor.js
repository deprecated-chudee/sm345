const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./user');
const Department = require('./department');

const Professor = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    id: String,
    name: String,
    number: Number,
    phone: String,
    tel: String,
    department: { type: Schema.Types.ObjectId, ref: 'Department' },
    isManager: { type: Boolean, default: false }
});


Professor.statics.addProfessor = function(user, name, number, phone, tel, department) {
    const professor = new this({
        user: user,
        name: name,
        number: number,
        phone: phone,
        tel: tel,
        department: department,
        isManager: false
    });

    return professor.save();
}

module.exports = mongoose.model('Professor', Professor);