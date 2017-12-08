// Recipe routing.
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');

// Recept.
const Recipe = require('../model/recipe.model');

// Alle recepten ophalen via promise.
routes.get('/recipes', function(req, res) 
{
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => 
        {
            // Loggen.
            res.status(200).json(recipes);
        })
        .catch((error) => res.status(401).json(error));
});

// Specifiek recept op _id opvragen.
routes.get('/recipes/:id', function(req, res)
{
    Recipe.findById(req.params.id, (err, recipe) => 
    {  
        if (err) 
        {
            res.status(500).send(err)
        }

        if (recipe) 
        {
            res.status(200).send(recipe)
        } 
        
        else 
        {
            res.status(404).send("No recipe found with that _id.")
        }
    });
});

// Nieuw recept, op basis van de body.
routes.post('/createrecipe', function(req, res) 
{
    let recipe = new Recipe(req.body);  
    //recipe.save((err, createdRecipeObject) => 
    // {  
    //     if (err) 
    //     {
    //         res.status(500).send(err);
    //     }

        //res.status(200).send(createdRecipeObject);
    //});
    res.status(200).send(req.body);
    recipe.save();
});

// Bewerkt recept.
routes.put('/editrecipe/:id', function(req, res) 
{
    Recipe.findById(req.params.id, (err, recipe) => {  
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            // Update each attribute with any possible attribute that may have been submitted in the body of the request
            // If that attribute isn't in the request body, default back to whatever it was before.
            
            //recipe.name = req.body
            recipe.name = "Pizza Kip" || recipe.name;
    
            // Save the updated document back to the database
            recipe.save((err, recipe) => {
                if (err) {
                    res.status(500).send(err)
                }
                res.status(200).send(recipe);
            });
        }
    });
});

// Verwijder recept.
routes.delete('/deleterecipe/:id', function(req, res) 
{
    Recipe.findByIdAndRemove(req.params.id, (err, recipe) => {  
        res.status(200).send("Deleted.");
    });
});

module.exports = routes;