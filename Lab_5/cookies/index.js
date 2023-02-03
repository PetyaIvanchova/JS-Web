const express = require('express');
const cookieParse = require('cookie-parser');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParse());

app.get('/', (req,res) => {
    res.send(`
    <h1>Hello</h1>
    
    <p><a href='/login'>Login</a></p>
    <p><a href='/profile'>Profile</a></p>
    `);
});

app.get('/login', (req,res) => {
    res.send(`
    <form method='POST'>
    <label for='username'>Username</label>
    <input type='text' id='username' name='username'/>

    <label for='password'>Password</label>
    <input type='password' id='password' name='password'/>
    
    <input type='submit' value='login'/>
    </form>
    `);
});

app.post('/login', (req,res) => {
    const {username, password} = req.body;

    if(username == 'Petya' && password == '12345'){
        const authData = {
            username: 'Petya'
        };

        res.cookie('auth', JSON.stringify(authData));
        return res.redirect('/');
    }

    res.status(401).end();
});

app.get('/profile', (req,res) => {
    const authData = req.cookies['auth'];

    if(!authData){
        return res.status(401).end();
    }

    const {username} = JSON.parse(authData);

    res.send(`
    <h1>Hello ${username}</h1>
    `);
});

app.listen(5002);
