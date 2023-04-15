"use strict";
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

let todos = [];

router.get('/', taskController.getAllTasks);

router.post('/', taskController.createTask);

router.use('/signup', require('./signup'));

module.exports = router;
