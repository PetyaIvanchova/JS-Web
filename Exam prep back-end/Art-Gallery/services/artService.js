const Art = require('../models/Art');

exports.create = (ownerId, artData) => Art.create({...artData, owner: ownerId});

exports.getAll = () => Art.find({}).lean();

exports.getOne = (artId) => Art.findById(artId).lean();

exports.getOneDetailed = (artId) => Art.findById(artId).populate('owner');

exports.share = async (userId, artId) => {
    const art = await Art.findById(artId);
    //check 
    art.usersShared.push(userId);

    await art.save();
};

exports.delete = (artId) => Art.findByIdAndDelete(artId);


exports.edit = (artId, artData) => Art.findByIdAndUpdate(artId, artData);
