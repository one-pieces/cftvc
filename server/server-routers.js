var authorization = require('./middleware/authorization');
var actorController = require('./controllers/actor-controller');
var creatorController = require('./controllers/creator-controller');
var userController = require('./controllers/user-controller');
var workController = require('./controllers/work-controller');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', authorization.ensureAuthorized, userController.me);
    app.post('/api/v1/user/me/comparePassword', authorization.ensureAuthorized, userController.comparePassword);
    app.get('/api/v1/user/:id', userController.findById);
    app.post('/api/v1/user/uploadAvatar', userController.uploadAvatar);
    app.post('/api/v1/user/uploadView', userController.uploadView);
    app.patch('/api/v1/user/me', authorization.ensureAuthorized, userController.update);
    app.delete('/api/v1/user/logout', authorization.ensureAuthorized, userController.logout);

    app.post('/api/v1/actor', actorController.create);
    app.get('/api/v1/actor', actorController.findAll);
    app.get('/api/v1/actor/:id', actorController.findById);
    app.patch('/api/v1/actor/:id', actorController.update);

    app.post('/api/v1/creator', creatorController.create);
    app.get('/api/v1/creator', creatorController.findAll);
    app.get('/api/v1/creator/:id', creatorController.findById);
    app.patch('/api/v1/creator/:id', creatorController.update);

    app.post('/api/v1/work', workController.create);
    app.get('/api/v1/work', workController.findAll);
    app.get('/api/v1/work/:id', workController.findById);
};