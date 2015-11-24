var User = require('../models/user-model.js');

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
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
    var _user = new User(req.body);
    User.findOne({username: _user.username}, function(err, user) {
        console.log(err);
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
                            res.json(user);
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