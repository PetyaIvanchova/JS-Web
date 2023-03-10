const bcrypt = require('bcrypt');
const fs = require('fs/promises');

const db = require('./db.json');

async function saveDb(){
    const data = JSON.stringify(db, null, 2);

    await fs.writeFile('./db.json', data);
}

exports.registerUser = async (username, password) => {
    if(db.users.some(x=> x.username === username)){
        throw 'User already exists'
    };

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    db.users.push(
        {
            username,
            password: hash
        }
    );

    await saveDb();
}

exports.loginUser = async (username, password) => {
    const user = db.users.find(x=> x.username === username);

    if(!user){
        throw 'Username not found!';
    };

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
        throw 'No such username or password!';
    }

    return user;
}
