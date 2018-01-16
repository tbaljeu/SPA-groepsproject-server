// Setup.
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Raw schema.
const DataExamplesSchema = new Schema({
    name: String,
    timeStamp: String,
    info[
      energy: String,
      alert:String
    ]
});

// Raw model.
const DataExamples = mongoose.model('dataexamples', DataExamplesSchema);
module.exports = dataExamples;
