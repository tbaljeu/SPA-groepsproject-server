// Server API.
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongodb = require('./config/mongo.db');
var reciperoutes = require('./api/recipe.routes');
var config = require('./config/env/env');

// Express.
var app = express();
module.exports = {};

// BodyParser zorgt dat we de body uit een request kunnen gebruiken.
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

// Configureer de app.
app.set('port', (process.env.PORT | config.env.webPort));
app.set('env', (process.env.ENV | 'development'))

// wanneer je je settings wilt controleren
// console.dir(config);
// console.log(config.dburl);

// Installeer Morgan als logger.
app.use(logger('dev'));

// CORS headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Installeer de routers.
app.use('/api/v1', reciperoutes);

// Errorhandler voor express-jwt errors
// Wordt uitgevoerd wanneer err != null; anders door naar next().
app.use(function (err, req, res, next) {
    // console.dir(err);
    var error = {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }
    res.status(401).send(error);
});

// Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd. 
app.use('*', function (req, res) {
    res.status(400);
    res.json({
        'error': 'Deze URL is niet beschikbaar.'
    });
});

// Installatie klaar; start de server.
app.listen(config.env.webPort, function () {
    console.log('De server luistert op port ' + app.get('port'));
    console.log('Zie bijvoorbeeld http://localhost:3000/api/recipes');
});

// Voor testen met mocha/chai moeten we de app exporteren.
module.exports = app;