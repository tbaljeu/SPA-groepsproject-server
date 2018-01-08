const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: 
    {
        type: String,
        required: [true,"username is required"],
        unique:[true,"username already exists"]
    },

    password: 
    {
        type: String,
        required: [true,"password is required"]
    },

    admin: 
    {
        type: Boolean
    }
});


const User = mongoose.model('user', UserSchema);

module.exports = User;