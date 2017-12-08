const router = require('express').Router();

const Room = require('../../db/models/room');

router.get('/', async (req, res, next) => {
    try {
        const data = await Room.getList();

        res.status(200).json({ 
            success: true, 
            data: data
        })
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ success: false, msg: 'Failed get room list' })
    }
});

module.exports = router;