import "./TransactionHistory.css";

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="transaction-card">
      <h2>Transaction History</h2>

      {transactions.map((t) => (
        <div key={t.id} className="transaction-row">
          <span>{t.desc}</span>
          <span className={t.type === "Credit" ? "credit" : "debit"}>
            {t.type === "Credit" ? "+" : "-"}₹{t.amount}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
