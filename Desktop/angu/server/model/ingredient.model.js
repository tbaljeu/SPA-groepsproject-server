const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// definitie van je database:
const IngedientSchema = new Schema({
    //_id: String,
    name: String,
    amount: Number
});

module.exports = IngedientSchema;
