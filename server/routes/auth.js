const express = require('express');
const authRouter = express.Router();
const {NotFoundError, BadRequestError} = require("../errors");
const {addToken, deleteByToken} = require("../models/token");
const {getUserByLogin} = require("../models/user");
const {auth} = require("../middleware/auth");

const COOKIE_NAME = "token";

authRouter.post("/", async (req, res, next) => {
    try {
        const user = await getUserByLogin(req.body.login);

        if (!user) {
            throw new NotFoundError("User not found.");
        }

        if (!user.validPassword(req.body.password)) {
            throw new BadRequestError("Wrong password.");
        }

        // TODO: JWT token
        // @see https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
        const token = await addToken(user.id);
        res.cookie(COOKIE_NAME, token, {
            maxAge: 24 * 60 * 60 * 1000, // TODO: to const
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(200).json({ok: true});
    } catch (err) {
        next(err);
    }
});

authRouter.delete("/", auth, async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // delete token from DB
        await deleteByToken(token);

        // delete cookie
        res.clearCookie(COOKIE_NAME);

        res.status(200).json({ok: true});
    } catch (err) {
        next(err);
    }
});

module.exports = authRouter;
