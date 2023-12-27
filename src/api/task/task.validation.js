const Joi = require("@hapi/joi");

const addTask = {
  body: Joi.object().keys({
    employeeId: Joi.string().required(),
    details: Joi.string().required(),
    status: Joi.string().required(),
    leaveId: Joi.string(),
    type: Joi.string().required(),
    formatedDetails: Joi.string(),
  }),
};
const forgotPasswordTask = {
    body: Joi.object().keys({
        employeeEmail: Joi.string().required(),
        hrEmail: Joi.string().required()
    }),
};

const updateTask = {
  body: Joi.object().keys({
    id: Joi.string().required(),
    status: Joi.string().required(),
    employeeId: Joi.string(),
    details: Joi.string(),
    type: Joi.string(),
    formatedDetails: Joi.string(),
  }),
};

module.exports = {
  addTask,
  updateTask,
  forgotPasswordTask
};
