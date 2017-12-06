const express = require('express')
const router = express.Router()

const Student = require('../../db/models/student');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add
router.post('/', async (req, res, next) => {
    const { id, password, name, address, phone, major, minor } = req.body
    try {
        let newUser = await new User({
            username: id,
            password: password
        })

        let user = await User.addUser(newUser)
            .then((user) => {
                return newUser
            })
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register user' })
            })

            
        let getMajor = await Department.getDepartment(major)
            .then(department => department)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to get major' })
            })

        let getMonor = await Department.getDepartment(minor)
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

        await Department.insertStudent(student, major)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert major' })
            })
        if(minor) await Department.insertStudent(student, minor)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert minor' })
            })
        
        await res.status(200).json({ success: true, msg: 'Student registered' })
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to register student' })
    }
})

// Authenticate
// router.post('/authenticate', (req, res, next) => {
//     const { username, password } = req.body;

//     User.getUserByUsername(username)
//         .then((user) => {
//             User.comparePassword(password, user.password)
//                 .then((isMatch) => {
//                     const token = jwt.sign(user.toJSON(), config.secret, {
//                         expiresIn: 604800 // 1 week
//                     })

//                     res.status(200).json({
//                         success: true,
//                         token: 'JWT ' + token,
//                         user: {
//                             id: user._id,
//                             name: user.name,
//                             username: user.username,
//                             email: user.email
//                         }
//                     })
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                     res.status(400).json({ success: false, msg: 'Wrong password' })
//                 })

//             // res.status(200).json({ success: true, msg: 'User registered' })
//         })
//         .catch((err) => {
//             res.status(400).json({ success: false, msg: 'User not found' })
//         })
// })

// // Profile
// router.get('/profile', (req, res, next) => {
//     res.send('profile')
// })

module.exports = router