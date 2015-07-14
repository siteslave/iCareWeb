var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var partials = require('./routes/partials');
var admin = require('./routes/admin');
var users = require('./routes/users');
var api = require('./routes/api');
//var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'SecretKey))))',
  resave: false,
  saveUninitialized: true
}));

var db = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    database: 'kpis',
    user: 'kpis',
    password: 'kpis',
    charset: 'utf8'
  },
  pool: {
    min: 10,
    max: 100
  }
});


var auth = function (req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
};

var checkAdmin = function (req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Database middleware
app.use(function (req, res, next) {
  req.db = db;
  next();
});

app.use('/api', api);
app.use('/partials', partials);
app.use('/users', auth, users);
app.use('/admin', checkAdmin, admin);
app.use('/', routes);

module.exports = app;
