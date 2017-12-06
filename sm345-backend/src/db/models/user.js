const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    auth: Number
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

module.exports.getUserById = async (id, callback) => {
    try {
        return User.findById(id)
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.getUserByUsername = async (username) => {
    try {
        return User.findOne({username: username})
    }
    catch(e) {
        throw Error(e)
    }
}

module.exports.comparePassword = async (candidatePassword, hash) => {
    try {
        return bcrypt.compare(candidatePassword, hash)
            .then((isMatch) => (null, isMatch))
    } catch(e) {
        throw Error(e)
    }
}