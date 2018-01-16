// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Raw schema.
const CleandataSchema = new Schema({
    name: String,
    timeStamp: String,
    info[
      energy: String,
      alert:String
    ]
});

// Raw model.
const Cleandata = mongoose.model('cleandata', CleandataSchema);
module.exports = Cleandata;
