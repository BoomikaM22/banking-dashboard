import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true, enum: ["pending", "paid"] }
});

export default mongoose.model("Bill", BillSchema);
