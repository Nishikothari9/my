const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const employeeService = require("./employee.services");
const md5 = require('md5');

const getAllEmployee = catchAsync(async (req, res) => {
    try {
        const userArray = await employeeService.getAllEmployee();
        createResponse(res, httpStatus.OK, Messages.GET_USERS, userArray);
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const addEmployee = catchAsync(async(req,res) => {
    try {
        const userData = await req.body;

        // CHECK if employee exists
        const checkUserExist = await employeeService.getEmployeeByEmail(req.body.email);
        if (checkUserExist.length > 0) {
            return res.status(400).send({
                status: 400,
                message: Messages.EMPLOYEE_EXISTS,
            });
        } else {

            userData.password = md5(req.body.password);
            const addNewEmployee = await employeeService.addNewEmployee(userData);
        
            createResponse(res, httpStatus.OK, Messages.EMPLOYEE_ADDEDD, addNewEmployee);
        }
    } catch (error) {
        console.log(error);
        createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const updateEmployee = catchAsync(async (req, res) => {
    try {
        const {id, ...bodyData} = req.body
        if (bodyData.password)
        bodyData.password = md5(bodyData.password);
        const employessUpdated = await employeeService.updateEmployee(id, bodyData);
        createResponse(res, httpStatus.OK, Messages.EMPLOYEE_UPDATED, employessUpdated);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getEmployeeById = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const employeeDetail = await employeeService.getEmployeeById(id);
        createResponse(res, httpStatus.OK, Messages.GET_EMPLOYEE_DETAILS, employeeDetail);
    } catch (error) {
     console.log(error);   
     createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
    }
});

const getAllHR = catchAsync(async (req, res) => {
    try {
       
        const employeeDetail = await employeeService.getAllHR();
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_EMPLOYEE_DETAILS,
            employeeDetail
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

const getAllTL = catchAsync(async (req, res) => {
    try {
        const employeeDetail = await employeeService.getAllTL();
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_EMPLOYEE_DETAILS,
            employeeDetail
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

const getAllPM = catchAsync(async (req, res) => {
    try {
        const employeeDetail = await employeeService.getAllPM();
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_EMPLOYEE_DETAILS,
            employeeDetail
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

const getEmployee = catchAsync(async (req, res) => {
    try {
        const employeeDetail = await employeeService.getEmployee();
        createResponse(
            res,
            httpStatus.OK,
            Messages.GET_EMPLOYEE_DETAILS,
            employeeDetail
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



module.exports = {
    getAllEmployee,
    addEmployee,
    updateEmployee,
    getEmployeeById,
    getAllHR,
    getAllTL,
    getAllPM,
    getEmployee
};
