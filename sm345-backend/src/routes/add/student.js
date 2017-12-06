const express = require('express')
const router = express.Router()

const Student = require('../../db/models/student');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Student
router.post('/', async (req, res, next) => {
    const { id, password, name, address, phone, major, minor } = req.body
    try {
        let newUser = await new User({
            username: id,
            password: password,
            auth: 0 // default Student
        })

        let user = await User.addUser(newUser)
            .then(user => newUser)
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register user' })
            })

            
        let getMajor = await Department.getDepartmentByName(major)
            .then(department => department)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to get major' })
            })

        let getMonor = await Department.getDepartmentByName(minor)
            .then(department => department)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to get minor' })
            })

        let newStudent = await new Student({
            user: user,
            name: name,
            address: address,
            phone: phone,
            major: getMajor,
            minor: getMonor,
            isManager: false
        })

        let student = await Student.addStudent(newStudent)
            .then((student) => student)
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register student' })
            })

        await Department.insertStudentByName(student, major)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert major' })
            })
        if(minor) await Department.insertStudentByName(student, minor)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert minor' })
            })
        
        await res.status(200).json({ success: true, msg: 'Student registered' })
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to register student' })
    }
})

module.exports = router