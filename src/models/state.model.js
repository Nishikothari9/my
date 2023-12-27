const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    id: Number,
    name: String,
    country_id: { type: mongoose.Schema.ObjectId, ref: "country" },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Delete"],
        default: "Active",
    },
});

const stateModel = mongoose.model("states", Schema);
module.exports = stateModel;
