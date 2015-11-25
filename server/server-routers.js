var userController = require('./controllers/user-controller.js');

module.exports = function(app) {
    app.post('/api/v1/user', userController.signup);
    app.post('/api/v1/user/login', userController.login);
    app.get('/api/v1/user/me', userController.findCurrentUser);
    app.get('/api/v1/user/:id', userController.findUser);
};