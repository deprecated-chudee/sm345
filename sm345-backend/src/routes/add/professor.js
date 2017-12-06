const express = require('express')
const router = express.Router()

const Professor = require('../../db/models/professor');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Professor
router.post('/', async (req, res, next) => {
    const { id, password, name, number, phone, tel, department } = req.body
    try {
        let newUser = await new User({
            username: id,
            password: password,
            auth: 3 // default Professor
        })

        let user = await User.addUser(newUser)
            .then(user => newUser)
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register user' })
            })

        let getDepartment = await Department.getDepartmentByName(department)
            .then(department => department)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to get department' })
            })

        let newProfessor = await new Professor({
            user: user,
            name: name,
            number: number,
            phone: phone,
            tel: tel,
            department: getDepartment,
            isManager: false
        })

        let professor = await Professor.addProfessor(newProfessor)
            .then(professor => professor)
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register professor' })
            })

        await Department.insertProfessorByName(professor, department)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert department' })
            })
        
        await res.status(200).json({ success: true, msg: 'Professor registered' })
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to register professor' })
    }
})

module.exports = router