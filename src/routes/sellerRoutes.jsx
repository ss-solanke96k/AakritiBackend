import express from "express";
import { checkSellerExistsController, registerSellerController } from "../controllers/sellerController.jsx";

const router = express.Router();

//seller routes
router.post("/exists", checkSellerExistsController);  //user exists or not
router.post("/register", registerSellerController);  //register seller

export default router;
