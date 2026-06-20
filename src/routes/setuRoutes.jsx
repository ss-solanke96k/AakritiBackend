import express from "express";
import { initiateSetuController, verifySetuController } from "../controllers/setuController.jsx";

const router = express.Router();


//Aadhar verification route
router.post("/aadhaar/initiate", initiateSetuController);
router.post("/aadhaar/verify", verifySetuController);  //verify aadhar

export default router;
