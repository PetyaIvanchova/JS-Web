const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);

exports.getAll = () => Book.find({}).lean();

exports.getOneDetailed = (bookId) => Book.findById(bookId).populate('wishingList');

exports.getOne = (bookId) => Book.findById(bookId).lean();

exports.wish = async (userId, bookId) => {
    const book = await Book.findById(bookId);
    //check 
    book.wishingList.push(userId);

    await book.save();
};

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.getMyWishes = (userId) => Book.find({wishingList: userId}).lean();
