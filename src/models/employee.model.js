const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { omit, pick } = require("lodash");

const employeeSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        gender: String,
        password: String,
        userName: String,
        state: { type: mongoose.Schema.ObjectId, ref: "citys" },
        city: { type: mongoose.Schema.ObjectId, ref: "states" },
        country: { type: mongoose.Schema.ObjectId, ref: "countrys" },
        degree: String,
        empNo: String,
        address: String,
        zipCode:Number,
        phone: Number,
        userRole: String,
        designation: String,
        skill: [String],
        status: {
            type: String,
            enum: ["Joined", "Left", "Ready To Join", "Notice Period"],
            default: "Ready To Join",
        },
        position: String,
        department: String,
        joiningDate: String,
        currentProject: String,
        company: String,
        totalLeaves: Number,
        pendingLeaves: Number,
        accountNumber: Number,
        previousCompany: String,
        previousDesignation: String,
        birthDate: String,
        previousPosition: String,
        yoe: Number,
        totalCreditLeave: Number,
        totalPaidLeave: Number,
        usedCreditLeave: Number,
        usedPaidLeave: Number,
        teamLeader: { type: mongoose.Schema.ObjectId, ref: "employee" },
        teamHr: { type: mongoose.Schema.ObjectId, ref: "employee" },
    },
    {
        timestamps: true,
        toObject: { getters: true },
        toJSON: { getters: true },
    }
);
employeeSchema.methods.transform = function () {
    const user = this;
    return pick(user.toJSON(), [
        "id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "userRole",
    ]);
};
employeeSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next();
});
employeeSchema.pre("findByIdAndUpdate", async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next();
});
employeeSchema.pre("findOneAndUpdate", async function (next) {
    if (this._update.$set.password) {
        this._update.$set.password = await bcrypt.hash(
            this._update.$set.password,
            8
        );
        next();
    }
});
employeeSchema.index({ location: "2dsphere" });
const employeeData = mongoose.model("employee", employeeSchema);

module.exports = employeeData;
