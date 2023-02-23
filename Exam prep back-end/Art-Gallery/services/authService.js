const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const {SECRET} = require('../constatns');

exports.findByName = (username) => User.findOne({username});

exports.findByEmail = (email) => User.findOne({email});

exports.register = async (username, password, repeatPassword, address) => {
    if(password !== repeatPassword){
        throw new Error('Password missmatched!');
    }
    
    const existingUser = await User.findOne({
        $or: [
            {username},
        ]
    });

    if(existingUser){
        throw new Error('User exists!');
    }

    if(password.length < 4){
        throw new Error('Password too short');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({username, password: hashedPassword, address});

    return this.login(username, password);
};

exports.login = async(username, password) => {
    const user = await this.findByName(username);

    if(!user){
        throw new Error('Invalid username or password!')
    }

   const isValid = await bcrypt.compare(password, user.password);

   if(!isValid){
        throw new Error('Invalid username or password!');
   }

   const payload = {_id: user._id,
    username: user.username};

   const token = await jwt.sign(payload, SECRET);
   return token;
};


