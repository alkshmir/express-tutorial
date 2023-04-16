"use strict";
//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient();

const tasksController = {};

tasksController.getAllTasks = async (req, res, next) => {
    const userId = req.session.userid;    
    try {
        const tasks = await req.context.prisma.task.findMany({
            where: { user_id: userId }    
        });
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

tasksController.createTask = async (req, res, next) => {
    const userId = req.session.userid;
    const content = req.body.content;
    
    try {
        const task = await req.context.prisma.task.create({
        data: {
            content: content,
            user_id: userId
        }
        });
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

module.exports = tasksController