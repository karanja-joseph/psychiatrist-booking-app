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
        isDoctor: {
            type: Boolean,
            default: false,
          },
          isAdmin: {
            type: Boolean,
            default: false,
          },
          seenNotifications: {
            type: Array,
            default: [],
          },
          unseenNotifications: {
            type: Array,
            default: [],
          },
        },
        {
          timestamps: true,
        }
);

const patientsModel = mongoose.model("patients", patientsSchema);

module.exports = patientsModel;