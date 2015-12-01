var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CreatorSchema = new Schema({
    intro: String,
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
    nickname: String,
    givenName: String,
    familyName: String,
    // email: String,
    mobile: String,
    // brithday: String,
    location: String,
    gender: String,
    role: String,
    type: String,
    label: String,
    avatarUrl: String
});

CreatorSchema.pre('save', function(next) {
    var creator = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

CreatorSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
}

module.exports = mongoose.model('Creator', CreatorSchema);