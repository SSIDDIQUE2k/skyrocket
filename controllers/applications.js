// controllers/applications.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// we will build out our router logic here
// controllers/applications.js

// controllers/applications.js

router.get('/', async (req, res) => {
    try {
      res.render('applications/index.ejs');
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  });
  
  router.get('/', (req, res) => {   
    res.send('Hello from applications controller');
    });
module.exports = router;

