const Joi = require("@hapi/joi");

const getStateAndCities = {
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    getStateAndCities
};
