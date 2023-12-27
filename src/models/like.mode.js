const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        like: Boolean,
        postId: { type: mongoose.Schema.ObjectId, ref: "post" },
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const likeSchema = mongoose.model("like", Schema);
module.exports = likeSchema;
