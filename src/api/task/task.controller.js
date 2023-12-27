const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const taskService = require("./task.service");
const employeeServices = require("../employee/employee.services");
const moment = require('moment');

const addTask = catchAsync(async (req, res) => {
    try {
        const data = req.body;
        const addNewTask = await taskService.addTask(data);
        createResponse(res, httpStatus.OK, Messages.TASK_ADDED, addNewTask);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const forgotPasswordTask = catchAsync(async (req, res) => {
    try {
        // Check if user is valid or not
        const isEmployeeExists = await employeeServices.getEmployeeByEmail(
            req.body.employeeEmail
        );
        if (isEmployeeExists.length === 0){
            return res.status(401).send({
                message: Messages.EMAIL_NOT_EXISTS,
                status: 401,
            });
        }

        // Check if user enter valid HR email or not
        const isHrExists = await employeeServices.getEmployeeByEmail(
            req.body.hrEmail
        );
        if (isHrExists.length === 0){
            return res.status(401).send({
                message: `${Messages.EMPLOYEE_NOT_EXISTS} ${req.body.hrEmail}`,
                status: 401,
            });
        }
        // Create task for HR
        const taskData = {
            employeeId: isEmployeeExists[0].teamHr,
            status: "created",
            type: "work",
            formatedDetails: `<p><a href="/user/edit/${isEmployeeExists[0]._id}">${isEmployeeExists[0].firstName} ${isEmployeeExists[0].lastName}</a> from your team with employeeNo ${isEmployeeExists[0].empNo} Has forgot his password, Please create new password for him.`,
            details: `${isEmployeeExists[0].firstName} ${isEmployeeExists[0].lastName} from your team with employeeNo ${isEmployeeExists[0].empNo} Has forgot his password, Please create new password for him.`,
        };
        const addTaskForHR = await taskService.addTask(taskData);
        if (addTaskForHR)
            createResponse(
                res,
                httpStatus.OK,
                Messages.REQUEST_SENT,
                addTaskForHR
            );
        else
            createResponse(
                res,
                httpStatus.INTERNAL_SERVER_ERROR,
                Messages.SOMETIN_WENT_WRONG
            );
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getAllTask = catchAsync(async (req, res) => {
    try {
        const allTask = await taskService.getAllTask();
        createResponse(res, httpStatus.OK, Messages.GET_ALL_TASKS, allTask);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const updateTask = catchAsync(async (req, res) => {
  try {
    const id = req.body.id;
    const bodyData = {
      employeeId: req.body.employeeId,
      details: req.body.details,
      type: req.body.type,
      status: req.body.status,
    };
    
    const isEmployeeExists = await employeeServices.getEmployeeById(req.body.employeeId);

    if (isEmployeeExists.userRole === "hr") {
      const formatedData = {...bodyData,
        formattedDetails: `<p><a href="/user/edit/${isEmployeeExists._id}">${isEmployeeExists.firstName} ${isEmployeeExists.lastName}</a>
         from your team with employeeNo ${isEmployeeExists.empNo} is on Leave from ${moment(req.body.fromDate).format("DD/MM/YYYY")} to ${moment(req.body.toDate).format("DD/MM/YYYY")}</p>`,
        };
      const updateTaskForHR = await taskService.updateTask(id,formatedData);
      createResponse(
        res,
        httpStatus.OK,
        Messages.TASK_UPDATED,
        updateTaskForHR
      );
    } else {
      const taskUpdated = await taskService.updateTask(id, bodyData);
      createResponse(res, httpStatus.OK, Messages.TASK_UPDATED, taskUpdated);
    }
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getThisMonthAllTasks = catchAsync(async (req, res) => {
    try {
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const taskList = await taskService.getThisMonthAllTasks(
            currentDate,
            futureDate
        );
        createResponse(res, httpStatus.OK, Messages.GET_ALL_TASKS, taskList);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getThisMonthPendingTasks = catchAsync(async (req, res) => {
    try {
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const pendingTaskInThisMonth =
            await taskService.getThisMonthPendingTasks(currentDate, futureDate);
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_ALL_PENDING_TASK,
            pendingTaskInThisMonth
        );
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getMyTaskOfThisMonth = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const AllTask = await taskService.getMyTaskOfThisMonth(
            id,
            currentDate,
            futureDate
        );
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_ALL_PENDING_TASK,
            AllTask
        );
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getMyPendingTaskOfThisMonth = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const taskUpdated = await taskService.getMyPendingTaskOfThisMonth(
            id,
            currentDate,
            futureDate
        );
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_ALL_PENDING_TASK,
            taskUpdated
        );
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getMyAllTasks = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;

        const AllTask = await taskService.getMyAllTasks(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_TASKS, AllTask);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getTask = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const Task = await taskService.getTask(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_TASKS, Task);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});


module.exports = {
    addTask,
    updateTask,
    getAllTask,
    getThisMonthAllTasks,
    getThisMonthPendingTasks,
    getMyTaskOfThisMonth,
    getMyPendingTaskOfThisMonth,
    getMyAllTasks,
    getTask,
    forgotPasswordTask,
};