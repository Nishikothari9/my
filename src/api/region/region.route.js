const express = require("express");
const regionController = require("./region.controller");
const regionValidation = require("./region.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.get("/getAllCountrys", regionController.getAllCountrys);
router.get("/getStateByCountry/:id", regionController.getStateByCountry);
router.get("/getCityByState/:id", regionController.getCityByState);

module.exports = router;
