"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../middleware/auth");
const Booking_1 = require("../models/Booking");
const router = (0, express_1.Router)();
// Create booking (user portal)
router.post("/", auth_1.authMiddleware, async (req, res) => {
    try {
        const { startTime, endTime, plan, amount, currency, metadata } = req.body;
        if (!startTime || !endTime || !plan || typeof amount !== "number") {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const userId = req.user.sub;
        // Convert string ID to ObjectId to ensure proper storage
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const booking = await Booking_1.BookingModel.create({
            user: new mongoose_1.default.Types.ObjectId(userId),
            startTime,
            endTime,
            plan,
            amount,
            currency: currency ?? "INR",
            metadata,
        });
        return res.status(201).json(booking);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return res.status(500).json({ message: "Failed to create booking" });
    }
});
// List bookings for current user
router.get("/me", auth_1.authMiddleware, async (req, res) => {
    try {
        const userId = req.user.sub;
        // Convert string ID to ObjectId to ensure proper matching
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const userObjectId = new mongoose_1.default.Types.ObjectId(userId);
        const bookings = await Booking_1.BookingModel.find({ user: userObjectId })
            .populate("space")
            .populate("location")
            .sort({ startTime: -1 });
        return res.json(bookings);
    }
    catch (error) {
        console.error("Error fetching user bookings:", error);
        return res.status(500).json({ message: "Failed to fetch bookings" });
    }
});
// Admin: list all bookings (for orders/calendar views)
router.get("/", auth_1.authMiddleware, (0, auth_1.requireRole)(["admin", "manager"]), async (_req, res) => {
    const bookings = await Booking_1.BookingModel.find()
        .populate("user")
        .sort({ startTime: -1 });
    return res.json(bookings);
});
// Admin: bookings in a date range for calendar / heatmap
router.get("/range", auth_1.authMiddleware, (0, auth_1.requireRole)(["admin", "manager"]), async (req, res) => {
    const { start, end } = req.query;
    if (!start || !end || typeof start !== "string" || typeof end !== "string") {
        return res.status(400).json({ message: "start and end query params are required" });
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const bookings = await Booking_1.BookingModel.find({
        startTime: {
            $gte: startDate,
            $lte: endDate,
        },
    })
        .select("startTime plan metadata")
        .lean();
    return res.json(bookings);
});
exports.default = router;
//# sourceMappingURL=bookings.js.map