const express = require('express');
const {getDb} = require("../db");
const {auth} = require("../middleware/auth");
const {NotFoundError, NotImplementedError, BadRequestError} = require("../errors");
const md5 = require("md5");
const {Op} = require("sequelize");
const photoRouter = express.Router();

photoRouter.post("/", auth, async (req, res, next) => {
  const user = await getDb().models.User.findByPk(res.locals.userId);
  try {
    let tags = req.body.tags;
    if (!Array.isArray(tags)) {
      throw new BadRequestError("tags should be an string array");
    }

    tags = [...new Set(tags)];

    const tagModels = [];
    for (let tag of tags) {
      let tagModel = await getDb().models.Tag.findOne({where: {name: tag}});
      if (!tagModel) {
        tagModel = await getDb().models.Tag.create({
          name: tag
        });
      }
      await tagModel.setUser(user);
      tagModels.push(tagModel);
    }

    const filename = req.body.filename;
    if (!filename) {
      throw new BadRequestError("filename should not be empty");
    }

    const photoModel = await getDb().models.Photo.create({
      filename
    });

    for (let tagModel of tagModels) {
      photoModel.addTag(tagModel, {through: "Photo_To_Tag"})
    }
    await photoModel.setUser(user);
    res.json(photoModel);
  } catch (err) {
    next(err);
  }
});

photoRouter.get("/", auth, async (req, res) => {
  const db = await getDb();
  // TODO: pagination
  // @see https://blog.bitsrc.io/pagination-with-sequelize-explained-83054df6e041
  const query = req.query?.query ?? "";

  let photos = []
  if (!query) {
    photos = await db.models.Photo.findAll({
      where: {UserId: res.locals.userId},
      include: [{
        model: db.models.Tag
      }]
    });
  } else {
    const tag = await db.models.Tag.findOne({
      where: {name: query}
    });
    photos = await db.models.Photo.findAll({
      where: {
        UserId: res.locals.userId
      },
      include: [{
        model: db.models.Tag,
        where: {id: tag.id}
      }]
    });
  }

  for (const photo of photos) {
    const photoTags = await db.models.Tag.findAll({
      include: [{
        model: db.models.Photo,
        where: {id: photo.id},
      }]
    });
    photo.set("Tags", [...photoTags]);
  }
  res.json(photos);
});

photoRouter.get("/:id", auth, async (req, res) => {
  const db = await getDb();
  const photo = await db.models.Photo.findByPk(req.params.id, {
    include: [{
      model: db.models.Tag
    }]
  });
  if (!photo) {
    throw new NotFoundError("Photo not found");
  }
  res.json(photo);
});

photoRouter.put("/:id", auth, (req, res) => {
  throw new NotImplementedError();
});

photoRouter.delete("/:id", auth, (req, res) => {
  throw new NotImplementedError();
});

module.exports = photoRouter;
