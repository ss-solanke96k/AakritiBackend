import { sendOtpService, verifyOtpService } from "../services/otpService.jsx";

export async function sendOtpController(req, res) {
  try {
    const { type, target } = req.body;
    if (!type || !target) {
      return res.status(400).json({ success: false, message: "Type ('mobile' or 'email') and target are required" });
    }

    const result = await sendOtpService(type, target);
    return res.json(result);
  } catch (err) {
    console.error("Error in sendOtpController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export function verifyOtpController(req, res) {
  try {
    const { type, target, code } = req.body;
    if (!type || !target || !code) {
      return res.status(400).json({ success: false, message: "Type, target, and 6-digit code are required" });
    }

    const result = verifyOtpService(type, target, code);
    if (!result.success) {
      return res.status(result.status || 400).json(result);
    }

    return res.json({ success: true, message: "Verified successfully!" });
  } catch (err) {
    console.error("Error in verifyOtpController:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
