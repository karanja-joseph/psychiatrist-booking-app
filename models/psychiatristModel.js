const mongoose = require("mongoose");
const psychiatristsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    specialization: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    }
  },
  {
    timestamps: true,
  }
);

const psychiatristsModel = mongoose.model("psychiatrists", psychiatristsSchema);
module.exports = psychiatristsModel;