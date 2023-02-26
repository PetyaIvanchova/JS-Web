const router = require('express').Router();

const {isAuth} = require('../middlewares/authMiddleware');
const cryptoService = require('../services/cryptoService');
const {getErrorMessage} = require('../utils/errorUtils');
const {paymentMethodMap} = require('../constatns');

router.get('/catalog', async (req,res) => {
    const crypto = await cryptoService.getAll();

    res.render('crypto/catalog', {crypto});
})

router.get('/create',isAuth, (req,res) => {
    res.render('crypto/create');
});

router.post('/create',isAuth, async (req,res) => {
    const cryptoData = req.body;

    try{
        await cryptoService.create(req.user._id, cryptoData);
        res.redirect('/crypto/catalog');
    } catch (error) {
        return res.status(400).render('crypto/create', {error: getErrorMessage(error)});
    }
});

router.get('/:cryptoId/details', async (req,res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);
    const isOwner = crypto.owner == req.user?._id;
    const isbuyer = crypto.buyers?.some(id => id == req.user?._id);
    res.render('crypto/details', {crypto, isOwner, isbuyer});
});

router.get('/:cryptoId/buy', async (req,res) => {
    await cryptoService.buy(req.user._id, req.params.cryptoId);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuth, async (req,res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

   const paymentMethods = Object.keys(paymentMethodMap).map(key => ({
    value: key, 
    label: paymentMethodMap[key],
    isSelected: crypto.paymentMethod == key,
}));

    res.render('crypto/edit', {crypto, paymentMethods});
});

router.post('/:cryptoId/edit', isAuth, async (req,res) => {
    const cryptoData = req.body;

    await cryptoService.edit(req.params.cryptoId, cryptoData);

    res.redirect(`/crypto/${req.params.cryptoId}/details`);
})

router.get('/:cryptoId/delete', isAuth, async (req,res) => {
    await cryptoService.delete(req.params.cryptoId);

    res.redirect('/crypto/catalog');
});

router.get('/search', async (req,res) => {
    const {name, paymentMethod} = req.query;
    const crypto = await cryptoService.search(name, paymentMethod);

    res.render('crypto/search', {crypto});
})

module.exports = router;