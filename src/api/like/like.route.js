const express = require("express");
const likeController = require("./like.controller");
const likeValidation = require("./like.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

//  ADD NEW TASK
router.post("/add", validate(likeValidation.addLike), likeController.addLike);
//  REMOVE LIKE
router.post('/remove', validate(likeValidation.removeLike), likeController.removeLike)

module.exports = router;