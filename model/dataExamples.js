// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// DataExample schema.
const DataExamplesSchema = new Schema({
    name: String,
    timeStamp: String,
    info:
      [{
        energy: String,
        alert:String
      }]
});

// DataExample model.
const DataExamples = mongoose.model('dataexamples', DataExamplesSchema);
module.exports = DataExamples;