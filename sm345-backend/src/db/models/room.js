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
    max: Number,
    year: Number,
    semester: Number,
    reports: [{ type: Schema.Types.ObjectId, ref: 'fs.files', required: false }],
    thumbnail: { type: Schema.Types.ObjectId, ref: 'fs.files', required: true },
    credentialFile: { type: Schema.Types.ObjectId, ref: 'fs.files', required: true },
    isConfirm: { type: Boolean, default: false }
}, { strict: false })

Room.statics.addRoom = function (
    mentor, teamname, subject, description, link, 
    year, semester, thumbnail, credentialFile, max
) {
    const room = new this({
        mentor: mentor, 
        teamname: teamname, 
        subject: subject, 
        description: description, 
        link: link, 
        year: year, 
        semester: semester, 
        thumbnail: thumbnail, 
        credentialFile: credentialFile,
        isConfirm: false,
        max: max
    });

    return room.save();
}

Room.statics.getList = function() {
    return this.find({}).exec();
}

Room.statics.getFileById = function(id) {
    return fs.files.findOne({_id: id}).exec();
}

Room.statics.addMentee = function(roomId, student) {
    return this.update({_id: roomId}, {$push: {mentee: student}}, {upsert: true}).exec();
}

// Room.statics.menteeListByRoomId = function(roomId, mentee) {
//     return this.find({_id: roomId})
// }

module.exports = mongoose.model('Room', Room);