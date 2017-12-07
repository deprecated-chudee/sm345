const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

function hash(password) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            return hash
        })
    })
};

const User = new Schema({
    username: String,
    password: String,
    auth: Number
});

User.statics.addUser = function(username, password, auth) {
    const user = new this({
        username: username,
        password: hash(password),
        auth: auth
    });

    return user.save();
}

User.methods.getUserById = function(id) {
    return this.findById(id).exec();
}

User.methods.getUserByUsername = function(username) {
    return User.findOne({username: username}).exec();
}

module.exports.comparePassword = async (candidatePassword, hash) => {
    try {
        return bcrypt.compare(candidatePassword, hash)
            .then((isMatch) => (null, isMatch))
    } catch(e) {
        throw Error(e)
    }
}

module.exports = mongoose.model('User', User);