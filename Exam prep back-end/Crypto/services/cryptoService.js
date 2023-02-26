const Crypto = require('../models/Crypto');

exports.create = (ownerId, cryptoData) => Crypto.create({...cryptoData, owner: ownerId});

exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.buy = async (userId, cryptoId) => {
    const crypto = await Crypto.findById(cryptoId);
    //check 
    crypto.buyers.push(userId);

    return crypto.save();
};

exports.edit = (cryptoId, cryptoData) => Crypto.findByIdAndUpdate(cryptoId, cryptoData);

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);

exports.search = async (name, paymentMethod) => {
    let crypto = await this.getAll();

    if(name){
        crypto = crypto.filter(x=>x.name.toLowerCase() == name);//tolowercase?
    }

    if(paymentMethod){
        crypto = crypto.filter(x=>x.paymentMethod == paymentMethod);
    }

    return crypto;
}
