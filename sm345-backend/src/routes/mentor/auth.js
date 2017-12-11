const router = require('express').Router();

const Student = require('../../db/models/student');

router.post('/apply', (req, res, next) => {
    try {
        let { id } = req.body;
        Student.applyMentor(id)
        res.status(200).json({ success: true, msg: 'Success apply mentor' })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed apply mentor' })
    }
});

router.post('/withdraw', (req, res, next) => {
    try {
        let { id } = req.body;
        Student.withdrawMentor(id)
        res.status(200).json({ success: true, msg: 'Success withdraw mentor' })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed withdraw mentor' })
    }
});

module.exports = router;