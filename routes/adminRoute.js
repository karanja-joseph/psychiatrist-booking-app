const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Psychiatrist = require("../models/psychiatristModel");
const auth = require("../middlewares/auth");

router.get("/get-all-psychiatrists", auth, async (req, res) => {
  try {
    const psychiatrists = await Psychiatrist.find({});
    res.status(200).send({
      message: "Psychiatrists fetched successfully",
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

router.get("/get-all-users", auth, async (req, res) => {
  try {
    const users = await User.find({ $and: [{"isPsychiatrist": { $eq: "false"}}, {"isAdmin": { $eq: "false"}}]});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
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


//change name to /get-all-patients

router.post("/change-psychiatrist-account-status",auth,async(req, res) => {
    try {
      const { psychiatristId, status } = req.body;
      console.log('refpre');
      const psychiatrist = await Psychiatrist.findByIdAndUpdate(psychiatristId, {
        status,
      });
      

      const user = await User.findOne({ _id: psychiatrist.userId });
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-psychiatrist-request-changed",
        message: `Your psychiatrist account has been ${status}`,
        onClickPath: "/notifications",
      });
      user.isPsychiatrist = status === "approved" ? true : false;
      await user.save()
      //delete after application
      // await user.deleteOne();

      res.status(200).send({
        message: "Psychiatrist status updated successfully",
        success: true,
        data: psychiatrist,
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

//do away with this and make an update psychiatrist route

module.exports = router;
