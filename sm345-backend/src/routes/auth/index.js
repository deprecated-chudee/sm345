const express = require('express');
const router = express.Router();

const login = require('./login');

router.use('/login', login);
// router.use('/logout', logout);

module.exports = router;