import { useMemo } from "react";

export default function Balance({ balance, totalIncome, totalExpense, transactions }) {

  const savingsGoal = 20000;

  const progress = useMemo(() => {
    if (balance <= 0) return 0;
    return Math.min((balance / savingsGoal) * 100, 100);
  }, [balance]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

      {/* Main Balance Card */}
      <div style={{
        background: "linear-gradient(135deg, #6d28d9, #2563eb)",
        padding: "30px",
        borderRadius: "20px",
        color: "white",
        boxShadow: "0 15px 40px rgba(0,0,0,0.15)"
      }}>
        <h3>Available Balance</h3>
        <h1>₹ {balance.toLocaleString()}</h1>
        <p>✔ Account Status: Active</p>
      </div>

      {/* Income & Expense */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={cardStyle}>
          <h4>Total Income</h4>
          <h2 style={{ color: "#16a34a" }}>
            ₹ {totalIncome.toLocaleString()}
          </h2>
        </div>

        <div style={cardStyle}>
          <h4>Total Expenses</h4>
          <h2 style={{ color: "#dc2626" }}>
            ₹ {Math.abs(totalExpense).toLocaleString()}
          </h2>
        </div>
      </div>

      {/* Savings Goal */}
      <div style={cardStyle}>
        <h4>Savings Goal: ₹ {savingsGoal.toLocaleString()}</h4>

        <div style={{
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "10px",
          marginTop: "10px"
        }}>
          <div style={{
            width: `${progress}%`,
            height: "100%",
            background: "#22c55e",
            borderRadius: "10px",
            transition: "0.5s"
          }} />
        </div>

        <p style={{ marginTop: "10px" }}>
          {progress.toFixed(0)}% Completed
        </p>
      </div>

      {/* Recent Transactions */}
      <div style={cardStyle}>
        <h4>Recent Transactions</h4>

        {transactions.slice(0, 5).map((t) => (
          <div key={t.id} style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px"
          }}>
            <span>{t.desc}</span>
            <span style={{
              color: t.amount > 0 ? "#16a34a" : "#dc2626"
            }}>
              ₹ {t.amount}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  flex: 1
};
