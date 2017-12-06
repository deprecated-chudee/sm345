const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = module.exports = mongoose.model('user', UserSchema);

module.exports.addUser = async (newUser) => {
    try {
        let hash = bcrypt.genSalt(10).then((salt) => {
            return bcrypt.hash(newUser.password, salt)
                .then((hash) => hash)
            })
        newUser.password = await hash

        let saveUser = await newUser.save()
        return saveUser
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.getUser = async (user) => {
    try {
        User.findOne({username: user.username})
    }
    catch(e) {
        throw Error(e)
    }
}