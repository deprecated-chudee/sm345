const express = require('express');
const router = express.Router();

const add = require('./add');
const auth = require('./auth');

router.use('/add', add);
router.use('/auth', auth);

module.exports = router;