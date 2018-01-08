// Login.
var User        = require('../model/user');
var express     = require('express');
var routes      = express.Router();
var auth        = require('../config/authenticator.js');

// Login met username en password.
routes.post('/login', function(req, res)
 {
    var newUsername = req.body.username;
    var newPassword = req.body.password;

    User.findOne({username: newUsername, password: newPassword })
        .then((token) => 
        {
            var took = auth.encodeToken(username, password);
            res = took;
            res.status(200).json(res, token); 
            /*
            var token = auth.encodeToken(username, password);
            res.status(200).send({"token":token});
            
            // Hier krijg je een gegenereerde token op basis van je username en password.

            var token = auth.encodeToken(username, password);
            response.status(200).json({
                "token": token
            });

            console.log("[TOKEN RECEIVED]")
            */
        })
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