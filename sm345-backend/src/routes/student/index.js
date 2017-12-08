const router = require('express').Router();

const create = require('./create');

router.use('/create', create);

module.exports = router;