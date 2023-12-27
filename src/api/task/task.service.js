const taskModel = require("../../models/task.model");

module.exports = {
    addTask: async (data) => {
        const addData = await taskModel(data).save();
        return addData;
    },
    updateTask: async (id, data) => {
        const updateData = taskModel.findByIdAndUpdate(id, { $set: data });
        return updateData;
    },
    getAllTask: async () => {
        const data = await taskModel.find().sort({_id:-1});
        return data;
    },
    getThisMonthAllTasks: async (currentDate, futureDate) => {
        const data = await taskModel
            .find({
                createdAt: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
            })
            .sort({ _id: -1 });
        return data;
    },
    getMyTaskOfThisMonth: async (id, currentDate, futureDate) => {
        console.log(id,currentDate,futureDate);
        const data = await taskModel.find({
            createdAt: {
                $gte: currentDate,
                $lt: futureDate,
            },
            employeeId: id,
        }).sort({_id:-1});
        return data;
    },
    getThisMonthPendingTasks: async (currentDate, futureDate) => {
        const data = await taskModel
            .find({
                createdAt: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
                status: "created",
            })
            .sort({ _id: -1 });
        return data;
    },
    getMyPendingTaskOfThisMonth: async (id, currentDate, futureDate) => {
        const data = await taskModel
            .find({
                createdAt: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
                status: "created",
                employeeId: id,
            })
            .sort({ _id: -1 });
        return data;
    },
    getMyAllTasks: async(id) => {
        const taskList = taskModel.find({employeeId:id}).sort({_id:-1});
        return taskList;
    },
    getTask: async(id) => {
        const taskDetails = taskModel.findById(id);
        return taskDetails;
    }
};
