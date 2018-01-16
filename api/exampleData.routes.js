// ExampleData routing.
var Exampledata = require('../model/dataexamples');
var express = require('express');
var routes = express.Router();
var auth = require('../config/authenticator.js');
var rnl = require('newline-remove');

//alle exampleData Ophalen
//vanuit hier zet ik ze in angular in een array
//zodra er een ander voorbeeld aangemaakt moet worden moet hij deze functie ook opnieuw aanspreken.
routes.get('/exampledatas', function(req, res) {
  Rawdata.find({})
    .then((exampledatas) => res.status(200).send(exampledatas))
    .catch((error) => res.status(401).send(error));
});

// Nieuwe example aanmaken
// een example houd in wanneer een stuk ruwe data onbekend is, word gevraagt de waardes in te vullen
routes.post('/createexampledata', function(req, res) {
  let exampledata = new Exampledata(req.body);
  rawdata.save({})
    .then((exampledata) => res.status(200).send(exampledata))
    .catch((error) => res.status(401).send(error));
});
