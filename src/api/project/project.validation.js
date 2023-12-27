// add validation just like task validation files

const Joi = require("@hapi/joi");

const addProject = {
  body: Joi.object().keys({
    employeeList: Joi.array()
      .items(
        Joi.object({
          employeeId: Joi.string().required(),
          employeeStatus: Joi.string().required(),
          performance: Joi.number().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
          designation: Joi.string().required(),
        })
      )
      .required(),
    hrList: Joi.array()
      .items(
        Joi.object({
          hrId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    tlList: Joi.array()
      .items(
        Joi.object({
          tlId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    pmList: Joi.array()
      .items(
        Joi.object({
          pmId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    status: Joi.string().required(),
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    attachment: Joi.any(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    clientList: Joi.array()
      .items(
        Joi.object({
          clientName: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
  }),
};

const updateProject = {
  body: Joi.object().keys({
    employeeList: Joi.array()
      .items(
        Joi.object({
          employeeId: Joi.string().required(),
          employeeStatus: Joi.string().required(),
          performance: Joi.number().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
          designation: Joi.string().required(),
        })
      )
      .required(),
    hrList: Joi.array()
      .items(
        Joi.object({
          hrId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    tlList: Joi.array()
      .items(
        Joi.object({
          tlId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    pmList: Joi.array()
      .items(
        Joi.object({
          pmId: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
    status: Joi.string().required(),
    projectName: Joi.string().required(),
    description: Joi.string().required(),
    attachment: Joi.any(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    clientList: Joi.array()
      .items(
        Joi.object({
          clientName: Joi.string().required(),
          email: Joi.string().required(),
          phoneNo: Joi.number().required(),
        })
      )
      .required(),
  }),
};

module.exports = {
  addProject,
  updateProject,
};
