const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const userRoleService = require("./userRole.service");

const getAllUserRole = catchAsync(async (req, res) => {
    try {
        const data = await userRoleService.getAllUserRole();
        createResponse(res, httpStatus.OK, Messages.GOT_ALL_USERROLES, data);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const addUserRole = catchAsync(async(req,res)=> {
    try {
        const userData = req.body;
        const data = userRoleService.addUserRole(userData);
        createResponse(res, httpStatus.OK, Messages.USER_ROLE_ADDED, data);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const editUserRole = catchAsync(async (req, res) => {
    try {
        const roleId = req.body.id;
        const roleName = req.body.name;
        const data = userRoleService.editUserRole(roleId, roleName);
        createResponse(res, httpStatus.OK, Messages.USER_ROLE_EDITED, data);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const deleteUserRole = catchAsync(async (req, res) => {
    try {
        const id = req.body.id;
        const data = userRoleService.deleteUserRole(id);
        createResponse(res, httpStatus.OK, Messages.USER_ROLE_DELETED, data);
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
    getAllUserRole,
    addUserRole,
    editUserRole,
    deleteUserRole,
};