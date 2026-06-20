import express from "express";
import sellerRoutes from "./sellerRoutes.jsx";
import mongodbRoutes from "./mongodbRoutes.jsx";
import otpRoutes from "./otpRoutes.jsx";
import setuRoutes from "./setuRoutes.jsx";

const router = express.Router();

router.use("/seller", sellerRoutes);
router.use("/mongodb", mongodbRoutes);
router.use("/otp", otpRoutes);
router.use("/setu", setuRoutes);

export default router;
