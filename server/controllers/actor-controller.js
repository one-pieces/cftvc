var Actor = require('../models/actor-model.js');

exports.create = function(req, res, next) {
    var _actor = new Actor(req.body);

    _actor.save(function(err, actor) {
        if (err) {
            return next(err);
        } else {
            res.json(actor);
        }
    });
}

exports.findAll = function(req, res, next) {
    Actor.fetch(function(err, actors) {
        if (err) {
            return next(err);
        } else {
            res.json(actors);
        }
    });
}