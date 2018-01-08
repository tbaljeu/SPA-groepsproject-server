// // user routing.
var User        = require('../model/user');
var express     = require('express');
var routes      = express.Router();
var auth        = require('../config/authenticator.js');

// Alle users ophalen via promise.
routes.get('/users', function(req, res)
 {
    User.find({})
        .then((users) => res.status(200).send(users))
        .catch((error) => res.status(401).send(error));
});

routes.get('/testtoken', function(req, res)
{
   res.send("How'd you get here?!");
});

routes.post('/authenticate', function(req, res) 
{
    
      // find the user
      User.findOne({
        username: req.body.username
      }, function(err, user) {
    
        if (err) throw err;
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password

        var token = auth.encodeToken("user1", "password");
        res.status(200).json({
            "token": token,
        });
          }   
    
        }
    
      });
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