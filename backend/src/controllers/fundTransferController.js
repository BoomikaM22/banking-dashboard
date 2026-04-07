import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export const transferFunds = async (req, res) => {
  try {
    const { fromAccountId, toAccount, amount, note } = req.body;
    const acct = await Account.findOne({ id: fromAccountId });
    if (!acct) return res.status(404).json({ error: "Account not found" });
    if (acct.balance < Number(amount)) return res.status(400).json({ error: "Insufficient balance" });

    acct.balance -= Number(amount);
    await acct.save();

    const { v4: uuid } = require("uuid");
    const tx = new Transaction({
      id: uuid(),
      accountId: fromAccountId,
      desc: note || `Transfer to ${toAccount}`,
      amount: -Number(amount),
      date: new Date().toISOString().slice(0, 10),
      category: "Transfer",
      method: "NEFT"
    });
    await tx.save();

    res.json({ success: true, transaction: tx, newBalance: acct.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
