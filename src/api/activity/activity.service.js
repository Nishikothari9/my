const activityModule = require("../../models/loginLog.model");

module.exports = {
    getAllactivity: async () => {
        const activityData = await activityModule.find();
        return activityData;
    },
    getEmployeeAllActivity: async (id) => {
        const activityData = await activityModule.find({ employeeId: id });
        return activityData;
    },
};
