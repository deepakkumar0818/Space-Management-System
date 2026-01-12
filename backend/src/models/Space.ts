import mongoose, { Document, Schema } from "mongoose";

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
    dayOfWeek: number; // 0-6
    open: string; // "09:00"
    close: string; // "18:00"
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

const WorkingHoursSchema = new Schema<ILocation["workingHours"][number]>(
  {
    dayOfWeek: { type: Number, required: true },
    open: { type: String, required: true },
    close: { type: String, required: true },
    isClosed: { type: Boolean, default: false },
  },
  { _id: false }
);

const LocationSchema = new Schema<ILocation>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    timezone: { type: String, required: true },
    photos: [{ type: String }],
    amenities: [{ type: String }],
    workingHours: [WorkingHoursSchema],
  },
  { timestamps: true }
);

const SpaceSchema = new Schema<ISpace>(
  {
    location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["desk", "meeting_room", "private_office", "open_area"],
      required: true,
    },
    floor: { type: String },
    capacity: { type: Number, default: 1 },
    amenities: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const LocationModel =
  (mongoose.models.Location as mongoose.Model<ILocation>) ||
  mongoose.model<ILocation>("Location", LocationSchema);

export const SpaceModel =
  (mongoose.models.Space as mongoose.Model<ISpace>) ||
  mongoose.model<ISpace>("Space", SpaceSchema);


