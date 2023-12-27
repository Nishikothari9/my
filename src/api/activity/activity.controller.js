const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const activityService = require("./activity.service");

const moment = require("moment");

const getAllActivity = catchAsync(async (req, res) => {
    try {
        const activity = await activityService.getAllactivity();
        createResponse(res, httpStatus.OK, Messages.ACTIVITY_ETCHED, activity);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});
const getEmployeeAllActivity = catchAsync(async (req, res) => {
    try {
        const employeeId =  req.params.id
        const activity = await activityService.getEmployeeAllActivity(employeeId);
        createResponse(res, httpStatus.OK, Messages.ACTIVITY_ETCHED, activity);
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
    getAllActivity,
    getEmployeeAllActivity,
};
