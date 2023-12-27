const Joi = require("@hapi/joi");

const addComment = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        text: Joi.string().required(),
        postId: Joi.string().required(),
        status: Joi.string()
    }),
};
const removeComment = {
    body: Joi.object().keys({
        commentId: Joi.string().required(),
        postId: Joi.string().required(),
    }),
};

module.exports = {
    addComment,
    removeComment
};
