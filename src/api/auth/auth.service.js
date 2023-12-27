const employeeModel = require("../../models/employee.model");
const loginLogModel = require("../../models/loginLog.model");
const bcrypt = require("bcryptjs");
const httpStatus = require("http-status");

const AppError = require("../../utils/AppError");
const Messages = require("../../utils/messages");

const getEmloyeeByEmali = async (email) => {
  const data = employeeModel.find({ email: email });
  return data;
};
const register = async (data) => {
  const user = await employeeModel(data).save();
  return user;
};
const login = async (email, password, deviceType) => {
  let check = { email: email };

  let user = await employeeModel.findOne(check);
  if (user) {
    await checkPassword(password, user.password, user._id);
    return user;
  } else {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      Messages.EMAIL_NOT_FOUND
    );
  }
};
const checkPassword = async (password, correctPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (isPasswordMatch) {
    return true;
  } else {
    return false;
  }
};
const loginLog = async (data) => {
  const log = await loginLogModel(data).save();
  return log;
};

const getAllLoginLog = async () => {
  const logData = await loginLogModel.find().sort({ _id: -1 });
  return logData;
};

module.exports = {
  checkPassword,
  getEmloyeeByEmali,
  register,
  login,
  loginLog,
  getAllLoginLog
};
