const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true,
    },
    email: {
        type: String,
        minLength: 10,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
