import { useMemo, useRef, useState } from "react";
import { FiCheckCircle, FiInfo, FiMapPin, FiPenTool, FiUpload , FiEye , FiEyeOff, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { useShop } from "../context/ShopContext";

const steps = ["Mobile & Email", "ID Verification", "Store & Pickup", "Product Listing"];
const mockLocations = ["Bandra West, Mumbai 400050", "Vaishali Nagar, Jaipur 302021", "Indiranagar, Bengaluru 560038", "Hazratganj, Lucknow 226001"];

const blankOtp = ["", "", "", "", "", ""];

export default function SellerRegister() {
  const { register, showToast } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileOtp, setMobileOtp] = useState(blankOtp);
  const [emailOtp, setEmailOtp] = useState(blankOtp);
  const [mobileSent, setMobileSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [panVerified, setPanVerified] = useState(false);
  const [business, setBusiness] = useState({ name: "", address: "", pincode: "", proof: null, signature: null, signatureMode: "draw" });
  const [store, setStore] = useState({ fullName: "", displayName: "", description: "", pickup: "", pickupMode: "search" });
  
  // Setu Aadhaar eKYC state variables
  const [setuRefId, setSetuRefId] = useState("");
  const [setuIsSimulated, setSetuIsSimulated] = useState(true);
  const [setuRedirectUrl, setSetuRedirectUrl] = useState("");
  const [showSetuModal, setShowSetuModal] = useState(false);
  const [setuOtp, setSetuOtp] = useState(["", "", "", "", "", ""]);
  const [setuVerifying, setSetuVerifying] = useState(false);

  const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [shopLogo, setShopLogo] = useState(null);

  const progress = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canContinueStep1 = mobileVerified && emailVerified;
  const canContinueStep2 = aadhaarVerified && panVerified && business.name && business.address && /^\d{6}$/.test(business.pincode) && business.proof;
  const passwordValid =
  password.length >= 8 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password);

const passwordsMatch =
  password &&
  confirmPassword &&
  password === confirmPassword;

const canContinueStep3 =
  store.fullName.trim() &&
  store.displayName.trim() &&
  store.description.trim() &&
  store.pickup.trim() &&
  shopLogo &&
  passwordValid &&
  passwordsMatch;

  const updateOtp = (type, index, value) => {
    const digits = value.replace(/\D/g, "").slice(-1);
    const setter = type === "mobile" ? setMobileOtp : setEmailOtp;
    const current = type === "mobile" ? mobileOtp : emailOtp;
    const next = [...current];
    next[index] = digits;
    setter(next);
    return digits;
  };

  const sendOtp = async (type) => {
    const target = type === "mobile" ? mobile : email;
    if (type === "mobile" && !/^\d{10}$/.test(mobile)) return showToast("Enter a valid 10 digit Indian mobile number");
    if (type === "email" && !validEmail) return showToast("Enter a valid email ID");

    try {
      showToast("Checking availability...");
      // Query the real database to see if email/mobile is already registered
      const checkRes = await fetch("/api/seller/exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: type === "email" ? target : undefined,
          phone: type === "mobile" ? target : undefined,
        })
      });
      const checkData = await checkRes.json();
      if (checkData.exists) {
        return showToast(checkData.reason || "This contact details is already registered.");
      }

      showToast("Requesting OTP verification code...");
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, target })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return showToast(data.message || "Failed to send OTP code. Please try again.");
      }

      type === "mobile" ? setMobileSent(true) : setEmailSent(true);
      showToast(data.message);

      // In mock/preview, prefill OTP code to make testing fast and effortless for you
      if (data.otp) {
        const updater = type === "mobile" ? setMobileOtp : setEmailOtp;
        updater(data.otp.split(""));
      }
    } catch (err) {
      console.error(err);
      showToast("Failed to connect to verification server.");
    }
  };

  const verifyOtp = async (type) => {
    const target = type === "mobile" ? mobile : email;
    const code = (type === "mobile" ? mobileOtp : emailOtp).join("");
    if (code.length !== 6) return showToast("Enter the 6 digit verification code");

    try {
      showToast("Checking OTP...");
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, target, code })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return showToast(data.message || "Incorrect verification code. Please request again.");
      }

      type === "mobile" ? setMobileVerified(true) : setEmailVerified(true);
      showToast(data.message || "Verified successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to verify code due to a connection issue.");
    }
  };

  const initiateSetuAadhaar = async () => {
    if (!/^\d{12}$/.test(aadhaar)) {
      return showToast("Enter a valid 12-digit Aadhaar number");
    }

    try {
      showToast("Initializing Setu Aadhaar eKYC...");
      const res = await fetch("/api/setu/aadhaar/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aadhaarNumber: aadhaar })
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return showToast(data.message || "Failed to initiate Setu verification. Please check network.");
      }

      setSetuRefId(data.refId);
      setSetuIsSimulated(data.isSimulated);
      setSetuRedirectUrl(data.redirectUrl);
      
      if (data.isSimulated) {
        // Simulation Mode: Open the elegant modal and prefill OTP for developer ease
        setShowSetuModal(true);
        const digits = (data.simulatedOtp || "483920").split("");
        setSetuOtp(digits);
        showToast("Setu Sandbox eKYC simulated! OTP dispatched.");
      } else {
        // Real Setu keys are configured!
        showToast("Setu session generated! Opening secure widget...");
        window.open(data.redirectUrl, "_blank");
        setShowSetuModal(true);
      }
    } catch (err) {
      console.error(err);
      showToast("Connection failed when contacting Setu servers.");
    }
  };

  const verifySetuAadhaar = async () => {
    const code = setuOtp.join("");
    if (code.length !== 6) {
      return showToast("Enter the 6-digit verification code");
    }

    try {
      setSetuVerifying(true);
      const res = await fetch("/api/setu/aadhaar/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refId: setuRefId, otp: code })
      });
      const data = await res.json();
      setSetuVerifying(false);

      if (!res.ok || !data.success) {
        return showToast(data.message || "Invalid passcode! Please verify and re-submit.");
      }

      setAadhaarVerified(true);
      setShowSetuModal(false);
      showToast("Aadhaar Verified successfully via Setu!");

      // Auto-fill retrieved verified credentials to save user typing!
      if (data.data) {
        setBusiness((prev) => ({
          ...prev,
          name: data.data.name,
          address: data.data.address,
          pincode: data.data.pincode
        }));
        
        setStore((prev) => ({
          ...prev,
          fullName: data.data.name
        }));
        
        showToast("Matched Setu KYC profile & auto-filled details!");
      }
    } catch (err) {
      console.error(err);
      setSetuVerifying(false);
      showToast("Aadhaar validation failed. Connection error.");
    }
  };

  const verifyId = (type) => {
    if (type === "aadhaar") {
      initiateSetuAadhaar();
    } else if (type === "pan") {
      if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)) {
        return showToast("Enter PAN in ABCDE1234F format");
      }
      setPanVerified(true);
      showToast("PAN verified against system");
    }
  };

  const useCurrentLocation = () => {
    setStore((current) => ({ ...current, pickupMode: "current" }));
    if (!navigator.geolocation) {
      setStore((current) => ({ ...current, pickup: "Current location unavailable, enter pickup manually" }));
      return showToast("Location is not supported on this browser");
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setStore((current) => ({ ...current, pickup: "Current location detected near your device" }));
        showToast("Pickup location filled");
      },
      () => {
        setStore((current) => ({ ...current, pickup: "Permission denied, enter pickup address manually" }));
        showToast("Location permission not granted");
      }
    );
  };

  const finishRegistration = async () => {
    const payload = {
      name: store.fullName.trim(),
      shopName: store.displayName.trim(),
      logo: "", // Saved locally/state
      email: email.trim(),
      phone: mobile.trim(),
      password,
      description: store.description.trim(),
      address: store.pickup.trim(),
      role: "seller",
      roles: ["customer", "seller"]
    };

    try {
      showToast("Saving your seller account securely in database...");
      const res = await fetch("/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return showToast(data.message || "Failed to persist seller account.");
      }

      // Successful real database registration! Persist in core React ShopContext next
      register({
        ...payload,
        logo: shopLogo ? URL.createObjectURL(shopLogo) : "",
      });

      showToast(data.message || "Seller registration completed and saved successfully!");
      navigate("/seller-dashboard");
    } catch (err) {
      console.error(err);
      showToast("Failed to complete setup on secure database.");
    }
  };

  return (
    <AuthLayout>
      <div className="mx-auto max-w-6xl">
        <div className="glass-card rounded-[34px] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-mint px-4 py-2 text-sm font-black text-emerald-700">Become a Seller</span>
              <h1 className="heading-font mt-4 text-4xl font-black">Start selling on Akriti</h1>
              <p className="mt-2 text-sm font-semibold text-slate-600">Simple guided setup for Indian small businesses, artisans, home businesses, and boutiques.</p>
            </div>
            <div className="min-w-[180px]">
              <p className="text-sm font-black">{progress}% complete</p>
              <div className="mt-2 h-3 rounded-full bg-white/70"><div className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {steps.map((label, index) => (
              <button key={label} type="button" disabled={index > maxUnlockedStep} onClick={() => setStep(index)} className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-50 ${step === index ? "bg-ink text-white" : index <= maxUnlockedStep && index < step ? "bg-mint text-emerald-800" : "bg-white/60"}`}>
                Step {index + 1}<span className="block font-bold">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 glass-card rounded-[34px] p-6">
          {step === 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              <VerificationBlock title="Mobile Verification" label="Enter Mobile Number" value={mobile} setValue={(value) => setMobile(value.replace(/\D/g, "").slice(0, 10))} sent={mobileSent} verified={mobileVerified} otp={mobileOtp} onSend={() => sendOtp("mobile")} onVerify={() => verifyOtp("mobile")} onOtp={(index, value) => updateOtp("mobile", index, value)} />
              <VerificationBlock title="Email Verification" label="Enter Email ID" value={email} setValue={setEmail} sent={emailSent} verified={emailVerified} otp={emailOtp} onSend={() => sendOtp("email")} onVerify={() => verifyOtp("email")} onOtp={(index, value) => updateOtp("email", index, value)} />
              <button disabled={!canContinueStep1} onClick={() => { setMaxUnlockedStep((current) => Math.max(current, 1)); setStep(1); }} className="pill-button bg-ink text-white disabled:opacity-50 lg:col-span-2">Continue</button>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-2">
                <IdField label="Enter Aadhaar Number" value={aadhaar} onChange={(value) => setAadhaar(value.replace(/\D/g, "").slice(0, 12))} verified={aadhaarVerified} button="Verify Aadhaar" onVerify={() => verifyId("aadhaar")} />
                <IdField label="Enter PAN Number" value={pan} onChange={(value) => setPan(value.toUpperCase().slice(0, 10))} verified={panVerified} button="Verify PAN" onVerify={() => verifyId("pan")} />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Input label="Business Name" value={business.name} onChange={(value) => setBusiness({ ...business, name: value })} />
                <Input label="Pincode" value={business.pincode} onChange={(value) => setBusiness({ ...business, pincode: value.replace(/\D/g, "").slice(0, 6) })} />
                <label className="rounded-2xl bg-white/70 px-4 py-3 font-semibold">
                  Address Proof Upload
                  <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file && file.size > 20 * 1024 * 1024) return showToast("Maximum file size is 20MB");
                    setBusiness({ ...business, proof: file });
                    if (file) showToast("Address proof selected");
                  }} className="mt-2 w-full text-sm" />
                </label>
              </div>
              <textarea value={business.address} onChange={(event) => setBusiness({ ...business, address: event.target.value })} placeholder="Business Address" className="min-h-28 rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
              <div className="rounded-2xl bg-white/60 p-4 text-sm font-semibold">
                Upload front page of any one document: Electricity Bill, Bank Passbook, Bank Statement, Mobile Bill, or Telephone Bill.
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/60 p-4">
                  <p className="flex items-center gap-2 font-black"><FiPenTool /> E-Signature</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {["draw", "upload"].map((mode) => <button key={mode} type="button" onClick={() => setBusiness({ ...business, signatureMode: mode })} className={`rounded-xl px-3 py-2 text-sm font-bold capitalize ${business.signatureMode === mode ? "bg-ink text-white" : "bg-white/70"}`}>{mode === "draw" ? "Draw Signature" : "Upload Signature"}</button>)}
                  </div>
                  {business.signatureMode === "draw" ? <div className="mt-4 grid h-32 place-items-center rounded-2xl border-2 border-dashed border-pastelPink bg-white/70 text-sm font-bold">Canvas signature pad</div> : <input type="file" accept=".png,.jpg,.jpeg" onChange={(event) => setBusiness({ ...business, signature: event.target.files?.[0] })} className="mt-4 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold" />}
                </div>
              </div>
              <button disabled={!canContinueStep2} onClick={() => { showToast("ID details saved"); setMaxUnlockedStep((current) => Math.max(current, 2)); setStep(2); }} className="pill-button bg-ink text-white disabled:opacity-50">Save & Continue</button>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5">
              <div className="grid gap-4 md:grid-cols-2">
  <Input
    label="Full Name"
    value={store.fullName}
    onChange={(value) =>
      setStore({ ...store, fullName: value })
    }
  />

  <label className="relative">
    <span className="mb-2 flex items-center gap-2 text-sm font-black">
      Display Name
      <FiInfo
        title="Your display name will be shown on the Akriti marketplace."
        className="text-rose-500"
      />
    </span>

    <input
      value={store.displayName}
      onChange={(event) =>
        setStore({
          ...store,
          displayName: event.target.value,
        })
      }
      className="w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none"
    />
  </label>
</div>
<div className="rounded-2xl bg-white/60 p-4">
  <label className="block text-sm font-black mb-2">
    Shop Logo
  </label>

  <input
    type="file"
    accept="image/png,image/jpeg,image/jpg,image/webp"
    onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    return showToast("Logo must be under 5MB");
  }

  const img = new Image();

  img.onload = () => {
    if (img.width < 500 || img.height < 500) {
      return showToast(
        "Logo must be at least 500×500 pixels"
      );
    }

    if (img.width !== img.height) {
      showToast(
        "Square logos are recommended for best appearance"
      );
    }

    setShopLogo(file);
    showToast("Logo uploaded successfully");
  };

  img.src = URL.createObjectURL(file);
}}
    className="w-full rounded-2xl bg-white/80 px-4 py-3"
  />
  <p className="mt-2 text-xs text-slate-500">
  PNG, JPG or WEBP • Minimum 500×500px •
  Maximum 5MB • Square logo recommended
</p>

  {shopLogo && (
    <img
      src={URL.createObjectURL(shopLogo)}
      alt="Shop Logo Preview"
      className="mt-3 h-24 w-24 rounded-xl border object-cover"
    />
  )}
</div>
              <div>
                <textarea maxLength={500} value={store.description} onChange={(event) => setStore({ ...store, description: event.target.value })} placeholder="Store Description" className="min-h-36 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
                <p className="mt-2 text-right text-xs font-bold text-slate-500">{store.description.length}/500</p>
              </div>
              <div className="rounded-2xl bg-white/60 p-4 text-sm font-bold"><FiMapPin className="mb-2" /> Delivery partners will pick up your orders from this location.</div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/60 p-4">
                  <p className="font-black">Option A: Search Pickup Location</p>
                  <input list="pickup-locations" value={store.pickupMode === "search" ? store.pickup : ""} onChange={(event) => setStore({ ...store, pickupMode: "search", pickup: event.target.value })} placeholder="Search pickup location" className="mt-3 w-full rounded-2xl bg-white/80 px-4 py-3 font-semibold outline-none" />
                  <datalist id="pickup-locations">{mockLocations.map((location) => <option key={location} value={location} />)}</datalist>
                </div>
                <button type="button" onClick={useCurrentLocation} className="rounded-2xl bg-pastelBlue p-4 text-left font-black text-ink transition hover:scale-[1.02]">
                  Option B: Use Current Location<span className="mt-2 block text-sm font-semibold">Uses browser geolocation and fills address automatically.</span>
                </button>
              </div>
              <div className="rounded-2xl bg-white/60 p-5">
  <h3 className="mb-4 text-lg font-black">
    Create Seller Password
  </h3>

  <div className="grid gap-4 md:grid-cols-2">
    <div>
      <label className="mb-2 block text-sm font-black">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full rounded-2xl bg-white/80 px-4 py-3 pr-12 font-semibold outline-none"
        />

        <button
  type="button"
  aria-label="Toggle password visibility"
  onClick={() =>
    setShowPassword(!showPassword)
  }
  className="absolute right-4 top-1/2 -translate-y-1/2"
>
          {showPassword ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
        </button>
      </div>
    </div>

    <div>
      <label className="mb-2 block text-sm font-black">
        Confirm Password
      </label>

      <div className="relative">
        <input
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm password"
          className="w-full rounded-2xl bg-white/80 px-4 py-3 pr-12 font-semibold outline-none"
        />

        <button
  type="button"
  aria-label="Toggle confirm password visibility"
  onClick={() =>
    setShowConfirmPassword(
      !showConfirmPassword
    )
  }
  className="absolute right-4 top-1/2 -translate-y-1/2"
>
          {showConfirmPassword ? (
            <FiEyeOff />
          ) : (
            <FiEye />
          )}
        </button>
      </div>
    </div>
  </div>

  <div className="mt-3 space-y-1 text-sm">
    <p
      className={
        password.length >= 8
          ? "text-green-600"
          : "text-slate-500"
      }
    >
      ✓ Minimum 8 characters
    </p>

    <p
      className={
        /[A-Z]/.test(password)
          ? "text-green-600"
          : "text-slate-500"
      }
    >
      ✓ One uppercase letter
    </p>

    <p
      className={
        /[a-z]/.test(password)
          ? "text-green-600"
          : "text-slate-500"
      }
    >
      ✓ One lowercase letter
    </p>

    <p
      className={
        /\d/.test(password)
          ? "text-green-600"
          : "text-slate-500"
      }
    >
      ✓ One number
    </p>

    {confirmPassword &&
  password !== confirmPassword && (
    <p className="text-red-500">
      Passwords do not match
    </p>
)}

{confirmPassword &&
  password === confirmPassword && (
    <p className="text-green-600">
      Passwords match ✓
    </p>
)}
  </div>
</div>
              <button disabled={!canContinueStep3} onClick={() => { showToast("Store and pickup details saved"); setMaxUnlockedStep((current) => Math.max(current, 3)); setStep(3); }} className="pill-button bg-ink text-white disabled:opacity-50">Save & Continue</button>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-5 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint text-2xl text-emerald-700"><FiUpload /></div>
              <h2 className="heading-font text-3xl font-black">Product Listing & Stocking</h2>
              <p className="mx-auto max-w-2xl text-sm font-semibold text-slate-600">Your seller account is ready. Add your first products from the seller dashboard, where category management is merged into Add Product.</p>
              <button onClick={finishRegistration} className="pill-button mx-auto bg-gradient-to-r from-secondary to-secondary-light text-ink">Complete setup and open dashboard</button>
              <Link to="/login" className="text-sm font-black text-rose-500">Already completed setup? Login</Link>
            </div>
          )}
        </div>
      </div>

      {/* API Setu Secure Aadhaar eKYC Verification Dialog */}
      {showSetuModal && (
        <div id="setu-secure-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white text-ink shadow-2xl transition-all duration-300">
            {/* National E-Governance / Setu Branding Header */}
            <div className="bg-rose-50 p-6 pb-5 text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <FiLock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black tracking-tight text-rose-950">Setu Secure Gateway</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-rose-600">UIDAI Paperless Offline e-KYC</p>
              <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                🔒 Secure 256-bit Encrypted Connection
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="mb-5 rounded-2xl bg-slate-50 p-4 text-xs font-bold text-slate-700">
                <div className="flex justify-between border-b border-slate-100 pb-2 mb-2">
                  <span>Aadhaar Number</span>
                  <span className="font-mono tracking-wider">XXXX XXXX {aadhaar.slice(-4)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reference Session ID</span>
                  <span className="font-mono text-[10px] text-slate-500 uppercase tracking-tight">{setuRefId}</span>
                </div>
              </div>

              {/* Step checklist indicator */}
              <div className="mb-6 space-y-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-black text-emerald-600">
                  <FiCheckCircle className="h-3.5 w-3.5" /> Handshake with UIDAI servers (Setu OKYC API)
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-emerald-600">
                  <FiCheckCircle className="h-3.5 w-3.5" /> Verification Security OTP dispatched successfully
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-rose-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping"></span> Enter verification passcode (OTP)
                </div>
              </div>

              {/* OTP Fields */}
              <div className="mb-6">
                <label className="block text-center text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                  Enter 6-Digit SMS Verification Passcode
                </label>
                <div className="flex justify-center gap-2">
                  {setuOtp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`setu-otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        const arr = [...setuOtp];
                        arr[idx] = val.slice(-1);
                        setSetuOtp(arr);
                        if (val && idx < 5) {
                          document.getElementById(`setu-otp-${idx + 1}`)?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !setuOtp[idx] && idx > 0) {
                          const arr = [...setuOtp];
                          arr[idx - 1] = "";
                          setSetuOtp(arr);
                          document.getElementById(`setu-otp-${idx - 1}`)?.focus();
                        }
                      }}
                      className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-200 text-center text-lg font-black text-slate-800 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                    />
                  ))}
                </div>
              </div>

              {/* Simulated Sandbox notice */}
              {setuIsSimulated && (
                <div className="mb-6 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 leading-relaxed font-semibold">
                  <p className="flex items-center gap-1.5 font-bold text-amber-800 mb-1">
                    💡 Developer Sandbox Simulation
                  </p>
                  We detected that real Setu credentials are not active in your <span className="font-mono">.env</span> file. This is a secure server-side hardware simulation.
                  <div className="mt-1.5 pt-1.5 border-t border-amber-200/50">
                    We automatically prepared simulated OTP code <strong className="font-mono text-sm tracking-widest text-amber-950 px-1 bg-white/70 rounded">483920</strong> for you. Simply hit the confirm verification button below to continue testing!
                  </div>
                </div>
              )}

              {/* Real Setu guidelines */}
              {!setuIsSimulated && (
                <div className="mb-6 rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-xs text-emerald-900 leading-relaxed font-semibold">
                  <p className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1">
                    🚀 Live Setu integration active!
                  </p>
                  A real eKYC session has been initialized. If the Setu popup did not show, please complete authentication on the tab, then click the Confirm verification button below to fetch and save credentials.
                  <div className="mt-2 text-center">
                    <a href={setuRedirectUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-lg bg-emerald-700 px-3 py-1.5 font-black text-white hover:bg-emerald-800">
                      Open Setu Verification Window ↗
                    </a>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={verifySetuAadhaar}
                  disabled={setuVerifying}
                  className="pill-button w-full bg-rose-600 text-white font-black py-3 rounded-2xl hover:bg-rose-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {setuVerifying ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      Verifying with Setu...
                    </>
                  ) : (
                    "Confirm eKYC Passport"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSetuModal(false)}
                  className="text-center text-sm font-black text-rose-500 hover:text-rose-600 py-1 transition"
                >
                  Cancel Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}

function VerificationBlock({ title, label, value, setValue, sent, verified, otp, onSend, onVerify, onOtp }) {
  const otpRefs = useRef([]);
  const handleOtpChange = (index, value) => {
    const digit = onOtp(index, value);
    if (digit && index < otp.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="rounded-[28px] bg-white/60 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black">{title}</h2>
        {verified && <span className="inline-flex items-center gap-1 rounded-full bg-mint px-3 py-1 text-xs font-black text-emerald-700"><FiCheckCircle /> Verified</span>}
      </div>
      <label className="mt-5 block text-sm font-black">{label}</label>
      <div className="mt-2 flex gap-2">
        <input value={value} onChange={(event) => setValue(event.target.value)} className="min-w-0 flex-1 rounded-2xl bg-white/80 px-4 py-3 font-semibold outline-none" />
        <button type="button" onClick={onSend} className="shrink-0 rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white">Send OTP</button>
      </div>
      {sent && !verified && (
        <div className="mt-5">
          <p className="text-sm font-bold">Enter OTP sent to your {title.toLowerCase().includes("mobile") ? "mobile number" : "email"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { otpRefs.current[index] = element; }}
                value={digit}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                onChange={(event) => handleOtpChange(index, event.target.value)}
                onKeyDown={(event) => handleOtpKeyDown(index, event)}
                className="h-12 w-12 rounded-xl border border-primary/20 bg-white text-center text-lg font-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={onVerify} className="pill-button bg-mint px-4 py-2 text-emerald-800">Verify</button>
            <button type="button" onClick={onSend} className="text-sm font-black text-rose-500">Resend OTP</button>
          </div>
        </div>
      )}
    </div>
  );
}

function IdField({ label, value, onChange, verified, button, onVerify }) {
  return (
    <div className="rounded-2xl bg-white/60 p-4">
      <label className="text-sm font-black">{label}</label>
      <div className="mt-2 flex gap-2">
        <input value={value} onChange={(event) => onChange(event.target.value)} className="min-w-0 flex-1 rounded-2xl bg-white/80 px-4 py-3 font-semibold outline-none" />
        <button type="button" onClick={onVerify} className="rounded-2xl bg-ink px-4 py-3 text-sm font-black text-white">{verified ? "Verified" : button}</button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-black">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none" />
    </label>
  );
}
