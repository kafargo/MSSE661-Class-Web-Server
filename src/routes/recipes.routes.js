const controllers = require('../controllers/recipes.controller');
const express = require('express');

const recipesRoutes = express.Router();
/**
 * Express routes for Recipes.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all recipes. Evaluates to `/recipes/`.
 */
// http://localhost:3000/recipes/
recipesRoutes
    .get('/', controllers.getAllRecipes)
    .post('/', controllers.createRecipe);

/**
 * Routes for a recipe by id. Evalutes to `/recipes/:recipeId`.
 */
// http://localhost:3000/recipes/recipeName
recipesRoutes
  .get('/:recipeName', controllers.getRecipe)
  .post('/:recipeName', controllers.updateRecipe)
  .delete('/:recipeName', controllers.deleteRecipe);

  module.exports = recipesRoutes;