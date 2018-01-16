// Rawdata routing.
var Rawdata = require('../model/rawdata');
var express = require('express');
var routes = express.Router();
var auth = require('../config/authenticator.js');
var rnl = require('newline-remove');

// Alle rawdatas ophalen via promise.
routes.get('/rawdatas', function(req, res) {
  Rawdata.find({})
    .then((rawdatas) => res.status(200).send(rawdatas))
    .catch((error) => res.status(401).send(error));
});

// Specifiek 1 rawdata op opvragen.
routes.get('/rawdatas/:id', function(req, res) {
  Rawdata.findById({
      _id: req.params.id
    })
    .then((rawdata) => res.status(200).send(rawdata))
    .catch((error) => res.status(401).send(error));
});

// Nieuwe rawdata, op basis van de request body.
routes.post('/createrawdata', function(req, res) {
  // Aanmaken.
  let rawdata = new Rawdata(req.body);
  rawdata.data = rawdata.data.replace(/\n/g, '');
  rawdata.data = rawdata.data.replace(/\\/g, '');
  rawdata.data = rawdata.data.replace(/"/g, "'");

  // Opslaan.
  rawdata.save({})
    .then((rawdata) => res.status(200).send(rawdata))
    .catch((error) => res.status(401).send(error));
});

// Bewerkt rawdata.
routes.put('/editrawdata/:id/:data', function(req, res) {
  // Vindt rawdata, verandert atribuut, slaat op.
  Rawdata.findById({
      _id: req.params.id
    })
    .then((rawdata) => {
      rawdata.data = req.params.data;
      rawdata.save({})
        .then((rawdata) => res.status(200).send(rawdata))
        .catch((error) => res.status(401).send(error));
      res.status(200).json(rawdata);
    })
    .catch((error) => res.status(401).send(error));
});

// Verwijder rawdata.
routes.delete('/deleterawdata/:id', function(req, res) {
  Rawdata.findByIdAndRemove({
      _id: req.params.id
    })
    .then((rawdata) => res.status(200).send(rawdata))
    .catch((error) => res.status(401).send(error));
});

module.exports = routes;