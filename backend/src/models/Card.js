import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  number: { type: String, required: true },
  expiry: { type: String, required: true },
  limit: { type: Number },
  color: { type: String, required: true }
});

export default mongoose.model("Card", CardSchema);
