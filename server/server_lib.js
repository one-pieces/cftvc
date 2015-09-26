var mongoose = require('mongoose');
var express = require('express');
// var morgan = require('morgan');
// var compress = require('compress');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var session = require('express-session');

var config = require('../config/config.js');
var serverMode = require('./server_mode.js');

exports.createApp = function(callback) {
    var app = express();

    // if (process.env.NODE_ENV === serverMode.DEVELOPMENT_MODE) {
    //     app.use(morgan('dev'));
    // } else {
    //     app.use(compress());
    // };

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set('port', process.env.PORT);
    app.set('views', './app');
    app.engine('.html', ejs.__express);
    app.set('view engine', 'html'); //替换文件扩展名ejs为html

    // app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.static('./app'));
    app.use(express.static('./'));

    require('./server-routers.js')(app);

    return app;
};

exports.createDb = function(callback) {
    var db = mongoose.connect(config.db);
    return db;
};