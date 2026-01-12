import mongoose, { Document, Schema } from "mongoose";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "no_show";

export type PaymentStatus =
  | "unpaid"
  | "paid"
  | "refunded"
  | "partial_refund"
  | "failed";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  space?: mongoose.Types.ObjectId;
  location?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  plan: "hourly" | "daily" | "weekly" | "monthly";
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  currency: string;
  discountCode?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    space: { type: Schema.Types.ObjectId, ref: "Space" },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    plan: {
      type: String,
      enum: ["hourly", "daily", "weekly", "monthly"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no_show"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded", "partial_refund", "failed"],
      default: "unpaid",
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    discountCode: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const BookingModel =
  (mongoose.models.Booking as mongoose.Model<IBooking>) ||
  mongoose.model<IBooking>("Booking", BookingSchema);


