var User = require('../models/user-model.js');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

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
                res.json("Can't find the user.");
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

exports.uploadAvatar = function(req, res, next) {
    var avatarData = req.files.file;
    var filePath = avatarData.path;
    var originalFilename = avatarData.originalFilename;

    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timeStamp = Date.now();
            var type = avatarData.type.split('/')[1];
            var nickname = avatarData.name.split('_')[0];
            var username = avatarData.name.split('_')[1];
            var avatarUrl = nickname + '_avatar_' + timeStamp + '.' + type;
            // var newPath = path.join(__dirname, '../../', '/app/static/images/users/' + username + '/');
            var newPath = path.join(__dirname, '../../', '/app/static/images/user/avatars/');
            mkdirp(newPath, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    fs.writeFile(newPath + avatarUrl, data, function(err) {
                        res.json({
                            data: avatarUrl
                        });
                        next();
                    });
                }
            });
        })
    } else {
        next();
    }
}

exports.uploadView = function(req, res, next) {
    var viewData = req.files.file;
    var filePath = viewData.path;
    var originalFilename = viewData.originalFilename;

    if (originalFilename) {
        fs.readFile(filePath, function(err, data) {
            var timeStamp = Date.now();
            var type = viewData.type.split('/')[1];
            var nickname = viewData.name.split('_')[0];
            var username = viewData.name.split('_')[1];
            var viewUrl = nickname + '_view_' + timeStamp + '.' + type;
            // var newPath = path.join(__dirname, '../../', '/app/static/images/users/' + username + '/');
            var newPath = path.join(__dirname, '../../', '/app/static/images/user/views/');
            mkdirp(newPath, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    fs.writeFile(newPath + viewUrl, data, function(err) {
                        res.json({
                            data: viewUrl
                        });
                        next();
                    });
                }
            });
        })
    } else {
        next();
    }
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