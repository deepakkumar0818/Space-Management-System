import mongoose, { Document } from "mongoose";
export type SpaceType = "desk" | "meeting_room" | "private_office" | "open_area";
export interface ILocation extends Document {
    name: string;
    address: string;
    city: string;
    country: string;
    timezone: string;
    photos: string[];
    amenities: string[];
    workingHours: {
        dayOfWeek: number;
        open: string;
        close: string;
        isClosed: boolean;
    }[];
}
export interface ISpace extends Document {
    location: mongoose.Types.ObjectId;
    name: string;
    type: SpaceType;
    floor?: string;
    capacity: number;
    amenities: string[];
    isActive: boolean;
}
export declare const LocationModel: mongoose.Model<ILocation, {}, {}, {}, mongoose.Document<unknown, {}, ILocation, {}, {}> & ILocation & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export declare const SpaceModel: mongoose.Model<ISpace, {}, {}, {}, mongoose.Document<unknown, {}, ISpace, {}, {}> & ISpace & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Space.d.ts.map