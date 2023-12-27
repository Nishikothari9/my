const express = require("express");
const leaveController = require("./leave.controller");
const leaveValidation = require('./leave.validation');
const validate = require("../../middlewares/validate");
const router = express.Router();

// FOR ADD NEW LEAVE
router.post("/add", validate(leaveValidation.addLeave), leaveController.addLeave);

// FoR Update Leave
router.post("/update", validate(leaveValidation.updateLeave), leaveController.updateLeave);
// GET 1 LEAVE DEATILS BY ID
router.get("/leaveDetails/:id", leaveController.leaveDetails);

// THIS WILL RETURN PAST/FUTURE LEAVES
router.get("/getAllLeaves", leaveController.getAllLeave);

// GET MY LEAVES OF CURRENT MONTH - {EMPLOYEE /HR / TL ID}
router.get("/myLeaveOfThisMonth/:id", leaveController.myLeaveOfThisMonth);

// THIS WILL RETURN ONLY TEAM'S LEAVE FOR PAST/FUTURE
router.get("/getTeamMemberLeave/:id", leaveController.getTeamLeave);

// GET ALL LEAVES FOR NEXT 30 DAYAS (FUTURE LEAVES ONLY)
router.get("/getThisMonthLeaves", leaveController.getThisMonthLeaves);

// GET ALL "TEAM MEMBERS" LEAVE FOR NEXT 30 DAYS. (FUTURE LEAVE ONLY)
router.get("/getThisMonthLeavesOfTeam/:id", leaveController.getThisMonthLeavesOfTeam);

module.exports = router;
