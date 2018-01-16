var Exampledata = require('../model/cleandata');
var express = require('express');
var routes = express.Router();
var auth = require('../config/authenticator.js');
var rnl = require('newline-remove');

// Nieuwe clean data aanmaken
// clean data is er om af te vangen in de tables
routes.post('/createcleandata', function(req, res) {
  let cleandata = new Cleandata(req.body);
  rawdata.save({})
    .then((cleandata) => res.status(200).send(cleandata))
    .catch((error) => res.status(401).send(error));
});

//alle cleandata ophalen
routes.get('/cleandatas', function(req, res) {
  Rawdata.find({})
    .then((cleandatas) => res.status(200).send(cleandatas))
    .catch((error) => res.status(401).send(error));
});
