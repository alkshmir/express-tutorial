"use strict";
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/', function (req, res, next) {
  res.render('signup', {
    title: 'Sign up',
  });
});

router.post('/', authController.register);
module.exports = router;