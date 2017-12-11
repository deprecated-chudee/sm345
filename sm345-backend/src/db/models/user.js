const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const User = new Schema({
    username: {type: String, required: true },
    password: {type: String, required: true },
    auth: {type: Number, required: true },
});

User.statics.addUser = async function(username, password, auth) {
    let hash = await bcrypt.genSalt(10).then(salt => {
        return bcrypt.hash(password, salt).then(hash => hash)
    });

    const user = await new this({
        username: username,
        password: hash,
        auth: auth
    });
    return user.save();
}

User.statics.getUserById = function(id) {
    return this.findById(id).exec();
}

User.statics.getUserByUsername = function(username) {
    return this.findOne({username: username}).exec();
}

User.statics.comparePassword = async (candidatePassword, hash) => {
    try {
        return await bcrypt.compare(candidatePassword, hash)
            .then((isMatch) => (null, isMatch))
    } catch(e) {
        throw Error(e)
    }
}

module.exports = mongoose.model('User', User);