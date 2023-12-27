const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
    details: String,
    type: {
      type: String,
      enum: ["HRMS", "project", "other"],
    },

    title: String,
    email: String,
    userName: String,
    projectName: String,
    projectManagerEmail: String,
    detailDescription: String,
    attachment: Array,
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const citySchema = mongoose.model("ticket", Schema);
module.exports = citySchema;
