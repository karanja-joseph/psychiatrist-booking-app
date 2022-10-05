const mongoose = require("mongoose");

const patientsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const patientsModel = mongoose.model("patients", patientsSchema);

module.exports = patientsModel;