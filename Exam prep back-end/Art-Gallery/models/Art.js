const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    paintingtech: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    certificate: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    usersShared: [
        {type: mongoose.Types.ObjectId,
        ref: 'User',
    }
    ]
});

const Art = mongoose.model('Art', artSchema);

module.exports = Art;