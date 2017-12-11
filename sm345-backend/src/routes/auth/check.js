const router = require('express').Router();
const authMiddleware = require('../../lib/authMiddleware');

router.use('/', authMiddleware)
router.get('/', (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
});

module.exports = router;