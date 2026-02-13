import { useState, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Balance from "./components/Balance/Balance.jsx";
import LatestTransactions from "./components/LatestTransactions.jsx";
import Analytics from "./components/Analytics.jsx";
import Dashboard from "./components/Dashboard";
import Accounts from "./components/Accounts/Accounts.jsx";
import BillPayment from "./components/BillPayment/BillPayment.jsx";
import Cards from "./components/Cards/Cards.jsx";
import CreateAccount from "./components/CreateAccount/CreateAccount.jsx";
import FundTransfer from "./components/FundTransfer/FundTransfer.jsx";
import Search from "./components/Search/Search.jsx";
import TransactionHistory from "./components/TransactionHistory/TransactionHistory.jsx";

function App() {

  const [transactions, setTransactions] = useState([
    { id: 1, desc: "Salary", amount: 12000, date: "01/02/2026" },
    { id: 2, desc: "Payment Sent", amount: -560, date: "02/02/2026" },
    { id: 3, desc: "Macbook Purchase", amount: -5560, date: "03/02/2026" },
    { id: 4, desc: "Freelance Payment", amount: 8500, date: "05/02/2026" },
    { id: 5, desc: "Electricity Bill", amount: -1200, date: "06/02/2026" },
    { id: 6, desc: "Amazon Shopping", amount: -3400, date: "08/02/2026" },
    { id: 7, desc: "Petrol Expense", amount: -1500, date: "10/02/2026" },
    { id: 8, desc: "Restaurant Dinner", amount: -2200, date: "11/02/2026" },
    { id: 9, desc: "Mutual Fund Investment", amount: -5000, date: "12/02/2026" },
    { id: 10, desc: "Bonus Credit", amount: 20000, date: "15/02/2026" }
  ]);

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const balance = useMemo(
    () => transactions.reduce((total, t) => total + t.amount, 0),
    [transactions]
  );

  const totalIncome = useMemo(
    () => transactions.filter(t => t.amount > 0)
      .reduce((a, t) => a + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () => transactions.filter(t => t.amount < 0)
      .reduce((a, t) => a + t.amount, 0),
    [transactions]
  );

  const addTransaction = () => {
    if (!desc.trim()) return setError("Description required");
    if (!amount || isNaN(amount)) return setError("Valid amount required");

    const newTransaction = {
      id: Date.now(),
      desc,
      amount: Number(amount),
      date: new Date().toLocaleDateString("en-GB"),
      category: Number(amount) > 0 ? "Income" : "Expense",
      method: Number(amount) > 0 ? "Bank Transfer" : "UPI"
    };

    setTransactions([newTransaction, ...transactions]);
    setDesc("");
    setAmount("");
    setError("");
  };

  const deleteTransaction = (id) =>
    setTransactions(transactions.filter((t) => t.id !== id));

  const clearAll = () => {
    if (window.confirm("Delete all transactions?")) {
      localStorage.removeItem("transactions");
      setTransactions([]);
    }
  };

  return (
    <div style={{ display: "flex", background: "#f5f6fa" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ padding: "40px 60px" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Dashboard transactions={transactions} />

                  <div
                    style={{
                      background: "white",
                      padding: "25px",
                      borderRadius: "20px",
                      marginTop: "30px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
                    }}
                  >
                    <h3>Add Transaction</h3>

                    <input
                      type="text"
                      placeholder="Description"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      style={{ marginRight: "10px", padding: "10px" }}
                    />

                    <input
                      type="number"
                      placeholder="Amount (+income / -expense)"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{ marginRight: "10px", padding: "10px" }}
                    />

                    <button onClick={addTransaction}>Add</button>

                    {error && (
                      <p style={{ color: "red", marginTop: "10px" }}>
                        {error}
                      </p>
                    )}

                    <div style={{ marginTop: "20px" }}>
                      <strong>Total Transactions:</strong> {transactions.length}
                    </div>

                    <button
                      onClick={clearAll}
                      style={{
                        marginTop: "15px",
                        background: "red",
                        color: "white",
                        padding: "8px 12px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Clear All
                    </button>
                  </div>

                  <Analytics />

                  <LatestTransactions
                    transactions={transactions}
                    deleteTransaction={deleteTransaction}
                  />
                </>
              }
            />

            <Route path="/accounts" element={<Accounts />} />

            <Route
              path="/balance"
              element={
                <Balance
                  balance={balance}
                  totalIncome={totalIncome}
                  totalExpense={totalExpense}
                  transactions={transactions}
                />
              }
            />

            <Route
              path="/billpayment"
              element={
                <BillPayment
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              }
            />

            <Route path="/cards" element={<Cards />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/fundtransfer" element={<FundTransfer />} />
            <Route path="/search" element={<Search transactions={transactions} />} />

            <Route
              path="/transactions"
              element={
                <TransactionHistory
                  transactions={transactions}
                  deleteTransaction={deleteTransaction}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
