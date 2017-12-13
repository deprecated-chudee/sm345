const router = require('express').Router();

const Student = require('../../db/models/student');
const Room = require('../../db/models/room');

router.post('/', async (req, res, next) => {
    try {
        let { id, username, auth, roomId } = req.body;
        const student = await Student.getStudentByUserId(id);
        const room = await Room.addMentee(roomId, student);

        // await Student.applyMentee(id)
        await res.status(200).json({ success: true, msg: 'Success apply mentee' })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed apply mentor' })
    }
});

module.exports = router;