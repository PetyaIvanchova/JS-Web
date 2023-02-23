const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 1,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mypublications: [
        {type: mongoose.Types.ObjectId,
        ref: 'Art',
    }
    ],
    shares: [{
        type: mongoose.Types.ObjectId,
        ref: 'Art'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
