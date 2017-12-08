const router = require('express').Router();

const temporary = require('./temporary');
const auth = require('./auth');
const student = require('./student');
const room = require('./room');
const mentee = require('./mentee');
const mentor = require('./mentor');

router.use('/temporary', temporary);
router.use('/auth', auth);
router.use('/student', student);
router.use('/room', room);
router.use('/mentee', mentee);
router.use('/mentor', mentor);

module.exports = router;