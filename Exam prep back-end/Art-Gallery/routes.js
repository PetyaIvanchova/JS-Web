const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const artController = require('./controllers/artController');

router.use(homeController);
router.use('/auth', authController);
router.use('/art', artController);
router.all('*', (req,res) => {
    res.render('home/404');
});

module.exports = router;