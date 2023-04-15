"use strict";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signupController = {};

signupController.register = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const repassword = req.body.repassword;

        // check if the user is already registered
        const user = await prisma.user.findUnique(
            {
                where: {name: username}
            }
        )
        if (user !== null) {
            console.log('Already registered');
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["このユーザ名は既に使われています"],
            });
            return;
        }
        if (password !== repassword){
            res.render("signup", {
                title: "Sign up",
                errorMessage: ["パスワードが一致しません"],
            });
            return;
        }
        const newuser = await prisma.user.create({
            data: {
                name: username,
                password: password
            }
        });
        res.redirect('/')
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = signupController