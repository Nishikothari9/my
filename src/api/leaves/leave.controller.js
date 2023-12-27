const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const leaveService = require("./leave.service");
const taskService = require("../task/task.service");
const employeeService = require('../employee/employee.services');
const moment = require('moment');

const getAllLeave = catchAsync(async (req, res) => {
    try {
        const leaveData = await leaveService.getAllLeave();
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const getTeamLeave = catchAsync(async (req, res) => {
    try {
        // HR id
        const id = req.params.id;
        const leaveData = await leaveService.getTeamLeave(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const getThisMonthLeaves = catchAsync(async (req, res) => {
    try { 
         const currentDate = moment().subtract(1, "d").toISOString();
         const futureDate = moment().add(1, "M").toISOString();

        const leaveData = await leaveService.getThisMonthLeaves(currentDate,futureDate);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const getThisMonthLeavesOfTeam = catchAsync(async (req, res) => {
    try {
        // HR id
        const id = req.params.id
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const leaveData = await leaveService.getThisMonthLeavesOfTeam(id, currentDate, futureDate);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const addLeave = catchAsync(async (req, res) => {
    try {
        // HR id
        const data = req.body;
        
        const startDate = new Date(req.body.fromDate)
        const endDate = new Date(req.body.toDate)

        data.fromDate = moment(startDate).toISOString();
        data.toDate = moment(endDate).toISOString();

        const leaveData = await leaveService.addLeave(data);

        const employeeDetail = await employeeService.getEmployeeById(req.body.employeeId);
        
        // After adding leave will update the leave count in user table.
        const pendingLeaves = employeeDetail.pendingLeaves - req.body.totalDays;
        const updateUserData = await employeeService.modifyEmployeeLeave(req.body.employeeId,pendingLeaves)
        
        // after adding leave will notify HR and add task for HR if userRole is EMPLOYEE or TL.
        if (employeeDetail.userRole !== 'hr') {
            
            const taskData = {
                employeeId: employeeDetail.teamHr,
                status: "created",
                type:"leave",
                formatedDetails: `<p><a href="/user/edit/${employeeDetail._id}">${employeeDetail.firstName} ${employeeDetail.lastName}</a> from your team with employeeNo ${employeeDetail.empNo} is on Leave from ${moment(req.body.fromDate).format('DD/MM/YYYY')} to ${moment(req.body.toDate).format('DD/MM/YYYY')}</p>`,
                details: `${employeeDetail.firstName} ${employeeDetail.lastName} from your team with employeeNo ${employeeDetail.empNo} is on Leave from ${moment(req.body.fromDate).format('DD/MM/YYYY')} to ${moment(req.body.toDate).format('DD/MM/YYYY')}`,
                leaveId: leaveData._id
            };
            const addTaskForHR = await taskService.addTask(taskData);
        }

        createResponse(res, httpStatus.OK, Messages.LEAVE_ADDED, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const leaveDetails = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const leaveData = await leaveService.leaveDetails(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const myLeaveOfThisMonth = catchAsync(async (req, res) => {
    try {
        const id = req.params.id
        const currentDate = moment().subtract(1, "d").toISOString();
        const futureDate = moment().add(1, "M").toISOString();

        const leaveData = await leaveService.myLeaveOfThisMonth(id, currentDate, futureDate);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, leaveData);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});


const updateLeave = catchAsync(async (req, res) => {
    console.log("success")
  try {
    const {id, ...bodyData} = req.body
    const leaveData = await leaveService.updateLeave(req.body.id, req.body);
    createResponse(res, httpStatus.OK, Messages.LEAVE_UPDATE, leaveData);
  } catch (error) {
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

module.exports = {
    getAllLeave,
    getTeamLeave,
    getThisMonthLeaves,
    getThisMonthLeavesOfTeam,
    addLeave,
    leaveDetails,
    myLeaveOfThisMonth,
    updateLeave
};