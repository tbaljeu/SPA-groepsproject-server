// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Raw schema.
const RawdataSchema = new Schema({
    data: String
});

// Raw model.
const Rawdata = mongoose.model('rawdata', RawdataSchema);
module.exports = Rawdata;