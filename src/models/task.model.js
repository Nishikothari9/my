const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        details:String,
        type:{
            type: String,
            enum: ["leave", "work", "other"]
        },
        leaveId:{ type: mongoose.Schema.ObjectId, ref: "leave" },
        status: {
            type: String,
            enum: ["created", "finished"],
            default: "created",
        },
        formatedDetails: String
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const citySchema = mongoose.model("task", Schema);
module.exports = citySchema;
