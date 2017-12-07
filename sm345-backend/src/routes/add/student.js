const router = require('express').Router();

const Student = require('../../db/models/student');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Student
router.post('/', async (req, res, next) => {
    try {
        const { id, password, name, address, phone, major, minor } = req.body;

        const user = await User.addUser(id, password, 0);
            
        const getMajor = await Department.getDepartmentByName(major);

        const getMinor = await Department.getDepartmentByName(minor);

        const student = await Student.addStudent(user, name, address, phone, getMajor, getMinor);
        
        await Department.insertStudentByName(student, getMajor.name);
        if(getMinor) {
            await Department.insertStudentByName(student, getMinor.name);
        }
        
        await res.status(200).json({ success: true, msg: 'Student registered' });
    }
    catch(e) {
        console.log(e)
        res.status(401).json({ success: false, msg: 'Failed to register student' });
    }
});

module.exports = router;