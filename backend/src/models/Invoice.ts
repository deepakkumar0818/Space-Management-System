import mongoose, { Document, Schema } from "mongoose";

export interface IInvoice extends Document {
  booking: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  invoiceNumber: string;
  amount: number;
  taxAmount: number;
  currency: string;
  gstPercentage: number;
  status: "draft" | "issued" | "paid" | "cancelled";
  issuedAt: Date;
  paidAt?: Date;
  zohoId?: string; // external Zoho invoice id
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    gstPercentage: { type: Number, default: 18 },
    status: {
      type: String,
      enum: ["draft", "issued", "paid", "cancelled"],
      default: "draft",
    },
    issuedAt: { type: Date, required: true },
    paidAt: { type: Date },
    zohoId: { type: String },
  },
  { timestamps: true }
);

export const InvoiceModel =
  (mongoose.models.Invoice as mongoose.Model<IInvoice>) ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);


