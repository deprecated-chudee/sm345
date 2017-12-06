const express = require('express')
const router = express.Router()

const Employee = require('../../db/models/employee');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Employee
router.post('/', async (req, res, next) => {
    const { id, password, name, phone, department } = req.body
    try {
        let newUser = await new User({
            username: id,
            password: password,
            auth: 4 // default Employee
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

        let newEmployee = await new Employee({
            user: user,
            name: name,
            phone: phone,
            department: getDepartment,
            isManager: false
        })

        let employee = await Employee.addEmployee(newEmployee)
            .then(employee => employee)
            .catch((err) => {
                res.status(401).json({ success: false, msg: 'Failed to register employee' })
            })

        if(getDepartment) {
            await Department.insertEmployeeByName(employee, getDepartment.name)
            .catch((e) => { 
                res.status(401).json({ success: false, msg: 'Failed to insert department' })
            })
        }
        
        await res.status(200).json({ success: true, msg: 'Student registered' })
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to register student' })
    }
})

module.exports = router