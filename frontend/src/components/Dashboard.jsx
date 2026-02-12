
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import BankingCard from "./Cards/BankingCard.jsx";


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = ({ transactions = [] }) => {

  const [selectedMonth, setSelectedMonth] = useState("All");

  const filteredTransactions =
    selectedMonth === "All"
      ? transactions
      : transactions.filter((t) =>
          t.date && t.date.includes(selectedMonth)
        );

  const totalBalance = filteredTransactions.reduce((a, t) => a + t.amount, 0);

  const totalIncome = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, Math.abs(totalExpense)],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  return (
    <div style={styles.container}>

      {/* Monthly Filter */}
      <div style={{ marginBottom: "20px" }}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.select}
        >
          <option value="All">All Months</option>
          <option value="01/">January</option>
          <option value="02/">February</option>
          <option value="03/">March</option>
          <option value="04/">April</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div style={styles.summaryGrid}>
        <SummaryCard title="Total Balance" value={`₹${totalBalance}`} />
        <SummaryCard title="Income" value={`₹${totalIncome}`} color="#22c55e" />
        <SummaryCard title="Expense" value={`₹${Math.abs(totalExpense)}`} color="#ef4444" />
      </div>

      {/* Chart Section */}
      <div style={styles.chartCard}>
        <h3>Income vs Expense</h3>
        <Bar data={chartData} />
      </div>

      {/* Linked Cards */}
      <h3 style={{ marginTop: "40px" }}>Linked Cards</h3>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <BankingCard />
        <BankingCard color="#0f3460" />
      </div>

      {/* Recent Transactions */}
      <h3 style={{ marginTop: "40px" }}>Recent Transactions</h3>
      <div style={styles.transactionBox}>
        {filteredTransactions.slice(0, 5).map((t) => (
          <div key={t.id} style={styles.transactionRow}>
            <div>
              <strong>{t.desc}</strong>
              <p style={{ fontSize: "12px", color: "gray" }}>{t.date}</p>
            </div>
            <span style={{
              color: t.amount > 0 ? "green" : "red",
              fontWeight: "bold"
            }}>
              ₹{t.amount}
            </span>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <h3 style={{ marginTop: "40px" }}>Notifications</h3>
      <div style={styles.notificationBox}>
        {totalExpense < -5000 && <p>⚠ High spending detected this month.</p>}
        {totalIncome > 10000 && <p>🎉 Great! Income above ₹10,000.</p>}
        <p>🔔 Stay updated with your transactions.</p>
      </div>

    </div>
  );
};

export default Dashboard;


/* Reusable Summary Card */
const SummaryCard = ({ title, value, color = "#4a6cf7" }) => (
  <div style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    flex: 1
  }}>
    <p style={{ fontSize: "14px", color: "gray" }}>{title}</p>
    <h2 style={{ margin: 0, color }}>{value}</h2>
  </div>
);


/* Styles */
const styles = {
  container: {
    padding: "40px",
    background: "#f5f6fa",
    minHeight: "100vh"
  },
  select: {
    padding: "8px",
    borderRadius: "6px"
  },
  summaryGrid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap"
  },
  chartCard: {
    marginTop: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },
  transactionBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },
  transactionRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },
  notificationBox: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  }
};
