const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ingredientSchema = require('../model/ingredient.model.js');

// definitie van je database:
const RecipeSchema = new Schema({
    //_id: String,
    name: {
        type:String,
        required: true,
        unique: true
    },
    description: String,
    imagePath: String,
    ingredients: [ingredientSchema]
});


const Recipe = mongoose.model('recipe', RecipeSchema);

// alles wat naar buiten toe wordt geexporteerd:
module.exports = Recipe;
//ik zoek hier naareen recipe met de naam allIngredients als deze nog niet bestaat kan je deze aanmaken hieraan voegen we alle ingredients toe
Recipe.find({name : "AllIngredients"}, function (err, docs) {
        if (docs.length){
            //doe niks
        }
        else{
          const recipe = new Recipe({
              name: 'AllIngredients',
              description: 'Test recipe',
              imagePath: 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
              ingredients: [
                  { name: 'Pizzabodem', amount: 1},
                  { name: 'Kaas', amount: 1},
                  { name: 'Tomatensaus', amount: 1},
                  { name: 'Salami', amount: 5},
                  ]
          }).save();
        }
    });
