const express = require("express");
const router = express.Router();
const PsychiatristsModel = require("../models/psychiatristModel");
const authMiddleware = require("../middlewares/auth");
const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

router.post("/get-psychiatrist-info-by-user-id", authMiddleware, async (req, res) => {
  try {
    const psychiatrist = await PsychiatristsModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "psychiatrist info fetched successfully",
      data: psychiatrist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting psychiatrist info", success: false, error });
  }
});

router.post("/get-psychiatrist-info-by-id", authMiddleware, async (req, res) => {
  try {
    const psychiatrist = await PsychiatristsModel.findOne({ _id: req.body.psychiatristId });
    res.status(200).send({
      success: true,
      message: "Psychiatrist info fetched successfully",
      data: psychiatrist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting psychiatrist info", success: false, error });
  }
});

router.post("/update-psychiatrist-profile", authMiddleware, async (req, res) => {
  try {
    const psychiatrist = await PsychiatristsModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Psychiatrist profile updated successfully",
      data: psychiatrist,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting psychiatrist info", success: false, error });
  }
});

router.get(
  "/get-appointments-by-psychiatrist-id",
  authMiddleware,
  async (req, res) => {
    try {
      const psychiatrist = await PsychiatristsModel.findOne({ userId: req.body.userId });
      const appointments = await Appointment.find({ psychiatristId: psychiatrist._id });
      res.status(200).send({
        message: "Appointments fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error fetching appointments",
        success: false,
        error,
      });
    }
  }
);

router.post("/change-appointment-status", authMiddleware, async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });

    const user = await User.findOne({ _id: appointment.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    });

    await user.save();

    res.status(200).send({
      message: "Appointment status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing appointment status",
      success: false,
      error,
    });
  }
});

module.exports = router;