const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    id: Number,
    name: String,
    state_id: { type: mongoose.Schema.ObjectId, ref: "states" },
    country_id: { type: mongoose.Schema.ObjectId, ref: "country" },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Delete"],
        default: "Active",
    },
});

const citySchema = mongoose.model("cities", Schema);
module.exports = citySchema;
