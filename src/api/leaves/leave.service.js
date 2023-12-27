const mongoose = require('mongoose');
const leaveModel = require("../../models/leave.model");
const ObjectId = mongoose.Types.ObjectId;

const query = [
    {
        $lookup: {
            from: "employees",
            localField: "employeeId",
            foreignField: "_id",
            as: "employeeId",
            pipeline: [
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        empNo: 1,
                    },
                },
            ],
        },
    },
    {
        $lookup: {
            from: "employees",
            localField: "hrId",
            foreignField: "_id",
            as: "hrId",
            pipeline: [
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                    },
                },
            ],
        },
    },
    {
        $lookup: {
            from: "employees",
            localField: "tlId",
            foreignField: "_id",
            as: "tlId",
            pipeline: [
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                    },
                },
            ],
        },
    },
    {
        $unwind: {
            path: "$employeeId",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $unwind: {
            path: "$hrId",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $unwind: {
            path: "$tlId",
            preserveNullAndEmptyArrays: true,
        },
    },
    {
        $project: {
            fromDate: 1,
            toDate: 1,
            isAdhocLeave: 1,
            leaveReason: 1,
            totalDays: 1,
            status: 1,
            employeeFirstName: "$employeeId.firstName",
            employeeLastName: "$employeeId.lastName",
            hrFirstName: "$hrId.firstName",
            hrLastName: "$hrId.lastName",
            tlFirstName: "$tlId.firstName",
            tlLastName: "$tlId.lastName",
        },
    },
    {
        $sort: {
            _id: -1,
        },
    },
];

module.exports = {
    getAllLeave: async () => {
        const data = await leaveModel.aggregate(query);
        return data;
    },
    getTeamLeave: async (id) => {
        const matchQuerry = {
            $match: {
                hrId: ObjectId(id),
            },
        };
        const mainQuery = [matchQuerry].concat(query);
        const data = await leaveModel.aggregate(mainQuery);
        return data;
    },
    getThisMonthLeaves: async (currentDate, futureDate) => {
        const matchQuerry = {
            $match: {
                fromDate: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
            },
        };
        const mainQuery = [matchQuerry].concat(query);

        const data = await leaveModel.aggregate(mainQuery);
        return data;
    },
    getThisMonthLeavesOfTeam: async (id, currentDate, futureDate) => {
        // return only team members leaves.
        // this will return next 30 days leave data only.

        const matchQuerry = {
            $match: {
                fromDate: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
                hrId: ObjectId(id),
            },
        };
        const mainQuery = [matchQuerry].concat(query);
        const data = await leaveModel.aggregate(mainQuery);
        return data;
    },
    addLeave: async (data) => {
        const addData = leaveModel(data).save();
        return addData;
    },
    updateLeave: async (id, data) => {
        const updateData = leaveModel.findByIdAndUpdate(id, { $set: data });
        return updateData;
    },
    leaveDetails: async (id) => {
        const leaveDetails = leaveModel.findById(id);
        return leaveDetails;
    },
    myLeaveOfThisMonth: async (id, currentDate, futureDate) => {
        // return only team members leaves.
        // this will return next 30 days leave data only.

        const matchQuerry = {
            $match: {
                employeeId: ObjectId(id),
                fromDate: {
                    $gte: currentDate,
                    $lt: futureDate,
                },
            },
        };
        const mainQuery = [matchQuerry].concat(query);
        const data = await leaveModel.aggregate(mainQuery);
        return data;
    },
};
