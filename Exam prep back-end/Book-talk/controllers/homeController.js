const router = require('express').Router();

const bookService = require('../services/bookService');

router.get('/',async (req,res) => {

    res.render('home');
});

router.get('/profile', async(req,res) => {
    const userId = req.user._id;
    let wished = await bookService.getMyWishes(userId);
    res.render('home/profile', {wished});
    console.log(wished);
})



module.exports = router;