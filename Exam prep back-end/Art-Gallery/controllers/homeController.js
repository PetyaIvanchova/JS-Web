const router = require('express').Router();
const artService = require('../services/artService');
const userService = require('../services/userService');

router.get('/',async (req,res) => {
    const arts = await artService.getAll();
    
    const art = arts.map(x => ({...x, shareCount: x.usersShared.length}));

    res.render('home',{art});
});

router.get('/profile',  async (req,res) => {
   const user = await userService.getOne(req.user._id).populate('mypublications').populate('shares').lean();

    const artTitles = user.mypublications.map(x => x.title).join(', ');
    const shareTitles = user.shares.map(x=> x.title).join(', ');

    res.render('home/profile', {...user, artTitles, shareTitles});
});

module.exports = router;