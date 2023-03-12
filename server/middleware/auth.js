const {getUserIdByToken} = require("../models/token");
const {AuthError} = require("../errors");

module.exports = {
  auth: async (req, res, next) => {
    try {
      const token = req.cookies["token"] ?? "";
      const userId = await getUserIdByToken(token);
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
