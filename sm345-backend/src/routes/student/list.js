const router = require('express').Router();

const Student = require('../../db/models/student');
const User = require('../../db/models/user');
const Department = require('../../db/models/department');

router.get('/', async (req, res, next) => {
    try {
        let data = await Student.getStudentList();

        let newData = [];
        for(let e of data) {
            let user = await User.getUserById(e.user);
            let department = await Department.getDepartmentById(e.major);

            newData.push({
                ...e._doc,
                username: user.username,
                password: user.password,
                major: department.name
            })
        }

        res.status(200).json({ 
            success: true, 
            data: newData
        })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed get Students list' })
    }
});

module.exports = router;