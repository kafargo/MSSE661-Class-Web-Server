const express = require('express');
const controllers = require('../controllers/auth.controller');

const authRoutes = express.Router();

/**
 * Routes for all recipes. Evaluates to `/recipes/`.
 */
// http://localhost:3000/.../register

authRoutes.post('/register', controllers.register);

authRoutes.post('/login', controllers.login);

module.exports = authRoutes;
