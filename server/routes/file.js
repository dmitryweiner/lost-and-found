const express = require('express');
const multer = require('multer');
const uuid = require('uuid');
const {BadRequestError} = require("../errors");
const fileRouter = express.Router();

const DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("destination");
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    console.log("filename");
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuid.v4() + '-' + fileName)
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("fileFilter");
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

//const upload = multer({ dest: './public/data/uploads/' })

fileRouter.post("/", upload.single('photo'), (req, res) => {
  console.log('fileRouter.post("/"', req.file);
  return res.status(200).json({filename: req.file.filename});
});

module.exports = fileRouter;

