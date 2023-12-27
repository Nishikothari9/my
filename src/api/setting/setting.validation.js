const Joi = require("@hapi/joi");

const addSetting = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        siteURL : Joi.string().required(),
        siteSecretToken: Joi.string().required(),
        supportEmail: Joi.string().required(),
        mainAdminEmail: Joi.string().required(),
        apiURL: Joi.string().required(),
        primaryColor:  Joi.string().required(),
        secondaryColor: Joi.string().required(),
    }),
};

const updateSetting = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        siteURL : Joi.string().required(),
        siteSecretToken: Joi.string().required(),
        supportEmail: Joi.string().required(),
        mainAdminEmail: Joi.string().required(),
        apiURL: Joi.string().required(),
        primaryColor:  Joi.string().required(),
        secondaryColor: Joi.string().required(),
    }),
};

module.exports = {
    addSetting,
    updateSetting
};
