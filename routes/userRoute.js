const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Psychiatrist = require('../models/psychiatristModel')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth")
const Appointment = require("../models/appointmentModel");
const moment = require("moment");
 
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res
                .status(200)
                .send({ message: "This user already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res
            .status(200)
            .send({ message: "User created successfully", success: true });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating the this user", success: false, error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "This user does not exist", success: false });
        }
        const checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res
                .status(200)
                .send({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            res
                .status(200)
                .send({ message: "Login successful", success: true, data: token });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error logging in", success: false, error });
    }
});

router.post("/get-user-info-by-id", auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res
                .status(200)
                .send({ message: "user does not exist", success: false });
        } else {
            res.status(200).send({
                success: true,
                data: user,
            });
        } 
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting user info", success: false, error });
    }
})

router.post("/apply-psychiatrist-account", auth, async (req, res) => {
    try {
      const newpsychiatrist = new Psychiatrist({ ...req.body, status: "pending" });
      await newpsychiatrist.save();
      const adminUser = await User.findOne({ isAdmin: true });
  
      const unseenNotifications = adminUser.unseenNotifications;
      unseenNotifications.push({
        type: "new-psychiatrist-request",
        message: `${newpsychiatrist.firstName} ${newpsychiatrist.lastName} has applied for a psychiatrist account`,
        data: {
            psychiatristId: newpsychiatrist._id,
          name: newpsychiatrist.firstName + " " + newpsychiatrist.lastName,
        },
        onClickPath: "/admin/psychiatristslist",
      });
      await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
      res.status(200).send({
        success: true,
        message: "Psychiatrist account applied successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying psychiatrist account",
        success: false,
        error,
      });
    }
  });

//do away with this route

  router.post("/mark-all-notifications-as-seen",auth,async (req, res) => {
      try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
          success: true,
          message: "All notifications marked as seen",
          data: updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Error applying psychiatrist account",
          success: false,
          error,
        });
      }
    }
  );
  
  router.post("/delete-all-notifications", auth, async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      user.seenNotifications = [];
      user.unseenNotifications = [];
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications cleared",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying psychiatrist account",
        success: false,
        error,
      });
    }
  });
  
  router.get("/get-all-approved-psychiatrists", auth, async (req, res) => {
    try {
      const psychiatrists = await Psychiatrist.find({ status: "approved" });
      res.status(200).send({
        message: "Psychiatrist fetched successfully",
        success: true,
        data: psychiatrists,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying psychiatrist account",
        success: false,
        error,
      });
    }
  });
  
  router.post("/book-appointment", auth, async (req, res) => {
    try {
      req.body.status = "pending";
      req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      req.body.time = moment(req.body.time, "HH:mm").toISOString();
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      //pushing notification to psychiatrist based on his userid
      const user = await User.findOne({ _id: req.body.psychiatristInfo.userId });
      user.unseenNotifications.push({
        type: "new-appointment-request",
        message: `A new appointment request has been made by ${req.body.userInfo.name}`,
        onClickPath: "/psychiatrist/appointments",
      });
      await user.save();
      res.status(200).send({
        message: "Appointment booked successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking appointment",
        success: false,
        error,
      });
    }
  });
  
  router.post("/check-booking-avilability", auth, async (req, res) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.time, "HH:mm")
        .subtract(1, "hours")
        .toISOString();
      const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
      const psychiatristId = req.body.psychiatristId;
      const appointments = await Appointment.find({
        psychiatristId,
        date,
        time: { $gte: fromTime, $lte: toTime },
      });

      //the if statement should check the time slots and dates.
      if (appointments.length > 0) {
        return res.status(200).send({
          message: "Appointments not available",
          success: false,
        });
      } else {
        return res.status(200).send({
          message: "Appointments available",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error booking appointment",
        success: false,
        error,
      });
    }
  });
  
  router.get("/get-appointments-by-user-id", auth, async (req, res) => {
    try {
      const appointments = await Appointment.find({ userId: req.body.userId });
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
  });


module.exports = router;
