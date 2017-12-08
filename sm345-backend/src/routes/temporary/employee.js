const router = require('express').Router();

const Employee = require('../../db/models/employee');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Employee
router.post('/', async (req, res, next) => {
    try {
        const { id, password, name, phone, department } = req.body;

        const user = await User.addUser(id, password, 4);

        const getDepartment = await Department.getDepartmentByName(department);

        const employee = await Employee.addEmployee(user, name, phone, getDepartment);

        if(getDepartment) {
            await Department.insertEmployeeByName(employee, getDepartment.name);
        }
        
        await res.status(200).json({ success: true, msg: 'Employee registered' });
    }
    catch(e) {
        res.status(401).json({ success: false, msg: 'Failed to register employee' });
    }
});

module.exports = router;