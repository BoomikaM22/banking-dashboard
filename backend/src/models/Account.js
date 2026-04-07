import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  number: { type: String, required: true, unique: true },
  balance: { type: Number, required: true, default: 0 },
  createdAt: { type: String, required: true }
});

export default mongoose.model("Account", AccountSchema);
