const router = require('express').Router();

const Room = require('../../db/models/room');
const fileRead = require('../../lib/fileRead');
const Student = require('../../db/models/student');

router.get('/', async (req, res) => {
    try {
        let data = await Room.getList();

        let newData = [];
        for(let e of data) {
            newData.push({
                ...e._doc,
                mentor: await Student.getStudentById(e.mentor),
                thumbnail: await fileRead(e.thumbnail),
                credentialFile: await fileRead(e.credentialFile)
            })
        }

        res.status(200).json({ 
            success: true, 
            data: newData
        })
    }
    catch(e) {
        res.status(403).json({ success: false, msg: 'Failed get room list' })
    }
});

module.exports = router;