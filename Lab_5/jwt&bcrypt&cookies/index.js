const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

const dataService = require('./dataService');

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req,res) => {
    res.send(`
    <h1>Hello</h1>
    <p><a href='login'>Login</a></p>
    <p><a href='register'>Register</a></p>
    <p><a href='profile'>Profile</a></p>
    <p><a href='logout'>Logout</a></p>
    `);
});

app.get('/login', (req,res) => {
    res.send(`
    <h1>Login</h1>
    <form method="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"/>

    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>

    <input type="submit" value="login"/>
    </form>
    `);
});

app.get('/register', (req,res) => {
    res.send(`
    <h1>Register</h1>
    <form method="POST">
    <label for="username">Username</label>
    <input type="text" id="username" name="username"/>

    <label for="password">Password</label>
    <input type="password" id="password" name="password"/>

    <input type="submit" value="register"/>
    </form>
    `);
});

app.get('/profile', (req,res) => {
    const token = req.cookies['token'];

    if (!token) {
        return res.status(401).end();
    }

    try {
        const decodedToken = jwt.verify(token, 'myveryverysecretsecret');

        res.send(`
            <h2>Hello - ${decodedToken.username}</h2>
        `);
    } catch(err) {
        res.status(401).end();
    }
});

app.get('/logout', (req,res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

app.post('/register', async (req,res) => {
    const { username, password } = req.body;

    await dataService.registerUser(username, password);

    res.redirect('/login');
});

app.post('/login', async (req,res) => {
    const {username, password} = req.body;

    try {
        const token = await dataService.loginUser(username, password)

        res.cookie('token', token, { httpOnly: true });

        return res.redirect('/');
    } catch (err) {
        res.status(401).end();
    }
});

app.listen(5002);
