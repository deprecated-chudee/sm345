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

// module.exports.addFile = async (newFile, type, author) => {
//     try {
//         require('dotenv').config();
//         const { MONGO_URI: mongoURI } = process.env;
//         const Grid = require('gridfs-stream');
//         Grid.mongo = mongoose.mongo;
//         let conn = mongoose.createConnection(mongoURI);
//         let file

//         await conn.once('open', () => {
//             let gfs = Grid(conn.db);
//             let writestream = gfs.createWriteStream({
//                 filename: newFile.name,
//                 mode: 'w',
//                 content_type: newFile.mimetype,
//                 aliases: type,
//                 author: author
//             });
        
//             writestream.on('close', file => this.file = file);
//             console.log(file)
//             writestream.write(data)
//             writestream.end()
//         })

//         return await file;
//     }
//     catch(e) {
//         throw Error(e)
//     }
// }

module.exports = mongoose.model('Room', Room);