const multer = require("multer");
const uuid = require("uuid");
const PUBLIC_FILES_DIR = './public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PUBLIC_FILES_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuid.v4() + '-' + fileName)
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
module.exports = {
  upload,
  PUBLIC_FILES_DIR
};
