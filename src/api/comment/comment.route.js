const express = require("express");
const commentController = require("./comment.controller");
const commentValidator = require("./comment.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

//  ADD NEW TASK
router.post("/add", validate(commentValidator.addComment), commentController.addComment);
router.post("/remove", validate(commentValidator.removeComment), commentController.removeComment);

module.exports = router;
