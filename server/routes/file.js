const express = require('express');
const {BadRequestError} = require("../errors");
const fileRouter = express.Router();

fileRouter.post("/", () => {

});

module.exports = fileRouter;

