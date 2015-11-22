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
    var userId = req.params.id;

    User.findOne({_id: userId}, function(err, user) {
        res.json(user);
    });
}

exports.login = function(req, res, next) {
    var user = new User(req.body);

    User.findOne({username: user.username}, function(err, user) {
        res.json(user);
    })
}