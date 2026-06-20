import mongoose from "mongoose";


//Seller Schema//
const SellerSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    shopName: {
      type: "String",
    },
    email: {
      type: "String",
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: "String",
      required: true,
      trim: true,
    },
    password: {
      type: "String",
    },
    description: {
      type: "String",
    },
    address: {
      type: "String",
    },
    roles: {
      type: ["String"],
      default: ["customer", "seller"],
    },
    role: {
      type: "String",
      default: "seller",
    },
  },
  { timestamps: true }
);

export const SellerModel = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
