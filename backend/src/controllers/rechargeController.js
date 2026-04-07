import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export const recharge = async (req, res) => {
  try {
    const { type, number, amount, operator } = req.body;
    const { v4: uuid } = require("uuid");
    const tx = new Transaction({
      id: uuid(),
      accountId: "acc1",
      desc: `${type} Recharge – ${operator} (${number})`,
      amount: -Number(amount),
      date: new Date().toISOString().slice(0, 10),
      category: "Bills",
      method: "UPI"
    });
    await tx.save();

    const acct = await Account.findOne({ id: "acc1" });
    if (acct) {
      acct.balance -= Number(amount);
      await acct.save();
    }

    res.json({ success: true, transaction: tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
