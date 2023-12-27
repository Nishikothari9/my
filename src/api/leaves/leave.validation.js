const Joi = require("@hapi/joi");

const addLeave = {
    body: Joi.object().keys({
        employeeId: Joi.string().required(),
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        isAdhocLeave: Joi.boolean(),
        adhocLeaveStatus: Joi.string().allow(""),
        sandwichCount: Joi.number().required(),
        leaveReason: Joi.string().required(),
        totalDays: Joi.number().required(),
        hrId: Joi.string().required(),
        tlId: Joi.string().required(),
        status: Joi.string(),
        hrApproval: Joi.string(),
        pmApproval: Joi.string(),
        considerSandwichLeave: Joi.boolean()
    }),
};

const updateLeave = {
    body: Joi.object().keys({
        id: Joi.string().required(),
        employeeId: Joi.string().required(),
        fromDate: Joi.string().required(),
        toDate: Joi.string().required(),
        isAdhocLeave: Joi.boolean(),
        adhocLeaveStatus: Joi.string().allow(""),
        sandwichCount: Joi.number().required(),
        leaveReason: Joi.string().required(),
        totalDays: Joi.number().required(),
        hrId: Joi.string().required(),
        tlId: Joi.string().required(),
        status: Joi.string(),
        hrApproval: Joi.string(),
        pmApproval: Joi.string(),
        considerSandwichLeave: Joi.boolean()
    }),
};

module.exports = {
    addLeave,
    updateLeave
};


