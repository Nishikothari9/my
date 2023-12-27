const Joi = require("@hapi/joi");

const addUserRole = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
};
const editUserRole = {
    body: Joi.object().keys({
        id: Joi.string().required(), 
        name: Joi.string().required(),
    }),
};

const deleteUserRole = {
    body: Joi.object().keys({
        id: Joi.string().required(),
    }),
};

module.exports = {
    addUserRole,
    editUserRole,
    deleteUserRole,
};
