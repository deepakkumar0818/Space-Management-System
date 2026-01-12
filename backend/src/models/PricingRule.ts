import mongoose, { Document, Schema } from "mongoose";

export type PlanType = "hourly" | "daily" | "weekly" | "monthly";

export interface IPricingRule extends Document {
  location?: mongoose.Types.ObjectId;
  space?: mongoose.Types.ObjectId;
  plan: PlanType;
  baseRate: number;
  currency: string;
  // Dynamic conditions
  weekendMultiplier?: number;
  peakHourMultiplier?: number;
  holidayMultiplier?: number;
  active: boolean;
}

const PricingRuleSchema = new Schema<IPricingRule>(
  {
    location: { type: Schema.Types.ObjectId, ref: "Location" },
    space: { type: Schema.Types.ObjectId, ref: "Space" },
    plan: {
      type: String,
      enum: ["hourly", "daily", "weekly", "monthly"],
      required: true,
    },
    baseRate: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    weekendMultiplier: { type: Number },
    peakHourMultiplier: { type: Number },
    holidayMultiplier: { type: Number },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PricingRuleModel =
  (mongoose.models.PricingRule as mongoose.Model<IPricingRule>) ||
  mongoose.model<IPricingRule>("PricingRule", PricingRuleSchema);


