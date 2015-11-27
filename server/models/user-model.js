var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SALT_WORK_FACTOR = 0;
var JWT_SECRET = 'op';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: String,
    givenName: String,
    familyName: String,
    email: String,
    mobile: String,
    brithday: String,
    location: String,
    gender: String,
    role: String,
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
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    user.token = jwt.sign(user, JWT_SECRET);

    if (!user.isModified('password')) {
        return next();
    }
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