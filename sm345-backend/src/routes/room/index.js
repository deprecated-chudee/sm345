const router = require('express').Router();

const create = require('./create');
const list = require('./list');

router.use('/create', create);
router.use('/list', list);

module.exports = router;