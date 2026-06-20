import { initiateSetuAadhaar, verifySetuAadhaar } from "../services/setuService.jsx";

export async function initiateSetuController(req, res) {
  try {
    const { aadhaarNumber } = req.body;
    if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ success: false, message: "A valid 12-digit Aadhaar number is required." });
    }

    const result = await initiateSetuAadhaar(aadhaarNumber);
    return res.json(result);
  } catch (err) {
    console.error("Error in initiateSetuController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function verifySetuController(req, res) {
  try {
    const { refId, otp } = req.body;
    if (!refId || !otp) {
      return res.status(400).json({ success: false, message: "Reference ID and SMS OTP are required." });
    }

    const result = await verifySetuAadhaar(refId, otp);
    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.json(result);
  } catch (err) {
    console.error("Error in verifySetuController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
