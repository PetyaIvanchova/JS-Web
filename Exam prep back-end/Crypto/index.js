const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const {auth} = require('./middlewares/authMiddleware');

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(auth);
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/crypto');

app.listen(5000, () => console.log('Server is running...'));