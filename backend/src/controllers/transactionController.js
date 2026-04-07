import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export const getTransactions = async (req, res) => {
  try {
    let { search } = req.query;
    let result = await Transaction.find();
    result.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t => t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { accountId, desc, amount, category, method } = req.body;
    const { v4: uuid } = require("uuid");
    const tx = new Transaction({
      id: uuid(),
      accountId,
      desc,
      amount: Number(amount),
      date: new Date().toISOString().slice(0, 10),
      category: category || (Number(amount) > 0 ? "Income" : "Expense"),
      method: method || "UPI"
    });
    await tx.save();

    // Update account balance
    const acct = await Account.findOne({ id: accountId });
    if (acct) {
      acct.balance += tx.amount;
      await acct.save();
    }

    res.status(201).json(tx);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const tx = await Transaction.findOneAndDelete({ id: req.params.id });
    if (!tx) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
