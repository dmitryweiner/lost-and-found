const express = require('express');
const {getUserIdByToken} = require("../models/token");
const {getUserByLogin, addUser, getUserById} = require("../models/user");
const {BadRequestError} = require("../errors");
const {auth} = require("../middleware");
const userRouter = express.Router();

userRouter.get("/", auth, async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userId = await getUserIdByToken(token);
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

});

userRouter.post("/", async (req, res, next) => {
    try {
        const user = await getUserByLogin(req.body.login);
        if (user) {
            throw new BadRequestError("Такой пользователь уже есть");
        }

        const newUser = await addUser(req.body.login, req.body.password);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;
