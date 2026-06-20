import { connectMongoDB, checkSellerExistsMongo, saveSellerMongo, SellerModel } from "../db/mongodb.jsx";

const inMemoryFallbackSellers = new Map();

export async function sellerExistsService(email, phone) {
  // Check MongoDB
  const mongoCheck = await checkSellerExistsMongo(email || "", phone || "");
  if (mongoCheck.exists) {
    return { exists: true, reason: mongoCheck.reason || "Recorded in MongoDB database." };
  }

  // Local fallback
  if (!process.env.MONGODB_URI) {
    const emailLower = (email || "").toLowerCase().trim();
    const phoneTrimmed = (phone || "").trim();

    for (const seller of inMemoryFallbackSellers.values()) {
      if (seller.email === emailLower) {
        return { exists: true, reason: "Email already registered in local mock memory database." };
      }
      if (seller.phone === phoneTrimmed) {
        return { exists: true, reason: "Mobile number already registered in local mock memory database." };
      }
    }
  }

  return { exists: false };
}


export async function registerSellerService(sellerPayload) {
  const email = sellerPayload.email;
  const phone = sellerPayload.phone;

  // Double-verify
  const check = await sellerExistsService(email, phone);
  if (check.exists) {
    return { success: false, status: 400, message: check.reason };
  }

  let mongoResultId = "";
  let wroteMongo = false;
  let mongoError = "";

  if (process.env.MONGODB_URI) {
    const dbConnected = await connectMongoDB();
    if (dbConnected) {
      const mongoRes = await saveSellerMongo(sellerPayload);
      if (mongoRes.success) {
        mongoResultId = mongoRes.id;
        wroteMongo = true;
      } else {
        mongoError = mongoRes.error || "Failed to save in MongoDB.";
      }
    }
  }

  let fallbackId = "";
  if (!wroteMongo) {
    fallbackId = `mock_mem_${Math.floor(1000000 + Math.random() * 9000000)}`;
    inMemoryFallbackSellers.set(fallbackId, {
      _id: fallbackId,
      id: fallbackId,
      name: sellerPayload.name || "",
      shopName: sellerPayload.shopName || "",
      email: (sellerPayload.email || "").toLowerCase().trim(),
      phone: sellerPayload.phone || "",
      description: sellerPayload.description || "",
      address: sellerPayload.address || "",
      roles: sellerPayload.roles || ["customer", "seller"],
      role: sellerPayload.role || "seller",
      createdAt: new Date(),
    });
  }

  return {
    success: true,
    message: wroteMongo 
      ? "Seller account saved successfully to your MongoDB database!" 
      : "Mock persistence active! Seller details saved in local secure memory fallback.", 
    id: mongoResultId || fallbackId,
    mongodbId: mongoResultId || undefined,
    mongoError: mongoError || undefined,
    isSimulated: !wroteMongo
  };
}

export async function getMongoDBStatusService() {
  const uriExists = !!process.env.MONGODB_URI;
  if (!uriExists) {
    return { 
      connected: false, 
      status: "unconfigured", 
      message: "MONGODB_URI is not set in the environment variables. Mocking registrations in memory." 
    };
  }
  const connected = await connectMongoDB();
  return {
    connected,
    status: connected ? "connected" : "failed",
    message: connected ? "Connected to MongoDB via Mongoose successfully!" : "Failed to establish a live connection to MongoDB. Please inspect credentials."
  };
}

export async function getSellersService() {
  const connected = await connectMongoDB();
  if (!connected) {
    const sellersList = Array.from(inMemoryFallbackSellers.values());
    return { success: true, count: sellersList.length, sellers: sellersList, isSimulated: true };
  }
  try {
    const sellers = await SellerModel.find({}).sort({ createdAt: -1 });
    return { success: true, count: sellers.length, sellers, isSimulated: false };
  } catch (err) {
    console.error("Failed to query sellers from MongoDB database:", err);
    const sellersList = Array.from(inMemoryFallbackSellers.values());
    return { success: true, count: sellersList.length, sellers: sellersList, isSimulated: true, error: err.message };
  }
}

export async function deleteSellerService(id) {
  if (id.startsWith("mock_mem_")) {
    const deleted = inMemoryFallbackSellers.delete(id);
    if (!deleted) {
      return { success: false, status: 404, message: "Seller not found in local mock database." };
    }
    return { success: true, message: "Seller deleted successfully from local mock database." };
  }

  const connected = await connectMongoDB();
  if (!connected) {
    return { success: false, status: 503, message: "MongoDB is not connected." };
  }
  
  const deleted = await SellerModel.findByIdAndDelete(id);
  if (!deleted) {
    return { success: false, status: 404, message: "Seller document not found in MongoDB." };
  }
  return { success: true, message: "Seller deleted successfully from MongoDB" };
}

export async function resetSellersService() {
  inMemoryFallbackSellers.clear();
  const connected = await connectMongoDB();
  if (!connected) {
    return { success: true, message: "All local in-memory fallback seller records cleared." };
  }
  await SellerModel.deleteMany({});
  return { success: true, message: "All seller records cleared from MongoDB." };
}
