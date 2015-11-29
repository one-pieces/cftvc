var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActorSchema = new Schema({
    nickname: String,
    height: String,
    weight: String,
    chest: String,
    waist: String,
    hip: String,
    shoseSize: String,
    hairColor: String,
    eyeColor: String,
    // experience: String,
    // style: String,
    // range: [{
    //     category: String,
    //     subdivision: String,
    //     remark: String
    // }],
    // portraits: String[],
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

ActorSchema.pre('save', function(next) {
    var actor = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

ActorSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).exec(cb);
    }
}

module.exports = mongoose.model('Actor', ActorSchema);