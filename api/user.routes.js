// // user routing.
var User = require('../model/user');
var Image = require('../model/image');
var express = require('express');
var routes = express.Router();

// Alle users ophalen via promise.
routes.get('/users', function(req, res)
 {
    User.find({})
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(401).send(error));
});

// Specifiek 1 user op username en password opvragen.
routes.get('/users/:username/:password', function(req, res)
{
    User.findOne({username: req.params.username,password:req.params.password })
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(401).send(error));
});

// Nieuwe user, op basis van de request body.
routes.post('/createuser', function(req, res)
{
    // user aanmaken.
    let user = new User(req.body);
    //user opslaan, met catch.
    user.save({})
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(401).send(error));
});

// Bewerkt user.
routes.put('/edituser/:id/:username/:password', function(req, res)
{
    // Vindt user, verandert atribuut, slaat op.
    User.findById({ _id: req.params.id })
        .then((user) =>
        {
            user.username = req.params.username;
            user.password = req.params.password;
            user.save({})
                .then((user) => res.status(200).send(user))
                .catch((error) => res.status(401).send(error));
            res.status(200).json(user);
        })
        .catch((error) => res.status(401).send(error));
});

// Verwijder user.
routes.delete('/deleteuser/:id', function(req, res)
{
    User.findByIdAndRemove({ _id: req.params.id })
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(401).send(error));
});

module.exports = routes;