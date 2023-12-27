const express = require("express");

const settingController = require("./setting.controller");
const settingValidation = require("./setting.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.post("/add", validate(settingValidation.addSetting), settingController.addSetting);

router.post(
  "/update/:id",
  validate(settingValidation.updateSetting),
  settingController.updateSetting
);

router.get("/getAllSettingData", settingController.getAllSettingData);

module.exports = router;
