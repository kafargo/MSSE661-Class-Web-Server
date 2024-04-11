/**
 * Express is a javascript framework to create server-side applications.
 * All express apps start by requiring express and creating an instance of it.
 * 
 * Mongoose is a library that allows us to interact with MongoDB.
 */


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// below middleware is used to log requests to the console
const logger = require('morgan');
const bodyParser = require('body-parser');

// below middleware is used to handle routs and errors. these are user created middleware
const recipesRoutes = require('./routes/recipes.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const middleware = require('./middleware/errors.middleware');

// Create an instance of express
const app = express();
//variables to store the port and log level
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Make connection to the db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Recipes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Successfully connected to the database!');
});

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow websites to talk to our API service.
app.use(cors());

/**
 * the below components are the user defined middleware endpoints, and error handling middleware.
 */

// Handle routes for tasks.
app.use('/api/auth', authRoutes); // http://localhost:3000/api/auth
app.use('/api/recipes', recipesRoutes);
app.use('/api/users', userRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests
// applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});
