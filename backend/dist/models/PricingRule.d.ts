import mongoose, { Document } from "mongoose";
export type PlanType = "hourly" | "daily" | "weekly" | "monthly";
export interface IPricingRule extends Document {
    location?: mongoose.Types.ObjectId;
    space?: mongoose.Types.ObjectId;
    plan: PlanType;
    baseRate: number;
    currency: string;
    weekendMultiplier?: number;
    peakHourMultiplier?: number;
    holidayMultiplier?: number;
    active: boolean;
}
export declare const PricingRuleModel: mongoose.Model<IPricingRule, {}, {}, {}, mongoose.Document<unknown, {}, IPricingRule, {}, {}> & IPricingRule & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=PricingRule.d.ts.map