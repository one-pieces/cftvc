var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var WorkSchema = new Schema({
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
    title: String,
    creator: {
        type: ObjectId,
        ref: 'Creator'
    },
    comments: Array,
    pv: {
        type: Number,
        default: 0
    },
    type: String,
    category: String,
    poster: String,
    likers: Array,
    videoUrl: String
});

WorkSchema.pre('save', function(next) {
    var Work = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

WorkSchema.statics = {
    fetch: function(cb) {
        return this.find({}).sort('meta.updateAt').populate('creator').exec(cb);
    },
    findById: function(id, cb) {
        return this.findOne({_id: id}).populate('creator').exec(cb);
    }
}

module.exports = mongoose.model('Work', WorkSchema);