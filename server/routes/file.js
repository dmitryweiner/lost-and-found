const express = require('express');
const {auth} = require("../middleware/auth");
const {upload} = require("../middleware/upload");
const fileRouter = express.Router();

fileRouter.post("/", [auth, upload.single('photo')], (req, res) => {
  return res.status(200).json({filename: req.file.filename});
});

module.exports = fileRouter;

