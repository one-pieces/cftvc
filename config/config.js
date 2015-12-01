// module.exports = require('./env/' + process.env.NODE_ENV + '.js');
module.exports = require('./env/' + require('../server/server_mode.js').DEVELOPMENT_MODE + '.js');