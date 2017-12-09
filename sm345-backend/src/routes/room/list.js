const router = require('express').Router();

const Room = require('../../db/models/room');
const fileRead = require('../../lib/fileRead');

router.get('/', async (req, res, next) => {
    try {
        let data = await Room.getList();

        let newData = [];
        for(let e of data) {
            newData.push({
                ...e._doc,
                thumbnail: await fileRead(e.thumbnail),
                credentialFile: await fileRead(e.credentialFile)
            })
        }

        res.status(200).json({ 
            success: true, 
            data: newData
        })
    }
    catch(e) {
        res.status(400).json({ success: false, msg: 'Failed get room list' })
    }
});

module.exports = router;