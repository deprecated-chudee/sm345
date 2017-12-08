const router = require('express').Router();

const department = require('./department');
const professor = require('./professor');
const employee = require('./employee');

// router.use('/student', student);
router.use('/department', department);
router.use('/professor', professor);
router.use('/employee', employee);

module.exports = router;