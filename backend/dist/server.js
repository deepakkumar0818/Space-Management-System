"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("./routes/auth"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const spaces_1 = __importDefault(require("./routes/spaces"));
const User_1 = require("./models/User");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Basic health check
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// Versioned API
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/bookings", bookings_1.default);
app.use("/api/v1/spaces", spaces_1.default);
app.use((err, _req, res, _next) => {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});
const PORT = process.env.PORT || 4000;
// Prefer MONGO_URI from environment; fall back to provided MongoDB Atlas cluster
// Note: you can override this by creating a .env file with MONGO_URI=...
const MONGO_URI = process.env.MONGO_URI ||
    "mongodb+srv://dk0133964_db_user:mxczv42SXWTq3zZb@cluster0.qpgmy9s.mongodb.net/workspace-booking";
async function ensureDemoUsers() {
    const demoUsers = [
        {
            email: "demo.customer@workspace.com",
            password: "Password123!",
            name: "Demo Customer",
            role: "customer",
        },
        {
            email: "demo.admin@workspace.com",
            password: "Admin123!",
            name: "Demo Admin",
            role: "admin",
        },
        {
            email: "demo.staff@workspace.com",
            password: "Staff123!",
            name: "Demo Staff",
            role: "staff",
        },
    ];
    // eslint-disable-next-line no-console
    console.log("Ensuring demo users exist...");
    for (const demo of demoUsers) {
        const existing = await User_1.UserModel.findOne({ email: demo.email });
        const passwordHash = await bcryptjs_1.default.hash(demo.password, 10);
        if (existing) {
            // Ensure role and password are correct for demo accounts
            existing.role = demo.role;
            existing.passwordHash = passwordHash;
            await existing.save();
            // eslint-disable-next-line no-console
            console.log("Updated demo user:", demo.email, "role:", demo.role, "password:", demo.password);
            continue;
        }
        await User_1.UserModel.create({
            email: demo.email,
            passwordHash,
            name: demo.name,
            role: demo.role,
        });
        // eslint-disable-next-line no-console
        console.log("Created demo user:", demo.email, "role:", demo.role, "password:", demo.password);
    }
}
async function start() {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        // eslint-disable-next-line no-console
        console.log("Connected to MongoDB");
        await ensureDemoUsers();
        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`API server running on port ${PORT}`);
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to start server", error);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=server.js.map