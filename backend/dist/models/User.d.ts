import mongoose, { Document } from "mongoose";
export type UserRole = "admin" | "manager" | "staff" | "customer";
export interface IUser extends Document {
    email: string;
    passwordHash: string;
    name: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserModel: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map