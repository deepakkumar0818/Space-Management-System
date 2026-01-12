import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/auth";
import bookingRoutes from "./routes/bookings";
import spaceRoutes from "./routes/spaces";
import { UserModel } from "./models/User";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// Basic health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Versioned API
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/spaces", spaceRoutes);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
// Prefer MONGO_URI from environment; fall back to provided MongoDB Atlas cluster
// Note: you can override this by creating a .env file with MONGO_URI=...
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://dk0133964_db_user:mxczv42SXWTq3zZb@cluster0.qpgmy9s.mongodb.net/workspace-booking";

async function ensureDemoUsers() {
  const demoUsers = [
    {
      email: "demo.customer@workspace.com",
      password: "Password123!",
      name: "Demo Customer",
      role: "customer" as const,
    },
    {
      email: "demo.admin@workspace.com",
      password: "Admin123!",
      name: "Demo Admin",
      role: "admin" as const,
    },
    {
      email: "demo.staff@workspace.com",
      password: "Staff123!",
      name: "Demo Staff",
      role: "staff" as const,
    },
  ];

  // eslint-disable-next-line no-console
  console.log("Ensuring demo users exist...");

  for (const demo of demoUsers) {
    const existing = await UserModel.findOne({ email: demo.email });
    const passwordHash = await bcrypt.hash(demo.password, 10);

    if (existing) {
      // Ensure role and password are correct for demo accounts
      existing.role = demo.role;
      existing.passwordHash = passwordHash;
      await existing.save();
      // eslint-disable-next-line no-console
      console.log(
        "Updated demo user:",
        demo.email,
        "role:",
        demo.role,
        "password:",
        demo.password
      );
      continue;
    }

    await UserModel.create({
      email: demo.email,
      passwordHash,
      name: demo.name,
      role: demo.role,
    });
    // eslint-disable-next-line no-console
    console.log(
      "Created demo user:",
      demo.email,
      "role:",
      demo.role,
      "password:",
      demo.password
    );
  }
}

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    // eslint-disable-next-line no-console
    console.log("Connected to MongoDB");

    await ensureDemoUsers();

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`API server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", error);
    process.exit(1);
  }
}

start();

