const express = require("express");
const router = express.Router();
const Patient = require("../models/patientModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth")


router.post("/register", async (req, res) => {
    try {
        const patientExists = await Patient.findOne({ email: req.body.email });
        if (patientExists) {
            return res
                .status(200)
                .send({ message: "Patient already exists", success: false });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res
            .status(200)
            .send({ message: "Patient created successfully", success: true });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: "Error creating the patient", success: false, error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const patient = await Patient.findOne({ email: req.body.email });
        if (!patient) {
            return res
                .status(200)
                .send({ message: "Patient does not exist", success: false });
        }
        const checkPassword = await bcrypt.compare(req.body.password, patient.password);
        if (!checkPassword) {
            return res
                .status(200)
                .send({ message: "Password is incorrect", success: false });
        } else {
            const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET_KEY, {
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

router.post("/get-patient-info", auth, async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.body.patientID });
        // patient.password = undefined;
        if (!patient) {
            return res
                .status(200)
                .send({ message: "Patient does not exist", success: false });
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: patient.name,
                    email: patient.email
                },
            });
        }
    } catch (error) {
        res
            .status(500)
            .send({ message: "Error getting patient info", success: false, error });
    }
})

module.exports = router;
