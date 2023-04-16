"use strict";
const bcrypt = require("bcrypt");

const authController = {};

authController.register = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const repassword = req.body.repassword;

        // check if the user is already registered
        const user = await req.context.prisma.user.findUnique(
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
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(async (hash) => {
            // Store hash in your password DB.
            const newuser = await req.context.prisma.user.create({
                data: {
                    name: username,
                    password: hash
                }
            });
        });
        res.redirect('/')
    } catch (err) {
        next(err);
    }
}

authController.signin = async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const redirectUrl = req.query.redirect || '/';
        const user = await req.context.prisma.user.findUnique({
            where: { 
                name: username
            }
        });
        if  (user === null || !await bcrypt.compare(password, user.password)) {
            res.status(401).render("signin", {
                title: "Sign in",
                errorMessage: ["ユーザ名が存在しないか、またはパスワードが異なります。"],
                redirectUrl: redirectUrl
            });
            return;
        }
        req.session.userid = user.id;
        res.redirect('/')
    } catch (err) {
        next(err);
    }
}

module.exports = authController