const Joi = require("@hapi/joi");

const addPost = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        title: Joi.string().required(),
        cover: Joi.any(),
        status: Joi.string()
    }),
};

module.exports = {
    addPost,
};
