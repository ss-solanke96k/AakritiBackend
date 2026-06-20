import express from "express";
import { 
  getMongoDBStatusController, 
  getSellersController, 
  deleteSellerController, 
  resetSellersController 
} from "../controllers/sellerController.jsx";

const router = express.Router();


router.get("/connection-status", getMongoDBStatusController);
router.get("/sellers", getSellersController); 
router.delete("/sellers/:id", deleteSellerController); //delte seller by getting their id (unique)
router.post("/sellers/reset", resetSellersController); 

export default router;
