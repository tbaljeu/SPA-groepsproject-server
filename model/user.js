// Setup.
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt      = require('bcrypt');

// Grade schema.
const UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.pre('save', function (next) 
{
    var user = this;
    this.hashPassword(user.password, function (err, hash)
    {
        if (err)
        {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

UserSchema.methods.hashPassword = function (candidatePassword, cb)
{
    bcrypt.genSalt(10, function (err, salt)
    {
        if (err)
        {
            return cb(err);
        }

        bcrypt.hash(candidatePassword, salt, function (err, hash)
        {
            if (err)
            {
                return cb(err);
            }

            return cb(null, hash);
        });
    });
}

// Grade model.
const User = mongoose.model('user', UserSchema);
module.exports = User;