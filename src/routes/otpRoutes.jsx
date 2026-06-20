import express from "express";
import { sendOtpController, verifyOtpController } from "../controllers/otpController.jsx";

const router = express.Router();

//OTP verification route 
router.post("/send", sendOtpController); //Sent OTP
router.post("/verify", verifyOtpController);  //Verify OTP

export default router;
