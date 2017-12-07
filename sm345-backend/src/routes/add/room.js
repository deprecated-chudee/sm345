const router = require('express').Router();

const Student = require('../../db/models/student');
const Room = require('../../db/models/room');

const upload = require('../../lib/upload');

// Add Room
router.post('/', async (req, res, next) => {
    try {
        const { mentorName, teamname, subject, description, link, year, semester } = req.body;
        const { thumbnail, credentialFile } = req.files;
    
        const mentor = await Student.getStudentByName(mentorName);

        const thumbnailSchema = await upload(thumbnail, 'thumbnail').then(res => res);
        const credentialFileSchema = await upload(credentialFile, 'credentialFile').then(res => res);
        
        await Student.changeMentor(mentor._id)
        console.log(mentor)
        const room = await Room.addRoom(
            mentor, teamname, subject, description, link,  
            year, semester, thumbnailSchema, credentialFileSchema
        )

        await res.status(200).json({ success: true, msg: 'Room created' });
    }
    catch(e) {
        // console.log(e)
        res.status(401).json({ success: false, msg: 'Failed to create room' });
    }
});

module.exports = router;