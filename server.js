// This is the main file for our server. It will contain all of the routes and logic for our application.
const dotenv = require('dotenv');
// Load environment variables from a .env file into process.env
dotenv.config();
// Load environment variables from a .env file into process.env
const express = require('express');
// Load the express library
const app = express();
// Create an express app
const mongoose = require('mongoose');
// Load the mongoose library
const methodOverride = require('method-override');
// Load the method-override library
const morgan = require('morgan');
// Load the morgan library
const session = require('express-session');
// Load the express-session library

const isSignedIn = require('./middleware/is-signed-in.js');
// Load the is-signed-in middleware
const passUserToView = require('./middleware/pass-user-to-view.js');
// Load the pass-user-to-view middleware

const authController = require('./controllers/auth.js');
// Load the auth controller
// server.js

// Load the applications controller
const applicationsController = require('./controllers/applications.js');

// Load the applications controller
const port = process.env.PORT ? process.env.PORT : '3000';

// Load the applications controller
mongoose.connect(process.env.MONGODB_URI);
// Connect to the MongoDB database


mongoose.connection.on('connected', () => { //`
// When the connection is successful, log a message to the console
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  //  When the connection is successful, log a message to the console
});

app.use(express.urlencoded({ extended: false }));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(methodOverride('_method'));
// Use the method-override library to enable DELETE and PUT routes
// app.use(morgan('dev'));
app.use( // Use the morgan library to log all requests to the console
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    
  })
);

app.use(passUserToView);
// Use the pass-user-to-view middleware for all routes
app.get('/', (req, res) => { // When a GET request is made to the root URL, render the index.ejs file
  if (req.session.user) { // If the user is signed in, redirect to the applications index
    res.redirect(`/users/${req.session.user._id}/applications`); // If the user is signed in, redirect to the applications index
  } else {  // If the user is not signed in, render the index.ejs file
    res.render('index.ejs'); // If the user is not signed in, render the index.ejs file
  }
});
 // Use the auth controller for all routes that start with /auth
app.use('/auth', authController);

app.use(isSignedIn);
// Use the is-signed-in middleware for all routes

app.use('/users/:userId/applications', applicationsController); // Use the applications controller for all routes that start with /users/applications
// New! ` /users/applications` is the base URL for all of our application routes`



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
