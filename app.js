var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var mysqlStore = require('express-mysql-session')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dbRouter = require('./routes/dbtest');
var postRouter= require('./routes/posts');


var app = express();

//middleware function that runs every request I do
app.use((req, resp, next) => {
    console.info('\x1b[42m\x1b[30m Request URL : ' + req.url + '\x1b[0m');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var sessionStore = new mysqlStore({/* using default option*/}, require('./conf/database'));

var sessionOptions = {
    key: "csid",
    secret: "this is a secret for csc317",
    store: sessionStore,
    cookie: {secure: false, httpOnly: false, maxAge:900000},
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dbtest', dbRouter);
app.use('/posts', postRouter);

app.use((err, req, res, next) => {
    console.log(err);
   res.status(500);
   res.send('something went wrong with your db');
});

module.exports = app;
