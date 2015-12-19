var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 0;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    role: {
        name: String,
        id: String
    },
    username: {
        unique: true,
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    },
    token: String
});

UserSchema.pre('save', function(next) {
    var user = this;
    this.meta.createAt = this.meta.updateAt = Date.now();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('findOneAndUpdate', function(next) {
    this.update({}, { $set: { 'meta.updateAt': Date.now() }});
    var set = this._update.$set;
    if (Object.keys(set).indexOf('password') > -1) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(set['password'], salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                set['password'] = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            cb(err, isMatch);
        });
    }
}

UserSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
}

module.exports = mongoose.model('User', UserSchema);