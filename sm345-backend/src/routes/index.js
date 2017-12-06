const express = require('express');
const add = require('./add');

const router = express.Router();

router.use('/add', add)
// router.use('/', )

module.exports = router;