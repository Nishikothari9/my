const express = require("express");
const taskController = require("./task.controller");
const taskValidation = require('./task.validation');
const validate = require("../../middlewares/validate");
const router = express.Router();

//  ADD NEW TASK
router.post("/add", validate(taskValidation.addTask), taskController.addTask);

//  UPDATE 1 TASK DETAILS
router.post("/update", validate(taskValidation.updateTask), taskController.updateTask);

// RETURN SINGLE TASK DEATAILS
router.get("/getTask/:id", taskController.getTask);

//  RETURN ALL TASK OF THIS MONTH
router.get("/getThisMonthAllTasks", taskController.getThisMonthAllTasks);

// RETURN ALL TASK INCLUDING PREVIOUR AND FUTURE TASKS
router.get("/getAllTask", taskController.getAllTask)

// RETURN OF ALL TASK OF (EMPLOYEE / HR / TL) => ID
router.get("/getMyAllTasks/:id", taskController.getMyAllTasks);

// RETURN THIS MONTH PENDING TASK ONLY
router.get("/getThisMonthPendingTasks", taskController.getThisMonthPendingTasks);

// RETURN THIS MONTH TASK ONLY OF (EMPLOYEE / HR / TL) -> ID
router.get("/getMyTaskOfThisMonth/:id", taskController.getMyTaskOfThisMonth);

// RETURN THIS MONTH PENDING TASK ONLY OF (EMPLOYEE / HR / TL) -> ID
router.get("/getMyPendingTaskOfThisMonth/:id", taskController.getMyPendingTaskOfThisMonth);


// CREATING TICKET FOR (HR) -> EMAIL , Bcz employee forgets the password
router.post(
    "/forgotPasswordTask",
    validate(taskValidation.forgotPasswordTask),
    taskController.forgotPasswordTask,
);

module.exports = router;