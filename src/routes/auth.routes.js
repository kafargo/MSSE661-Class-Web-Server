const express = require('express');
const controllers = require('../controllers/auth.controller');

const authRoutes = express.Router();

/**
 * Routes for all auths. Evaluates to `/auth/`.
 */
// http://localhost:3000/.../etc

authRoutes.post('/register', controllers.register);

authRoutes.post('/login', controllers.login);

authRoutes.delete('/delete', controllers.delete);

authRoutes.post('/logout', controllers.logout);

module.exports = authRoutes;
