// Server API.
var http        = require('http');
var express     = require('express');
var bodyParser  = require('body-parser');
var logger      = require('morgan');
var mongodb     = require('./config/mongo.db');
var config      = require('./config/env/env');
var jwt 		= require('express-jwt');
var app         = express();

// Routes.
var userroutes = require('./api/user.routes');
//var imageroutes = require('./api/images.routes');
//var genreRoutes = require('./api/image.routes');
// BodyParser zorgt dat we de body uit een request kunnen gebruiken.
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Configureer de app.
app.set('port', (process.env.PORT | config.env.webPort));
app.set('env', (process.env.ENV | 'development'))

// Installeer Morgan als logger.
app.use(logger('dev'));

// CORS headers.
app.use(function (req, res, next) 
{
    // Website die mag verbinden.
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || 'http://localhost:4200');
    // Requests die mogen.
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers die mogen.
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Cookies true/false.
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Installeer de routes.
app.use('/api/v1', userroutes);
//app.use('/api/v1', imageroutes);

// Wordt uitgevoerd wanneer err != null; anders door naar next().
app.use(function (err, req, res, next) 
{
    var error = 
    {
        message: err.message,
        code: err.code,
        name: err.name,
        status: err.status
    }

    res.status(401).send(error);
});

// Fallback - als geen enkele andere route slaagt wordt deze uitgevoerd. 
app.use('*', function (req, res) 
{
    res.status(400);
    res.json({'error': 'Deze URL is niet beschikbaar.'});
});

// Installatie klaar, start de server.
app.listen(config.env.webPort, function () 
{
    console.log('De server luistert op port ' + app.get('port'));
    console.log('Zie bijvoorbeeld http://localhost:3000/api/recipes');
});

// Voor testen met mocha/chai moeten we de app exporteren.
module.exports = app;