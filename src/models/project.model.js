const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    startDate: String,
    endDate: String,
    hrList: [
      {
        hrId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        email: String,
        phoneNo: Number,
      },
    ],
    pmList: [
      {
        pmId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        email: String,
        phoneNo: Number,
      },
    ],
    tlList: [
      {
        tlId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        email: String,
        phoneNo: Number,
      },
    ],
    status: {
      type: String,
      enum: [
        "started",
        "finished",
        "hold",
        "process",
        "pending",
        "maintenance",
        "rejected",
      ],
      default: "pending",
    },
    projectName: String,
    employeeList: [
      {
        employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
        employeeStatus: {
          type: String,
          enum: ["working", "removed"],
          default: "working",
        },
        performance: Number,
        email: String,
        phoneNo: Number,
        designation: String,
      },
    ],
    clientList: [
      {
        clientName: String,
        email: String,
        phoneNo: Number,
      },
    ],
    description: String,
    attachment: Array,
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const citySchema = mongoose.model("project", Schema);
module.exports = citySchema;
