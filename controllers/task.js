"use strict";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const tasksController = {};

tasksController.getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.render('index', 
        { 
            title: "ToDo App",
            todos: tasks,
        }
    );
  } catch (err) {
    next(err);
  }
}

tasksController.createTask = async (req, res) => {
  const content = req.body.content;
  //const user_id = req.body.user_id
  const user_id = 1;

  try {
    const task = await prisma.task.create({
      data: {
        content: content,
        user_id: user_id
      }
    });
    res.redirect('/');
  } catch (err) {
    next(err);
  }
}

module.exports = tasksController