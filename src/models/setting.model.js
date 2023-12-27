const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.ObjectId, ref: "employee" },
    siteURL: String,
    siteSecretToken: String,
    mainAdminEmail: String,
    supportEmail: String,
    apiURL: String,
    projectManagerEmail: String,
    primaryColor: String,
    secondaryColor: String
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

const citySchema = mongoose.model("setting", Schema);
module.exports = citySchema;
