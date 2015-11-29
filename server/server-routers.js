var authorization = require('./middleware/authorization');
var actorController = require('./controllers/actor-controller');
var userController = require('./controllers/user-controller');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', authorization.ensureAuthorized, userController.me);
    app.get('/api/v1/user/:id', userController.findById);

    app.post('/api/v1/actor', actorController.create);
};