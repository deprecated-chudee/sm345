const router = require('express').Router();

const create = require('./create');
const excel = require('./excel');

router.use('/create', create);
router.use('/excel', excel);

module.exports = router;