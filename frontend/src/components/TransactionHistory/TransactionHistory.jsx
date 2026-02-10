import React from "react";
import "./TransactionHistory.css";

const TransactionHistory = () => {
  const transactions = [
    { id: 1, type: "Credit", amount: 5000, date: "01-02-2026" },
    { id: 2, type: "Debit", amount: 1200, date: "03-02-2026" },
    { id: 3, type: "Credit", amount: 8000, date: "05-02-2026" },
  ];

  return (
    <div className="transaction-container">
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.date} — {t.type} — ₹{t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
