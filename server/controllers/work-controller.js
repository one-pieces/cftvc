var Work = require('../models/work-model');

exports.create = function(req, res, next) {
    var _work = new Work(req.body);

    _work.save(function(err, work) {
        if (err) {
            return next(err);
        } else {
            res.json(work);
        }
    });
}

exports.findById = function(req, res, next) {
    var workId = req.params.id;

    Work.findById(workId, function(err, work) {
        if (err) {
            res.status(400);
            res.json("Error occured: " + err);
        } else {
            if (work) {
                var _work = work;
                res.json(_work);
            } else {
                res.status(404);
                res.json("Can't find the work.");
            }
        }
    });
}

exports.findAll = function(req, res, next) {
    Work.fetch(function(err, works) {
        if (err) {
            return next(err);
        } else {
            res.json(works);
        }
    });
}