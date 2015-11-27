var User = require('../models/user-model.js');

exports.signup = function(req, res, next) {
    var _user = new User(req.body);

    _user.save(function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.me = function(req, res, next) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (user) {
                var _user = user;
                delete _user.password;
                res.json(_user);
            } else {
                res.status(404);
                res,json("Can't find the user.");
            }
        }
    });
}

exports.findById = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (user) {
                var _user = user;
                delete _user.password;
                res.json(_user);
            } else {
                res.status(404);
                res,json("Can't find the user.");
            }
        }
    });
}

exports.login = function(req, res, next) {
    var _user = new User(req.body);
    User.findOne({username: _user.username}, function(err, user) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (!user) {
                res.status(404);
                res.json("Incorrect username");
            } else {
                user.comparePassword(_user.password, function(err, isMatch) {
                    if (err) {
                        res.status(400);
                        res.json("Error occured: " + err);
                    } else {
                        if (isMatch) {
                            res.json(user.token);
                        } else {
                            res.status(404);
                            res.json('Password is not matched.');
                        }
                    }
                });
            }
        }
    })
}