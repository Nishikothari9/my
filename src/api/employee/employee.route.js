const express = require("express");
const employeeController = require("./employee.controller");
const employeeValidator = require('./employee.validation');
const validate = require("../../middlewares/validate");
const router = express.Router();

router.get("/", employeeController.getAllEmployee);
router.post('/add',validate(employeeValidator.addEmployee),employeeController.addEmployee);
router.post('/update',validate(employeeValidator.updateEmployee),employeeController.updateEmployee);
router.get("/getEmployeeDetails/:id", employeeController.getEmployeeById);
router.get("/getAllHR", employeeController.getAllHR);
router.get("/getAllTL", employeeController.getAllTL);
router.get("/getAllPM", employeeController.getAllPM);
router.get("/getAllEmployee", employeeController.getEmployee);

module.exports = router;
