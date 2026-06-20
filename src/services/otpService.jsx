import twilio from "twilio";
import nodemailer from "nodemailer";

const otpStore = new Map();

// Lazy helper to get Twilio client
let twilioClient = null;
function getTwilio() {
  const sid = process.env.TWILIO_SID || process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token || sid.includes("ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX") || !sid.trim() || !token.trim()) {
    console.log("[TWILIO CONFIG] Active Twilio SID or token is missing or is placeholder.");
    return null;
  }
  if (!twilioClient) {
    try {
      twilioClient = twilio(sid, token);
      console.log("[TWILIO CONFIG] Twilio client successfully initialized under SID:", sid);
    } catch (e) {
      console.error("[TWILIO CLIENT INIT ERROR]", e);
      return null;
    }
  }
  return twilioClient;
}

// Lazy helper for Nodemailer SMTP transporter
function getNodemailerTransporter() {
  const host = process.env.EMAIL_SMTP_HOST;
  const port = parseInt(process.env.EMAIL_SMTP_PORT || "465");
  const user = process.env.EMAIL_SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.EMAIL_SMTP_PASS || process.env.EMAIL_APP_PASSWORD;
  const service = process.env.EMAIL_SERVICE;

  if (!user || !pass || user.includes("your-email@gmail.com") || pass.includes("your-gmail-app-password") || !user.trim() || !pass.trim()) {
    console.log("[SMTP CONFIG] SMTP user or password is missing or is placeholder.");
    return null;
  }

  if (service === "gmail" || user.toLowerCase().endsWith("@gmail.com")) {
    console.log("[SMTP CONFIG] Configuring direct Gmail transport with user:", user);
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass,
      },
    });
  }

  if (!host) {
    console.log("[SMTP CONFIG] SMTP configuration has user/password but no host defined.");
    return null;
  }

  console.log(`[SMTP CONFIG] Configuring custom SMTP host: ${host}:${port} for user: ${user}`);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpService(type, target) {
  const otp = generateOtp();
  const expiresAt = Date.now() + 10 * 60 * 1000; // Code is active for 10 minutes
  const key = `${type}:${target}`;
  otpStore.set(key, { otp, expiresAt });

  console.log(`[OTP GENERATED] Type: ${type}, Target: ${target}, OTP: ${otp} (Expires in 10 mins)`);

  let deliveredReal = false;
  let fallbackReason = "";

  if (type === "mobile") {
    const client = getTwilio();
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const cleanTarget = target.startsWith("+") ? target : `+91${target}`;

    if (client && fromNumber) {
      try {
        await client.messages.create({
          body: `Your Akriti Marketplace verification OTP is ${otp}. Valid for 10 minutes. Do not share this with anyone.`,
          from: fromNumber,
          to: cleanTarget,
        });
        deliveredReal = true;
        console.log(`[TWILIO SUCCESS] SMS OTP successfully sent to ${cleanTarget}`);
      } catch (twilioErr) {
        console.error("[TWILIO FAILURE] SMS send error:", twilioErr);
        fallbackReason = `Twilio SMS delivery failed (${twilioErr.message || "Bad Twilio Credentials"}).`;
      }
    } else {
      console.warn("[MOCK SMS MODE] Twilio credentials are not available. OTP is logged below.");
    }
  } else if (type === "email") {
    const transporter = getNodemailerTransporter();
    const emailSender = process.env.EMAIL_SMTP_USER || process.env.EMAIL_USER;
    const fromEmail = process.env.EMAIL_FROM_ADDRESS || `"Akriti Marketplace" <${emailSender}>`;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromEmail,
          to: target,
          subject: "Verify Your Identity - Akriti Marketplace",
          text: `Your verification code is: ${otp}\n\nThis OTP is valid for 10 minutes. Please enter this code to complete your business registration on Akriti Marketplace.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 25px; border: 1px solid #4B1534; border-radius: 16px; background-color: #FAF8F5;">
              <h1 style="color: #4B1534; text-align: center; font-size: 26px; border-bottom: 1px solid rgba(75, 21, 52, 0.1); padding-bottom: 15px; margin-top: 0;">Akriti Marketplace</h1>
              <p style="color: #1F1A17; font-size: 16px;">Dear Artisan,</p>
              <p style="color: #5F5752; font-size: 14px; line-height: 1.5;">Thank you for launching your shop on Akriti. Please enter the verification code below on the signup page to confirm your identity:</p>
              <div style="background-color: #fff; border: 2px dashed #C6A972; border-radius: 12px; padding: 20px; text-align: center; margin: 25px 0;">
                <span style="font-size: 36px; font-weight: bold; letter-spacing: 5px; color: #4B1534;">${otp}</span>
              </div>
              <p style="color: #5F5752; font-size: 12px; line-height: 1.5; border-top: 1px solid rgba(75, 21, 52, 0.1); padding-top: 15px; margin-bottom: 0;">This OTP code is valid for 10 minutes. If you did not trigger this request, please ignore this email safely.</p>
            </div>
          `,
        });
        deliveredReal = true;
        console.log(`[SMTP SUCCESS] Nodemailer sent verification email to ${target}`);
      } catch (emailErr) {
        console.error("[NODEMAILER FAILURE] Email send error:", emailErr);
        fallbackReason = `Gmail SMTP failed (${emailErr.message || "Invalid Email Login details"}).`;
      }
    } else {
      console.warn("[MOCK EMAIL MODE] SMTP credentials are not fully configured. OTP is logged below.");
    }
  }

  if (deliveredReal) {
    return {
      success: true,
      deliveredReal: true,
      message: `Verification code sent to ${target}!`,
    };
  }

  console.log(`
=============================================================================
🔑 LOCAL DEV OTP FALLBACK PIN GENERATOR
=============================================================================
Target: ${target} (${type})
Code:   ${otp}

Status: Offline/Fallback mode activated! 
Reason: ${fallbackReason || "No real provider credentials configured."}

👉 We automatically prefilled this code in your browser for you! Just click 
   the verification button to continue your setup.
=============================================================================
  `);

  return {
    success: true,
    deliveredReal: false,
    message: fallbackReason
      ? `Provider Error: ${fallbackReason} Fallback generated code: ${otp} (prefilled below)`
      : `[Local Fallback] Verification code generated: ${otp} (prefilled below)`,
    otp: otp,
  };
}

export function verifyOtpService(type, target, code) {
  const key = `${type}:${target}`;
  const entry = otpStore.get(key);

  if (!entry) {
    return { success: false, status: 400, message: "Verification link not found. Request a new OTP first." };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(key);
    return { success: false, status: 400, message: "The verification code has expired. Click 'Resend OTP' to try again." };
  }

  if (entry.otp !== code) {
    return { success: false, status: 400, message: "Incorrect verification code. Please check and try again." };
  }

  otpStore.delete(key);
  console.log(`[VERIFIED SUCCESS] Valid verification confirmed for ${type}:${target}`);
  return { success: true };
}
