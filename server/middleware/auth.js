const jwt = require('jsonwebtoken');
require('dotenv').config();
const {getUserIdByToken} = require("../models/token");
const {AuthError} = require("../errors");

function verify(token, secret) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secret, function (err, decode) {
      if (err) {
        reject(err)
        return
      }

      resolve(decode)
    })
  })
}

module.exports = {
  auth: async (req, res, next) => {
    try {
      const bearerHeader = req.get("Authorization");
      if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
      }

      if (!req?.token) {
        throw new AuthError("No token provided. Use Authorization: Bearer header.");
      }

      await verify(req?.token, process.env.TOKEN_SECRET);

      const userId = await getUserIdByToken(req?.token);
      if (!userId) {
        throw new AuthError("User not authorized");
      }
      res.locals.userId = userId;
      next();
    } catch (err) {
      next(err);
    }
  }
};
