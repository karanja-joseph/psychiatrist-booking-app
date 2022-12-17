const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    psychiatristId: {
      type: String,
      required: true,
    },
    psychiatristInfo: {
      type: Object,
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    slots: {
      type: String,
    },
    meetup: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("appointments", appointmentSchema);
module.exports = appointmentModel;
