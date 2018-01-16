// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Grade schema.
const UserSchema = new Schema({
    username: String,
    password: String
});

// Grade model.
const User = mongoose.model('user', UserSchema);
module.exports = User;