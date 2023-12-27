const express = require("express");
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);
router.post(
  "/loginLog",
  validate(authValidation.loginLog),
  authController.loginLog
);
router.get("/getAllLoginLog", authController.getAllLoginLog);

module.exports = router;
