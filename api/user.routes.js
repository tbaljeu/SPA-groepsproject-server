// // user routing.
var User        = require('../model/user');
var express     = require('express');
var routes      = express.Router();
var bcrypt      = require('bcrypt');
var auth        = require('../config/authenticator.js');

// Alle users ophalen via promise.
routes.get('/users', function(req, res) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(401).send(error));
});

routes.get('/testtoken', function(req, res) {
  res.send("How'd you get here?!");
});

// Token genereren, inloggen. 
routes.post('/authenticate', function(req, res) {
  User.findOne({
    username: req.body.username
  }, 
  
  function(err, user) 
  {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed.'
      });
    } 
    
    else if (user) {
      // Komen passwords overeen?
      console.log("[User gevonden, gegevens;]");
      console.log(user);

      auth.comparePasswords(req.body.password, user.password, function(isMatch){
        if(!isMatch){
          res.json({
            success: false,
            message: 'Authentication failed.'
          });
        } 

        else {
          // Token maken.
          var token = auth.encodeToken(user.username, user.password);
          res.status(200).json({
            "token": token,
          });
        }
      })
    }
  });
});

// Specifiek 1 user op username en password opvragen.
routes.get('/users/:id', function(req, res) {
  User.findById({_id: req.params.id})
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(401).send(error));
});

// Nieuwe user, op basis van de request body MET password hashing.
routes.post('/createuser', function(req, res) {
  let user = new User(req.body);
  user.password = bcrypt.hashSync(req.body.password, 10);

  user.save({})
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(401).send(error));
});

// Bewerkt user. Vinden, dan aanpassen.
routes.put('/edituser/:id/:username/:password', function(req, res) {
  User.findById({_id: req.params.id})

    .then((user) => {
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
routes.delete('/deleteuser/:id', function(req, res) {
  User.findByIdAndRemove({
      _id: req.params.id
    })
    .then((user) => res.status(200).send(user))
    .catch((error) => res.status(401).send(error));
});

module.exports = routes;