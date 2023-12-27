const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const createResponse = require("../../utils/response");
const Messages = require("../../utils/messages");
const authService = require("./auth.service");
const md5 = require("md5");

const login = catchAsync(async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await authService.getEmloyeeByEmali(email);

    if (user.length > 0) {
      const currentPassword = md5(password);

      const isPassWordTrue = await authService.checkPassword(
        currentPassword,
        user[0].password
      );

      let userDetails = {
        verified: true,
        id: user[0].id,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        email: user[0].email,
        userRole: user[0].userRole,
        gender: user[0].gender,
      };

      isPassWordTrue
        ? createResponse(res, httpStatus.OK, Messages.LOGIN_SUCCESSFUL, {
            userDetails,
          })
        : //  : createResponse(res, httpStatus.NOT_FOUND, Messages.WRONG_LOGIN, {});
          res.status(401).send({
            message: Messages.WRONG_LOGIN,
            status: 404,
          });
      return;
    } else {
      res.status(400).send({
        message: Messages.USER_NOT_FOUND_WITH_EMAIL,
        status: 400,
      });
      return;
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

const loginLog = catchAsync(async (req, res) => {
  try {
    const log = authService.loginLog(req.body);
    createResponse(res, httpStatus.OK, Messages.LOGINLOG_ADDED, log);
  } catch (error) {
    console.log(error);
    createResponse(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      Messages.SOMETIN_WENT_WRONG
    );
  }
});

const getAllLoginLog = catchAsync(async (req, res) => {
  try {
    const loginLog = await authService.getAllLoginLog();
    createResponse(res, httpStatus.OK, Messages.GET_ALL_LOGINLOG, loginLog);
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
  login,
  loginLog,
  getAllLoginLog
};
