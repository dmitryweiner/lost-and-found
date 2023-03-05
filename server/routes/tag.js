const express = require('express');
const {auth} = require("../middleware/auth");
const {getDb} = require("../db");
const tagRouter = express.Router();

// get all tags
tagRouter.get("/", auth, async (req, res) => {
  const tags = await getDb().models.Tag.findAll({where: {userId: res.locals.userId}});
  res.json(tags);
});

module.exports = tagRouter;
