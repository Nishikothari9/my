const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
    {
        name: String,
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);

const userRoleSchema = mongoose.model("userRole", Schema);
module.exports = userRoleSchema;
