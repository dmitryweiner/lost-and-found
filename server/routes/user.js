const express = require('express');
const {getUserIdByToken} = require("../models/token");
const {getUserByLogin, addUser} = require("../models/user");
const {BadRequestError} = require("../errors");
const {auth} = require("../middleware/auth");
const {getDb} = require("../db");
const userRouter = express.Router();

userRouter.get("/", auth, async (req, res, next) => {
    const db = getDb();
    try {
        const token = req.token;
        const userId = await getUserIdByToken(token);
        const isFull = !!req.query?.full;
        let user;

        if (isFull) {
            user = await db.models.User.findByPk(userId, {
                include: [
                    {
                        model: db.models.Tag,
                    },
                    {
                        model: db.models.Photo,
                    }
                ]
            });
        } else {
            user = await getDb().models.User.findByPk(userId);
        }
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/", async (req, res, next) => {
    try {
        const user = await getUserByLogin(req.body.login);
        if (user) {
            throw new BadRequestError("User with this login already exists.");
        }

        const newUser = await addUser(req.body.login, req.body.password);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;
