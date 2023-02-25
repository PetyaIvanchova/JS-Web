const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    bookReview: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,//1-5
        required: true,
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
