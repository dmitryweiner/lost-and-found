const {getUserIdByToken} = require("../models/token");
const {AuthError} = require("../errors");

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
