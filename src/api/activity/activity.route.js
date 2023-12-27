const express = require("express");
const activityController = require("./activity.controller");
const commentValidator = require("./activity.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

//  ALL ACTIVITY
router.get("/getAllActivity", activityController.getAllActivity);

// GET ACTIVITY FOR PARTICULAR EMPLOYEE  
router.get("/getEmployeeAllActivity/:id", activityController.getEmployeeAllActivity);

module.exports = router;
