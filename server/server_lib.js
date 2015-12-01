var mongoose = require('mongoose');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var ejs = require('ejs');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var multiparty = require('connect-multiparty');

var config = require('../config/config.js');
var serverMode = require('./server_mode.js');

var db;

exports.createApp = function(callback) {
    var app = express();
    var staticPath = './build/develop';

    if (process.env.NODE_ENV === serverMode.DEVELOPMENT_MODE) {
        app.use(morgan('dev'));
    } else {
        staticPath = './build/dist';
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(multiparty());
    app.use(cookieParser());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    app.set('port', process.env.PORT);
    app.set('views', './app');
    app.engine('.html', ejs.__express);
    app.set('view engine', 'html'); //替换文件扩展名ejs为html

    // app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.static('./app'));
    app.use(express.static(staticPath)); //Serve compiled files out of build
    app.use('/app', express.static(path.join(__dirname, '../app'))); //Workaround for loading ts files for the chrome debugger

    require('./server-routers.js')(app);

    return app;
};

// exports.createDb = function(callback) {
//     console.log(config.db);
//     db = mongoose.connect(config.db);
//     return db;
// };

exports.createDbAndLoadData = function() {
    if (db == null) {
        db = mongoose.connect(config.db);

        var dataFiles = glob.sync(__dirname + '/data/default/**/*.json');
        dataFiles.forEach(function(dataFile) {
            fs.readFile(dataFile, function(err, fileData) {
                var dataJson = JSON.parse(fileData);
                var Model = require('./models/' + dataJson.model);
                Model.remove({}, function(err) {
                    dataJson.data.forEach(function(data) {
                        var dataModel = new Model(data);
                        dataModel.save(function(err, data) {
                            if (err) {
                                console.log(err);
                            }
                            // if (err) {
                            //     console.log(err);
                            // } else {
                            //     console.log(data.role + '_' + data._id + 'has been loaded successfully.');
                            // }
                        });
                    });
                });
            });
        });
    }
    return db;
};