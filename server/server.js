// 必须先设置环境
var serverMode = require('./server_mode.js');
process.env.NODE_ENV = serverMode.DEVELOPMENT_MODE;

var config = require('../config/config.js');
var index = require('./controllers/index.js');
process.env.PORT = config.server.port || 5000;

var serverLib = require('./server_lib.js');

var db = serverLib.createDbAndLoadData();
var app = serverLib.createApp();
var server = require('http').createServer(app);

app.set('port', process.env.PORT);

app.get('/' + config.appName + '*', index.render);

server.listen(app.get('port'), function() {
    console.log(config.appName +' is listening port ' + app.get('port'));
});