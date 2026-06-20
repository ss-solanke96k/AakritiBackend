import { 
  sellerExistsService, 
  registerSellerService, 
  getMongoDBStatusService, 
  getSellersService, 
  deleteSellerService, 
  resetSellersService 
} from "../services/sellerService.jsx";

export async function checkSellerExistsController(req, res) {
  try {
    const { email, phone } = req.body;
    const result = await sellerExistsService(email, phone);
    return res.json(result);
  } catch (err) {
    console.error("Error in checkSellerExistsController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function registerSellerController(req, res) {
  try {
    const sellerPayload = req.body;
    if (!sellerPayload.email || !sellerPayload.phone) {
      return res.status(400).json({ success: false, message: "Email and phone are required for registration." });
    }

    const result = await registerSellerService(sellerPayload);
    if (!result.success) {
      return res.status(result.status || 500).json(result);
    }

    return res.json(result);
  } catch (err) {
    console.error("Error in registerSellerController:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
}

export async function getMongoDBStatusController(req, res) {
  try {
    const status = await getMongoDBStatusService();
    return res.json(status);
  } catch (err) {
    console.error("Error in getMongoDBStatusController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSellersController(req, res) {
  try {
    const result = await getSellersService();
    return res.json(result);
  } catch (err) {
    console.error("Error in getSellersController:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
}

export async function deleteSellerController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteSellerService(id);
    if (!result.success) {
      return res.status(result.status || 500).json(result);
    }
    return res.json(result);
  } catch (err) {
    console.error("Error in deleteSellerController:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
}

export async function resetSellersController(req, res) {
  try {
    const result = await resetSellersService();
    return res.json(result);
  } catch (err) {
    console.error("Error in resetSellersController:", err);
    return res.status(500).json({ success: false, message: err.message || "Internal server error" });
  }
}
