const Joi = require("@hapi/joi");

const addTicket = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        title: Joi.string().required(),
        type: Joi.string(),
        email: Joi.string().required(),
        userName: Joi.string().required(),
        projectName: Joi.string().required(),
        projectManagerEmail: Joi.string().required(),
        detailDescription: Joi.string().required(),
        attachment: Joi.any().required()
    }),
};

const updateTicket = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        title: Joi.string().required(),
        type: Joi.string(),
        email: Joi.string().required(),
        userName: Joi.string().required(),
        projectName: Joi.string().required(),
        projectManagerEmail: Joi.string().required(),
        detailDescription: Joi.string().required(),
        attachment: Joi.any().required()
    }),
};

module.exports = {
    addTicket,
    updateTicket
};
