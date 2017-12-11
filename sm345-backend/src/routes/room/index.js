const router = require('express').Router();
const authMiddleware = require('../../lib/authMiddleware');

const create = require('./create');
const list = require('./list');

router.use('/create', authMiddleware);
router.use('/create', create);
router.use('/list', authMiddleware);
router.use('/list', list);

module.exports = router;