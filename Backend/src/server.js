import express from "express";
import path from "path";

import { ENV } from "./lib/env.js";

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(cors());
app.use(express.json());

/* -------------------- Fix __dirname (ESM) -------------------- */
const __dirname = path.resolve();

/* -------------------- Health Check -------------------- */
app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});
app.get("/books", (req, res) => {
  res.status(200).json({ msg: "this is books section" });
});

/* -------------------- API Routes -------------------- */
// app.use("/api/auth", authRoutes);
// app.use("/api/rooms", roomRoutes);
// (add your routes here)

/* -------------------- Serve Frontend in Production -------------------- */
if (ENV.NODE_ENV === "production") {
  app.use(
    express.static(path.join(__dirname, "../frontend/dist"))
  );

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend", "dist", "index.html")
    );
  });
}

/* -------------------- Start Server -------------------- */
app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});
