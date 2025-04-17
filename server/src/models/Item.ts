import mongoose, { Schema } from "mongoose";

interface IItem {
  sku: string;
  name: string;
  bin: mongoose.Types.ObjectId;
  quantity: number;
  lastRestocked: Date;
}

const ItemSchema = new Schema<IItem>({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  bin: { type: Schema.Types.ObjectId, ref: "Bin", required: true },
  quantity: { type: Number, required: true },
  lastRestocked: { type: Date, default: Date.now },
});

export default mongoose.model<IItem>("Item", ItemSchema);
