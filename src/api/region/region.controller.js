const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const regionService = require("./region.service");

const getAllCountrys = catchAsync(async (req, res) => {
    try {
        const data = await regionService.getAllCountrys();
        createResponse(res, httpStatus.OK, Messages.GET_ALL_COUNTRY, data);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getStateByCountry = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const data = await regionService.getStateByCountry(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_STATE, data);
    } catch (error) {
        console.log(error);
        createResponse(
            res,
            httpStatus.INTERNAL_SERVER_ERROR,
            Messages.SOMETIN_WENT_WRONG
        );
    }
});

const getCityByState = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;
        const data = await regionService.getCityByState(id);
        createResponse(res, httpStatus.OK, Messages.GET_ALL_CITIES, data);
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
    getAllCountrys,
    getStateByCountry,
    getCityByState,
};