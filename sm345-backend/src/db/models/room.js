const mongoose = require('mongoose');

const { Schema } = mongoose;

const Student = require('./student');

const Room = new Schema({
    mentor: { type: Schema.Types.ObjectId, ref: 'Student' },
    mentee: [{ type: Schema.Types.ObjectId, ref: 'Student', required: false }],
    teamname: String,
    subject: String,
    description: String,
    link: String,
    year: Number,
    semester: Number,
    reports: [{ type: Schema.Types.ObjectId, ref: 'fs.files', required: false }],
    thumbnail: { type: Schema.Types.ObjectId, ref: 'fs.files', required: true },
    credentialFile: { type: Schema.Types.ObjectId, ref: 'fs.files', required: true },
    isConfirm: { type: Boolean, default: false }
}, { strict: false })

Room.statics.addRoom = function (
    montor, teamname, subject, description, link, 
    year, semester, thumbnail, credentialFile
) {
    const room = new this({
        montor: montor, 
        teamname: teamname, 
        subject: subject, 
        description: description, 
        link: link, 
        year: year, 
        semester: semester, 
        thumbnail: thumbnail, 
        credentialFile: credentialFile,
        isConfirm: false
    });

    return room.save();
}

Room.statics.getList = function() {
    return this.find({}).exec();
}

module.exports = mongoose.model('Room', Room);