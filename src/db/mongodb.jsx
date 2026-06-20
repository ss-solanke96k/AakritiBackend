import mongoose from "mongoose";
import { SellerModel } from "../model/Seller.jsx";
export { SellerModel };


let isConnected = false;

//Function for the connection of mongodb
export async function connectMongoDB() {
  if (isConnected) return true;
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("your-mongodb-uri") || !uri.trim()) {
    console.log("[MONGODB CONFIG] MongoDB MONGODB_URI is not configured in environment.");
    return false;
  }
  try {
    console.log("[MONGODB CONFIG] Connecting to MongoDB instance...");
    await mongoose.connect(uri);
    isConnected = true;
    console.log("[MONGODB SUCCESS] Successfully connected to MongoDB!");
    return true;
  } catch (err) {
    console.error("[MONGODB ERROR] Connection failed:", err);
    return false;
  }
}

//Function to check user exist in our database or not using email and phone as a unique key
export async function checkSellerExistsMongo(email, phone) {
  try {
    const connected = await connectMongoDB();
    if (!connected) return { exists: false };

    if (email) {
      const emailTrimmed = email.toLowerCase().trim();
      const existingEmail = await SellerModel.findOne({ email: emailTrimmed });
      if (existingEmail) {
        return { exists: true, reason: "Email already registered in MongoDB database." };
      }
    }

    if (phone) {
      const phoneTrimmed = phone.trim();
      const existingPhone = await SellerModel.findOne({ phone: phoneTrimmed });
      if (existingPhone) {
        return { exists: true, reason: "Mobile number already registered in MongoDB database." };
      }
    }

    return { exists: false };
  } catch (err) {
    console.error("[MONGODB SEARCH ERROR] checkSellerExistsMongo failed:", err);
    return { exists: false };
  }
}


//If user doesn's exists save them to database
export async function saveSellerMongo(sellerData) {
  try {
    const connected = await connectMongoDB();
    if (!connected) {
      return { success: false, error: "MongoDB is not connected." };
    }

    const newSeller = new SellerModel({
      name: sellerData.name || "",
      shopName: sellerData.shopName || "",
      email: (sellerData.email || "").toLowerCase().trim(),
      phone: sellerData.phone || "",
      password: sellerData.password || "",
      description: sellerData.description || "",
      address: sellerData.address || "",
      roles: sellerData.roles || ["customer", "seller"],
      role: sellerData.role || "seller",
    });

    const saved = await newSeller.save();
    console.log(`[MONGODB WRITE] Successfully persisted seller: ${saved._id}`);
    return { success: true, id: saved._id.toString() };
  } catch (err) {
    console.error("[MONGODB WRITE ERROR] saveSellerMongo failed:", err);
    return { success: false, error: err.message || "Unknown MongoDB write error" };
  }
}
