var Actor = require('../models/actor-model');

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

exports.update = function(req, res, next) {
    var actorId = req.params.id;

    Actor.findOneAndUpdate({_id: actorId}, {$set: req.body}, {new : true}, function(err, actor) {
        res.json(actor);
    });
}

exports.findById = function(req, res, next) {
    var actorId = req.params.id;

    Actor.findById(actorId, function(err, actor) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (actor) {
                var _actor = actor;
                res.json(_actor);
            } else {
                res.status(404);
                res.json("Can't find the actor.");
            }
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