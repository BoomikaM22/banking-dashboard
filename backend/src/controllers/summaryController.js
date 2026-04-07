import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export const getSummary = async (req, res) => {
  try {
    const accounts = await Account.find();
    const transactions = await Transaction.find();

    const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
    const income = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const savingsRate = income > 0 ? (((income - expense) / income) * 100).toFixed(1) : 0;

    res.json({ totalBalance, income, expense, savingsRate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
