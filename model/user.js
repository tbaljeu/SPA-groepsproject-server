const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const connection = require('../config/mongo.db');
const picSchema = require('./image');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique:[true,"username already exists"]
    },

    password: {
        type: String,
        required: [true,"password is required"]
    },
    images:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image'
    }]
});


const User = mongoose.model('user', UserSchema);

module.exports = User;