const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const settingService = require("./setting.service");

const addSetting = catchAsync(async (req, res) => {
  try {
    const data = await settingService.addSetting(req.body);
    createResponse(res, httpStatus.OK, Messages.TICKET_ADDED, data);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const updateSetting = catchAsync(async (req, res) => {
  try {
    const data = await settingService.updateSetting(req.params.id, req.body);
    createResponse(res, httpStatus.OK, Messages.TICKET_UPDATED, data);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});


const getAllSettingData = catchAsync(async (req, res) => {
  try {
      const data = await settingService.getAllSettingData(req.body);
      createResponse(res, httpStatus.OK, Messages.GET_ALL_LEAVES, data);
  } catch (error) {
      console.log(error);
      createResponse(res, httpStatus.INTERNAL_SERVER_ERROR, Messages.SOMETIN_WENT_WRONG);
  }
});

module.exports = {
  addSetting,
  updateSetting,
  getAllSettingData
};
