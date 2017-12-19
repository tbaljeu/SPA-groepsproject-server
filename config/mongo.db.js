// Setup.
const mongoose = require('mongoose');
const config = require('./env/env');

// Gebruik ES6 promises i.p.v. Mongoose mpromise.
mongoose.Promise = global.Promise;

mongoose.connect(config.dburl);
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dburl))
    .on('error', (error) => {console.warn('Warning', error.toString());});

// Connectie.
module.exports = connection;