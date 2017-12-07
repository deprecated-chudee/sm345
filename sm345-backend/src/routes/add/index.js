const router = require('express').Router();

const student = require('./student');
const department = require('./department');
const professor = require('./professor');
const employee = require('./employee');
const room = require('./room');
const image = require('./image');

router.use('/student', student);
router.use('/department', department);
router.use('/professor', professor);
router.use('/employee', employee);
router.use('/room', room);
router.use('/image', image);

module.exports = router;