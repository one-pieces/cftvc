var authorization = require('./middleware/authorization');
var actorController = require('./controllers/actor-controller');
var creatorController = require('./controllers/creator-controller');
var userController = require('./controllers/user-controller');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', authorization.ensureAuthorized, userController.me);
    app.get('/api/v1/user/:id', userController.findById);
    app.post('/api/v1/user/uploadAvatar', userController.uploadAvatar);
    app.post('/api/v1/user/uploadView', userController.uploadView);

    app.post('/api/v1/actor', actorController.create);
    app.get('/api/v1/actor', actorController.findAll);
    app.get('/api/v1/actor/:id', actorController.findById);

    app.post('/api/v1/creator', creatorController.create);
    app.get('/api/v1/creator', creatorController.findAll);
    app.get('/api/v1/creator/:id', creatorController.findById);
};