var User = require('../models/user-model.js');

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.send(user);
        }
    });
};

exports.findUser = function(req, res, next) {
    var user = new User({
        givenName: 'Xiaolong',
        familyName: 'Lin',
        email: 'linifftwe@163.com',
        userName: 'xiaolonglin',
        password: 'changeme'
    });

    res.json(user);
}

exports.login = function(req, res, next) {
    var user = new User(req.body);

    res.json(user);
}