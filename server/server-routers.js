var authorization = require('./middleware/authorization');
var userController = require('./controllers/user-controller.js');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', authorization.ensureAuthorized, userController.me);
    app.get('/api/v1/user/:id', userController.findById);
};