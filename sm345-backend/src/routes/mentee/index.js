const router = require('express').Router();

const auth = require('./auth');
const create = require('./create');
const view = require('./view');

router.use('/auth', auth);
router.use('/create', create);
router.use('/view', view);

module.exports = router;