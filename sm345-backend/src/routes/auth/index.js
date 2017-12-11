const router = require('express').Router();

const login = require('./login');
const check = require('./check');

router.use('/login', login);
router.use('/check', check);
// router.use('/logout', logout);

module.exports = router;