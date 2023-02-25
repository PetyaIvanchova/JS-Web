const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const {getErrorMessage} = require('../utils/errorUtils');

router.get('/create', isAuth, (req,res) => {
    res.render('books/create');
});

router.post('/create',isAuth, async (req,res) => {
    try{
        await bookService.create({...req.body, owner: req.user._id});

        res.redirect('/books/catalog');
    } catch (error) {
        return res.status(400).render('books/create', {error: getErrorMessage(error)});
    }
});

router.get('/catalog', async (req,res) => {
    const books = await bookService.getAll();

    res.render('books/catalog', {books});
});

router.get('/:bookId/details', async (req,res) => {
    const book = await bookService.getOne(req.params.bookId);
    //const username = art.owner.username;
    const isOwner = book.owner._id == req.user?._id;
    const isWished = book.wishingList?.some(id => id == req.user?._id);
    res.render('books/details', {book, isOwner, isWished});
});

router.get('/:bookId/wish', async (req,res) => {
    await bookService.wish(req.user._id, req.params.bookId);

    const bookId = req.params.bookId;
    let book = await bookService.getOneDetailed(bookId);
    book.wishingList.push(req.user._id);
    await book.save();

    res.redirect(`/books/${req.params.bookId}/details`);///art/${req.params.artId}/details
});

router.get('/:bookId/edit', isAuth, async (req,res) => {
    const book = await bookService.getOne(req.params.bookId);

    if(book.owner != req.user._id){
        return res.status(400).render('home/404');
    }

    res.render('books/edit', {book});
});

router.post('/:bookId/edit', isAuth, async (req,res) => {
    const bookData = req.body;

    await bookService.edit(req.params.bookId, bookData);

    res.redirect(`/books/${req.params.bookId}/details`);
});

router.get('/:bookId/delete', isAuth, async (req,res) => {
    await bookService.delete(req.params.bookId);

    res.redirect('/books/catalog');
});

module.exports = router;