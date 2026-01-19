import mongoose, { Document } from "mongoose";
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
    zohoId?: string;
}
export declare const InvoiceModel: mongoose.Model<IInvoice, {}, {}, {}, mongoose.Document<unknown, {}, IInvoice, {}, {}> & IInvoice & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Invoice.d.ts.map