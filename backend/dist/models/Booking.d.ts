import mongoose, { Document } from "mongoose";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
export type PaymentStatus = "unpaid" | "paid" | "refunded" | "partial_refund" | "failed";
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
export declare const BookingModel: mongoose.Model<IBooking, {}, {}, {}, mongoose.Document<unknown, {}, IBooking, {}, {}> & IBooking & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Booking.d.ts.map