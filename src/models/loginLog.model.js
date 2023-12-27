const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee", default:null },
        status: {
            type: String,
            enum: ["Logout", "Login", "ForgotPassword", "other"],
            default: "Login",
        },
        description : String,
        logInfo: String
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const blogSchema = mongoose.model("loginlog", Schema);
module.exports = blogSchema;
