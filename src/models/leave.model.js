const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
    fromDate: String,
    toDate: String,
    isAdhocLeave: Boolean,
    adhocLeaveStatus: String,
    sandwichCount: Number,
    leaveReason: String,
    totalDays: Number,
    hrId: { type: mongoose.Schema.ObjectId, ref: "employee" },
    tlId: { type: mongoose.Schema.ObjectId, ref: "employee" },
    status: {
      type: String,
      enum: ["Approved", "Reject", "Pending"],
      default: "Pending",
    },
    hrApproval: {
      type: String,
      enum: ["Approved", "Reject", "Pending", "Hold"],
      default: "Pending",
    },
    pmApproval: {
      type: String,
      enum: ["Approved", "Reject", "Pending", "Hold"],
      default: "Pending",
    },
    considerSandwichLeave: Boolean
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const citySchema = mongoose.model("leaves", Schema);
module.exports = citySchema;
