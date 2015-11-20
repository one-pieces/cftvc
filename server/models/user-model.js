var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    givenName: String,
    familyName: String,
    email: String,
    username: {
        unique: true,
        type: String
    },
    password: String
});

module.exports = mongoose.model('User', UserSchema);