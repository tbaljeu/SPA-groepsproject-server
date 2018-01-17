// Server API.
var http            = require('http');
var express         = require('express');
var bodyParser      = require('body-parser');
var logger          = require('morgan');
var jwt 		    = require('express-jwt');
var mongodb         = require('./config/mongo.db');
var environment     = require('./config/environment');
var app             = express();

// BodyParser zorgt dat we de body uit een request kunnen gebruiken.
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// Routes.
var userroutes      = require('./api/user.routes');
var rawdataroutes   = require('./api/rawdata.routes')

// JWT nodig behalve op gespecifeerde routes.
app.use(jwt(
    {
        secret: process.env.TOPSECRET
    })
    .unless(
    {
        path: 
        [
            { url: '/api/v1/createuser', methods: ['POST'] },
            { url: '/api/v1/authenticate', methods: ['POST'] }
        ]
    })
);

// Installeer de routes.
app.use('/api/v1', userroutes);
app.use('/api/v1', rawdataroutes);

// Configureer de app.
app.set('port', (process.env.PORT | environment.env.webPort));
app.set('env', (process.env.ENV | 'development'))

// Logger.
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
app.listen(environment.env.webPort, function () 
{
    console.log('De server luistert op port: ' + app.get('port'));
    console.log('Zie voorbeeld http://localhost:3000/api/authenticate');
});

// Exporteren.
module.exports = app;