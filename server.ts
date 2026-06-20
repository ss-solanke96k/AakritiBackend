import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { connectMongoDB } from "./src/db/mongodb.jsx";
import apiRoutes from "./src/routes/index.jsx";

dotenv.config();

// Graceful global exception handlers to prevent any external SDK authentications from crashing local developers
process.on("unhandledRejection", (reason: any) => {
  console.warn("\n[SYSTEM WARNING] Caught an unhandled promise rejection to safeguard live server uptime:");
  console.warn(reason?.stack || reason);
});

process.on("uncaughtException", (error: any) => {
  console.error("\n[SYSTEM ERROR] Arrested an uncaught exception to safely avoid process exit:");
  console.error(error?.stack || error);
});

const app = express();
const PORT = 3000;

// Enable JSON parser middleware
app.use(express.json());

// Mount the modular aggregated API routers under /api
app.use("/api", apiRoutes);


// Integrate Express backend inside Vite SPA environment
async function initServer() {
  // Connect to MongoDB upon boot if configured
  if (process.env.MONGODB_URI) {
    console.log("[SERVER INIT] Initiating MongoDB connection setup...");
    await connectMongoDB();
  }

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-stack server running on http://localhost:${PORT}`);
  });
}

initServer();
