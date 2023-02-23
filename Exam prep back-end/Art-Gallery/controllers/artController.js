const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware');
const artService = require('../services/artService');
const {getErrorMessage} = require('../utils/errorUtils');
const userService = require('../services/userService');

router.get('/create', isAuth, (req,res) => {
    res.render('art/create');
});

router.post('/create',isAuth, async (req,res) => {
    const artData = req.body;

    try{
        const art = await artService.create(req.user._id, artData);
        await userService.addArt(req.user._id, art._id);

        res.redirect('/art/gallery');
    } catch (error) {
        return res.status(400).render('art/create', {error: getErrorMessage(error)});
    }
});

router.get('/gallery', async (req,res) => {
    const art = await artService.getAll();

    res.render('art/gallery', {art});
});

router.get('/:artId/details', async (req,res) => {
    const art = await artService.getOneDetailed(req.params.artId).lean();
    const username = art.owner.username;
    const isOwner = art.owner._id == req.user?._id;
    const isShared = art.usersShared?.some(id => id == req.user?._id);
    res.render('art/details', {art,username, isOwner, isShared});
});

router.get('/:artId/share', async (req,res) => {
    await artService.share(req.user._id, req.params.artId);

    const art = await artService.getOne(req.params.artId);
    const user = await userService.getOne(req.user._id);
    user.shares.push(art);
    await user.save();

    res.redirect(`/`);///art/${req.params.artId}/details
});


router.get('/:artId/edit', isAuth, async (req,res) => {
    const art = await artService.getOne(req.params.artId);

    if(art.owner != req.user._id){
        return res.status(400).render('home/404');
    }

    res.render('art/edit', {art});
});

router.post('/:artId/edit', isAuth, async (req,res) => {
    const artData = req.body;

    await artService.edit(req.params.artId, artData);

    res.redirect(`/art/${req.params.artId}/details`);
});

router.get('/:artId/delete', isAuth, async (req,res) => {
    await artService.delete(req.params.artId);

    res.redirect('/art/gallery');
});

module.exports = router;