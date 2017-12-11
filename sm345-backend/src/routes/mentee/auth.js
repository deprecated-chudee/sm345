const router = require('express').Router();

const Student = require('../../db/models/student');

router.post('/apply', (req, res, next) => {
    try {
        let { id } = req.body;
        Student.applyMentee(id)
        res.status(200).json({ success: true, msg: 'Success apply mentee' })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed apply mentee' })
    }
});

router.post('/withdraw', (req, res, next) => {
    try {
        let { id } = req.body;
        Student.withdrawMentee(id)
        res.status(200).json({ success: true, msg: 'Success withdraw mentee' })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed withdraw mentee' })
    }
});

module.exports = router;