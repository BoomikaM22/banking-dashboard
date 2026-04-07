import Account from "../models/Account.js";

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAccount = async (req, res) => {
  try {
    const { userId, type, initialDeposit } = req.body;
    const { v4: uuid } = require("uuid");
    const num = "FNVA" + String(Math.floor(Math.random() * 9000000000) + 1000000000);
    const acct = new Account({
      id: uuid(),
      userId,
      type,
      number: num,
      balance: Number(initialDeposit) || 0,
      createdAt: new Date().toISOString().slice(0, 10)
    });
    await acct.save();
    res.status(201).json(acct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAccountStatement = async (req, res) => {
  try {
    const acct = await Account.findOne({ id: req.params.id });
    if (!acct) return res.status(404).json({ error: "Account not found" });

    let { from, to } = req.query;
    // Will use Transaction model - will be imported when needed
    const Transaction = require("../models/Transaction.js").default;
    let txns = await Transaction.find({ accountId: req.params.id });

    if (from) txns = txns.filter(t => t.date >= from);
    if (to) txns = txns.filter(t => t.date <= to);

    txns.sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalCredit = txns.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const totalDebit = txns.filter(t => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

    res.json({
      account: acct,
      transactions: txns,
      totalCredit,
      totalDebit,
      count: txns.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
