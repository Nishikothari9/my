const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        title: String,
        cover: String,
        like: [{ type: mongoose.Schema.ObjectId, ref: "employee" }],
        comment: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
        status:{
            type:String,
            enum:["Active","Deleted","Reported"],
            default:"Active"
        }
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const blogSchema = mongoose.model("blog", Schema);
module.exports = blogSchema;
