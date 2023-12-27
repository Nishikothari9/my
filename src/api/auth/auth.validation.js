const Joi = require("@hapi/joi");

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
};

const loginLog = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        status: Joi.string().required(),
        description: Joi.string().required(),
        logInfo: Joi.string()
    }),
};

module.exports = {
    login,
    loginLog
};
