"use strict";
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')

router.get('/', function (req, res, next) {
    const redirectUrl = req.query.redirect || '/';
    res.render('signin', {
      title: 'Sign in',
      redirectUrl: redirectUrl
    });
});

router.post('/', authController.signin);


module.exports = router;