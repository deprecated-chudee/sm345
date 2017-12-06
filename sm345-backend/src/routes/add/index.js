const express = require('express');
const router = express.Router();

const student = require('./student');
const department = require('./department')
// const

router.use('/student', student)
router.use('/department', department)

module.exports = router;