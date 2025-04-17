import mongoose, { Schema } from "mongoose";

interface IBin {
  code: string;
  aisle: mongoose.Types.ObjectId;
  capacity: number;
  currentItems: number;
  location: {
    section: string;
    level: number;
  };
}

const BinSchema = new Schema<IBin>({
  code: { type: String, required: true, unique: true },
  aisle: { type: Schema.Types.ObjectId, ref: "Aisle", required: true },
  capacity: { type: Number, required: true },
  currentItems: { type: Number, default: 0 },
  location: {
    section: { type: String, required: true },
    level: { type: Number, required: true },
  },
});

export default mongoose.model<IBin>("Bin", BinSchema);
