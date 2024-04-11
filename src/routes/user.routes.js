const express = require('express');
const {getUser} = require('../controllers/user.controller');
const canAccess = require('../middleware/auth.middleware');

const userRoutes = express.Router();

userRoutes.get('/currentuser', canAccess, getUser); // /api/users/currentuser

module.exports = userRoutes;