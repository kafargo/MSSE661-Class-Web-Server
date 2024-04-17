const Recipe = require("../models/recipes.model");

/**
 * Retrieves all recipes.
 * @param {*} _ - The request object (not used in this function).
 * @param {*} res - The response object to send the data.
 */
exports.getAllRecipes = async function (_, res) {
    try {
        let data = await Recipe.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Creates a new recipe.
 * @param {*} req - The request object containing the recipe data.
 * @param {*} res - The response object to send the created recipe.
 */
exports.createRecipe = async function (req, res) {
    try {
        let newRecipe = await Recipe.create(req.body);
        res.send(newRecipe);
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Retrieves a specific recipe by name.
 * @param {*} req - The request object containing the recipe name.
 * @param {*} res - The response object to send the recipe data.
 */
exports.getRecipe = async function (req, res) {
    try {
        let data = await Recipe.find({ name: req.params.recipeName });
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Updates a specific recipe by name.
 * @param {*} req - The request object containing the recipe name and updated ingredients.
 * @param {*} res - The response object to send the updated recipe.
 */
exports.updateRecipe = async function (req, res) {
    try {
        let updatedRecipe = await Recipe.findOneAndUpdate(
            { name: req.params.recipeName },
            { ingredients: req.body.ingredients },
            { new: true }
        );
        res.send(updatedRecipe);
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Deletes a specific recipe by name.
 * @param {*} req - The request object containing the recipe name.
 * @param {*} res - The response object to send the deleted recipe.
 */
exports.deleteRecipe = async function (req, res) {
    try {
        let deletedRecipe = await Recipe.findOneAndDelete({
            name: req.params.recipeName,
        });
        res.send(deletedRecipe);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getRecipeIngredients = async function (req, res) {
    try {
        let names = req.body.names;
        let ingredients = await Recipe.find({ name: { $in: names } }, { ingredients: 1 });
        res.send(ingredients);
    } catch (err) {
        res.status(500).send(err);
    }
};
