var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nickname: String,
    givenName: String,
    familyName: String,
    email: String,
    mobile: String,
    brithday: String,
    location: String,
    sex: String,
    username: {
        unique: true,
        type: String
    },
    password: String
});

module.exports = mongoose.model('User', UserSchema);