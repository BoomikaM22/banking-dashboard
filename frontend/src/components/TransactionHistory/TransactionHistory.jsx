import { useState } from "react";

const TransactionHistory = ({ transactions, deleteTransaction }) => {

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // 🔎 Filter Logic
  const filteredTransactions = transactions
    .filter((t) => {
      if (filter === "income") return t.amount > 0;
      if (filter === "expense") return t.amount < 0;
      return true;
    })
    .filter((t) =>
      t.desc.toLowerCase().includes(search.toLowerCase())
    );

  // 💰 Summary
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const net = totalIncome + totalExpense;

  return (
    <div style={container}>

      <h2>Transaction History</h2>

      {/* 🔥 Summary Section */}
      <div style={summaryBox}>
        <div style={{ color: "green" }}>
          Income: ₹{totalIncome}
        </div>
        <div style={{ color: "red" }}>
          Expense: ₹{Math.abs(totalExpense)}
        </div>
        <div>
          Net: ₹{net}
        </div>
      </div>

      {/* 🔍 Search + Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          style={inputStyle}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* 📋 Transaction List */}
      {filteredTransactions.map((t) => (
        <div key={t.id} style={transactionCard}>

          <div>
            <strong>{t.desc}</strong>
            <div style={{ fontSize: "12px", opacity: 0.6 }}>
              {t.date}
            </div>
          </div>

          <div style={{
            color: t.amount > 0 ? "green" : "red",
            fontWeight: "bold"
          }}>
            {t.amount > 0 ? "+" : "-"} ₹{Math.abs(t.amount)}
          </div>

          <button
            onClick={() => deleteTransaction(t.id)}
            style={deleteBtn}
          >
            ✕
          </button>
        </div>
      ))}

    </div>
  );
};

export default TransactionHistory;


/* 🔥 Styles */

const container = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  marginTop: "30px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const summaryBox = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
  fontWeight: "bold"
};

const transactionCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "12px",
  background: "#f7f7f7"
};

const inputStyle = {
  padding: "8px",
  marginRight: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "4px 8px",
  cursor: "pointer"
};
