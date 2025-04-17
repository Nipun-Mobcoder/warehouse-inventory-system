import mongoose, { Schema } from "mongoose";

interface IAisle {
  name: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  bins: mongoose.Types.ObjectId[];
}

const AisleSchema = new Schema<IAisle>({
  name: { type: String, required: true, unique: true },
  coordinates: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    z: { type: Number, required: true },
  },
  bins: [{ type: Schema.Types.ObjectId, ref: "Bin" }],
});

export default mongoose.model<IAisle>("Aisle", AisleSchema);
