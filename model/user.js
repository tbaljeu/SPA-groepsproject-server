const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../config/mongo.db');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique:[true,"user already exists"]
    },

    password: {
        type: String,
        required: [true,"password is required"]
    }
});


const User = mongoose.model('user', UserSchema);

module.exports = User;