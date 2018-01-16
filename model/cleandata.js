// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Clean schema.
const CleandataSchema = new Schema({
    name: String,
    info: 
      [{
        timeStamp: String,
        energy: String,
        alert: String
      }]
});

// Clean model.
const Cleandata = mongoose.model('cleandata', CleandataSchema);
module.exports = Cleandata;