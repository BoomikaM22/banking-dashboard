import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  accountId: { type: String, required: true },
  desc: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  method: { type: String, required: true }
});

export default mongoose.model("Transaction", TransactionSchema);
