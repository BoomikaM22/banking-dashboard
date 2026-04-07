import Bill from "../models/Bill.js";
import Transaction from "../models/Transaction.js";
import Account from "../models/Account.js";

export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const payBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ id: req.params.id });
    if (!bill) return res.status(404).json({ error: "Bill not found" });

    bill.status = "paid";
    await bill.save();

    const { v4: uuid } = require("uuid");
    const tx = new Transaction({
      id: uuid(),
      accountId: "acc1",
      desc: `${bill.name} - ${bill.provider}`,
      amount: -bill.amount,
      date: new Date().toISOString().slice(0, 10),
      category: "Bills",
      method: "UPI"
    });
    await tx.save();

    // Update account balance (assuming acc1 exists)
    const acct = await Account.findOne({ id: "acc1" });
    if (acct) {
      acct.balance -= bill.amount;
      await acct.save();
    }

    res.json({ success: true, bill, transaction: tx });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
