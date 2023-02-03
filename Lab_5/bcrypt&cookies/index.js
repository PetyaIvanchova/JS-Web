const express = require('express');
const cookieParser = require('cookie-parser');
const dataService = require('./dataService');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send(`
    <h1>Hello</h1>

    <p><a href='/register'>Register</a></p>
    <p><a href='/login'>Login</a></p>
    <p><a href='/profile'>Profile</a></p>
    <p><a href='/logout'>Logout</a></p>
    `);
});

app.get('/login', (req,res) => {
    res.send(`
    <h1>Login</h1>
    <form method='POST'>

    <label for='username'>Username</label>
    <input type='text' id='username' name='username'/>

    <label for='password'>Password</label>
    <input type='password' id='password' name='password'/>

    <input type='submit' value='login'/>
    </form>
    `);
});

app.get('/register', (req,res) => {
    res.send(`
    <h1>Register</h1>
    <form method='POST'>

    <label for='username'>Username</label>
    <input type='text' id='username' name='username'/>

    <label for='password'>Password</label>
    <input type='password' id='password' name='password'/>

    <input type='submit' value='register'/>
    </form>
    `);
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try{
        const user = await dataService.loginUser(username, password);
        const authData = {
            username: user.username
        };

        res.cookie('auth', JSON.stringify(authData));
        return res.redirect('/profile');
    }
    catch(err) {
        res.status(401).end();
    }
});

app.post('/register', async (req,res) => {
    const {username, password} = req.body;

    await dataService.registerUser(username, password);
    res.redirect('/login');
})

app.get('/profile', (req,res) => {
    const authData = req.cookies['auth'];

    if(!authData){
        return res.status(401).end();
    }

    const {username} = JSON.parse(authData);

    res.send(`<h1>
    Hello ${username}</h1>`)
});

app.get('/logout', (req,res) => {
    res.clearCookie('auth');
})

app.listen(5002);
