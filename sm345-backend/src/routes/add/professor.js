const router = require('express').Router();

const Professor = require('../../db/models/professor');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

// Add Professor
router.post('/', async (req, res, next) => {
    try {
        const { id, password, name, number, phone, tel, department } = req.body;

        const user = await User.addUser(id, password, 3);

        const getDepartment = await Department.getDepartmentByName(department);
    
        const professor = await Professor.addProfessor(user, name, number, phone, tel, getDepartment);

        await Department.insertProfessorByName(professor, getDepartment.name);
        
        res.status(200).json({ success: true, msg: 'Professor registered' });
    }
    catch(e) {
        console.log(e)
        res.status(401).json({ success: false, msg: 'Failed to register professor' });
    }
});

module.exports = router;