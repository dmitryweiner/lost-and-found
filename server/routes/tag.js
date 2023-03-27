const express = require('express');
const {auth} = require("../middleware/auth");
const {getDb} = require("../db");
const tagRouter = express.Router();

// get all tags
tagRouter.get("/", auth, async (req, res) => {
  const tags = await getDb().models.Tag.findAll({where: {UserId: res.locals.userId}});
  res.json(tags);
});

tagRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const tag = await getDb().models.Tag.findByPk(req.params.id);
    await tag.destroy();
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

module.exports = tagRouter;
