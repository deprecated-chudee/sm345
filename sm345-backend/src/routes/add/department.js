const express = require('express');
const router = express.Router();

const Department = require('../../db/models/department');
const User = require('../../db/models/user');

router.post('/', (req, res, next) => {
    let { name, number, phone } = req.body;
    
    let newDepartment = new Department({
        name: name,
        number: number,
        phone: phone
    })
    
    Department.addDepartment(newDepartment)
        .then((department) => {
            res.status(200).json({ success: true, msg: 'Department added!' })
        })
        .catch((err) => {
            console.log(err)
            res.status(401).json({ success: false, msg: 'Failed to add department' })
        })
})

module.exports = router;