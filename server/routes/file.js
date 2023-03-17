const path = require('path');
const fs = require('fs');
const express = require('express');
const sharp = require('sharp');
const {auth} = require("../middleware/auth");
const {upload} = require("../middleware/upload");
const fileRouter = express.Router();

const MAX_IMAGE_SIZE = 1024;

fileRouter.post("/", [auth, upload.single('photo')], async (req, res) => {
  const {filename: image, destination} = req.file;
  await sharp(req.file.path)
    .rotate()
    .resize(MAX_IMAGE_SIZE)
    .jpeg({quality: 90})
    .toFile(
      path.resolve(destination, `r${image}`)
    )
  fs.unlinkSync(req.file.path);
  return res.status(200).json({filename: `r${image}`});
});

module.exports = fileRouter;

