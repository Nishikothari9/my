const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        text: String,
        postId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        status: {
            type: String,
            enum: ["Active", "Delete"],
            default:"Active"
        },
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const commentSchema = mongoose.model("comment", Schema);
module.exports = commentSchema;
