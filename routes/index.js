"use strict";
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const dbMiddleware = require('../middlewares/dbMiddle');
const requireAuth = require('../middlewares/authMiddle');

router.use(dbMiddleware);

router.get('/', requireAuth, taskController.getAllTasks);

router.post('/', requireAuth, taskController.createTask);

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
