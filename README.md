# Akriti Marketplace Backend

Welcome to the backend infrastructure of the **Akriti Marketplace**. This application is engineered with a modular directory-based architecture using **Express**, **TypeScript**, and **Vite** as a unified full-stack application. It features real-world third-party provider integrations with robust sandbox fallback simulators, ensuring seamless offline testing without API access blocks.

---

## 📂 Architecture & Modular Folder Structure

The backend utilizes separation of concerns, decoupling server-side configurations, database models, business logic controllers, database connection adapters, and API endpoints:

```text
├── server.ts                       # Unified Express server and Vite middleware entry point
└── src/
    ├── db/
    │   └── mongodb.jsx             # MongoDB Mongoose connector and query helper handlers
    ├── model/
    │   └── Seller.jsx              # MongoDB database collection schema definition
    ├── routes/
    │   ├── index.jsx               # Main aggregated API endpoint router mount
    │   ├── sellerRoutes.jsx        # Business registry and search sub-routers
    │   ├── mongodbRoutes.jsx       # Administrative and collection monitoring routes
    │   ├── otpRoutes.jsx           # OTP transmission and authentication actions
    │   └── setuRoutes.jsx          # Setu eKYC Aadhaar verification lifecycle routes
    ├── controllers/
    │   ├── sellerController.jsx    # Express controllers translating requests to service calls
    │   ├── otpController.jsx       # Lifecycle handler for SMS and email OTP triggers
    │   └── setuController.jsx      # Gateway triggers for Setu Aadhaar sessions
    └── services/
        ├── sellerService.jsx       # Business logic for database writes and memory fallbacks
        ├── otpService.jsx          # Logic for Twilio client, Nodemailer transporters & fallbacks
        └── setuService.jsx         # Logic for Setu Sandbox / Live OKYC operations and verifications
```

---

## 🛠️ Feature Modules

### 1. Aadhaar secure eKYC Integration (Setu API)
Automated real-life sandbox OKYC and verified UIDAI data simulation flow.
* **Service File**: `/src/services/setuService.jsx`
* **Real Integration**: Utilizes the official Setu Gateway (`https://gateway-sandbox.api.setu.co`) to launch eKYC UI.
* **Development Fallback**: In the absence of `SETU_CLIENT_ID`, a native browser modal-linked simulator triggers automatically, outputting secret verification pins to the host console.

### 2. OTP Authentication Engine (SMS & Email)
Independent verification paths utilizing enterprise adapters.
* **Service File**: `/src/services/otpService.jsx`
* **Real Mobile SMTP/SMS**: Uses **Twilio SMS** to deliver registration tokens to client devices.
* **Real Email SMTP**: Operates via direct **Gmail SMTP Secure Transport** (using secure App Passwords) or custom hosts.
* **Development Fallback**: When missing secrets, the backend enters offline development mode, auto-generating credentials, outputting mock terminals, and pre-filling forms directly inside the browser.

### 3. MongoDB Data Persistence
Dual database pipeline managing merchant data profiles with high-concurrency memory backup.
* **Model File**: `/src/model/Seller.jsx`
* **Real Integration**: Interacts seamlessly with MongoDB Atlas connections via optimized, type-safe **Mongoose**.
* **Development Fallback**: When `MONGODB_URI` remains unconfigured, the registration endpoints dynamically mirror operations into secure in-memory stores, allowing uninterrupted client operations.

---

## ⚙️ Environment Variables Setup

Define your secrets inside a `.env` file at the root level of your workspace to active real integrations:

```env
# Twilio Client Configuration
TWILIO_ACCOUNT_SID="ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
TWILIO_AUTH_TOKEN="your_auth_token_here"
TWILIO_PHONE_NUMBER="+12345678901"

# Email SMTP Credentials (Nodemailer config)
EMAIL_SERVICE="gmail"
EMAIL_USER="your-email@gmail.com"
EMAIL_APP_PASSWORD="your-gmail-app-password"

# Setu Sandbox Gateway Secrets
SETU_CLIENT_ID="your_setu_client_id_here"
SETU_CLIENT_SECRET="your_setu_client_secret_here"
SETU_BASE_URL="https://gateway-sandbox.api.setu.co"

# MongoDB Database URI
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/akriti?retryWrites=true&w=majority"
```

---

## 🚀 Running the Application

### Launching Development Environment
Runs the development server containing full hot reload support:
```bash
npm run dev
```

### Building the Production Deployment
Compiles the React front-end static files, bundles the custom Express gateway, and targets self-contained Node runtimes:
```bash
npm run build
```

### Initiating Production Server
Launches the standalone optimized backend:
```bash
npm run start
```
