"use strict";
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signup')

router.get('/', function (req, res, next) {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.post('/', signupController.register);
module.exports = router;