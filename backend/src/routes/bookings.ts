import { Router, Response } from "express";
import mongoose from "mongoose";
import { AuthenticatedRequest, authMiddleware, requireRole } from "../middleware/auth";
import { BookingModel } from "../models/Booking";

const router = Router();

// Create booking (user portal)
router.post(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { startTime, endTime, plan, amount, currency, metadata } = req.body;

      if (!startTime || !endTime || !plan || typeof amount !== "number") {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userId = req.user!.sub;
      
      // Convert string ID to ObjectId to ensure proper storage
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const booking = await BookingModel.create({
        user: new mongoose.Types.ObjectId(userId),
        startTime,
        endTime,
        plan,
        amount,
        currency: currency ?? "INR",
        metadata,
      });

      return res.status(201).json(booking);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return res.status(500).json({ message: "Failed to create booking" });
    }
  }
);

// List bookings for current user
router.get(
  "/me",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user!.sub;
      
      // Convert string ID to ObjectId to ensure proper matching
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const bookings = await BookingModel.find({ user: userObjectId })
        .populate("space")
        .populate("location")
        .sort({ startTime: -1 });
      
      return res.json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      return res.status(500).json({ message: "Failed to fetch bookings" });
    }
  }
);

// Admin: list all bookings (for orders/calendar views)
router.get(
  "/",
  authMiddleware,
  requireRole(["admin", "manager"]),
  async (_req: AuthenticatedRequest, res: Response) => {
    const bookings = await BookingModel.find()
      .populate("user")
      .sort({ startTime: -1 });
    return res.json(bookings);
  }
);

// Admin: bookings in a date range for calendar / heatmap
router.get(
  "/range",
  authMiddleware,
  requireRole(["admin", "manager"]),
  async (req: AuthenticatedRequest, res: Response) => {
    const { start, end } = req.query;

    if (!start || !end || typeof start !== "string" || typeof end !== "string") {
      return res.status(400).json({ message: "start and end query params are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const bookings = await BookingModel.find({
      startTime: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .select("startTime plan metadata")
      .lean();

    return res.json(bookings);
  }
);

export default router;


