var Creator = require('../models/creator-model');

exports.create = function(req, res, next) {
    var _creator = new Creator(req.body);

    _creator.save(function(err, creator) {
        if (err) {
            return next(err);
        } else {
            res.json(creator);
        }
    });
}

exports.findById = function(req, res, next) {
    var creatorId = req.params.id;

    Creator.findById(creatorId, function(err, creator) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (creator) {
                var _creator = creator;
                res.json(_creator);
            } else {
                res.status(404);
                res.json("Can't find the creator.");
            }
        }
    });
}

exports.findAll = function(req, res, next) {
    Creator.fetch(function(err, creators) {
        if (err) {
            return next(err);
        } else {
            res.json(creators);
        }
    });
}