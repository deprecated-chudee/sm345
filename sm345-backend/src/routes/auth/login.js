require('dotenv').config();
const { SECRET: secret } = process.env;

const router = require('express').Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../db/models/user');

router.post('/', async (req, res, next) => {
    let { username, password } = req.body;
    
    let user = await User.getUserByUsername(username);

    await User.comparePassword(password, user.password)
        .then((isMatch) => {
            const token = jwt.sign(user.toJSON(), secret, {
                expiresIn: 86400 // 1 day
            })

            res.status(200).json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    id: user._id,
                    username: user.username,
                    auth: user.auth
                }
            })
        })
        .catch((err) => {
            res.status(403).json({ success: false, msg: 'Wrong password' })
        })
});


module.exports = router;