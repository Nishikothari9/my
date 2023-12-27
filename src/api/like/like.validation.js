const Joi = require("@hapi/joi");

const addLike = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        postId: Joi.string().required(),
        like: Joi.boolean().required(),
    }),
};

const removeLike = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        postId: Joi.string().required()
    }),
};

module.exports = {
    addLike,
    removeLike
};