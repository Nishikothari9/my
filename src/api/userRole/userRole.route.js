const express = require("express");
const userRoleController = require("./userRole.controller");
const userRoleValidation = require("./userRole.validation");
const validate = require("../../middlewares/validate");
const router = express.Router();

router.get("/", userRoleController.getAllUserRole);
router.post("/add", validate(userRoleValidation.addUserRole), userRoleController.addUserRole );
router.post("/edit", validate(userRoleValidation.editUserRole), userRoleController.editUserRole );
router.post("/delete", validate(userRoleValidation.deleteUserRole), userRoleController.deleteUserRole );

module.exports = router;
