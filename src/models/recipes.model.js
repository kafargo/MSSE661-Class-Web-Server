// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection (if one is not already created)
const RecipeSchema = new Schema({
  name: String,
  ingredients: Array
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('Recipe', RecipeSchema);