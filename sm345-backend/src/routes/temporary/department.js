const router = require('express').Router();

const Department = require('../../db/models/department');
const User = require('../../db/models/user');

router.post('/', (req, res, next) => {
    try {
        let { name, number, phone } = req.body;

        Department.addDepartment(name, number, phone)

        res.status(200).json({ success: true, msg: 'Department added!' });
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to add department' });
    }
});

module.exports = router;