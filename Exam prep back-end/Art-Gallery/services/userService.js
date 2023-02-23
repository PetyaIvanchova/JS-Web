const User = require('../models/User');

exports.getOne = (userId) => User.findById(userId);

exports.addArt = async (userId, artId) => {
    const user = await User.findById(userId);

    user.mypublications.push(artId);

    await user.save();

    return user;
}