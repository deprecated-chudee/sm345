const router = require('express').Router();

const Student = require('../../db/models/student');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

router.post('/', async (req, res, next) => {
    try {
        const studentArray = await req.body;
        for(let e of studentArray) {
            await console.log(e)
            const user = await User.addUser(e[0], '0000', 0);
            const getMajor = await Department.getDepartmentByName(e[4]);
            const getMinor = await Department.getDepartmentByName(e[5]);
            const student = await Student.addStudent(user, e[1], e[2], e[3], getMajor, getMinor);
            await Department.insertStudentByName(student, getMajor.name);
            if(getMinor) {
                await Department.insertStudentByName(student, getMinor.name);
            }
        }
        await res.status(200).json({ success: true, msg: 'Student Excel registered' });
    }
    catch(e) {
        console.log(e)
        res.status(401).json({ success: false, msg: 'Failed to register excel student' });
    }
});

module.exports = router;