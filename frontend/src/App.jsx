import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import SummaryCards from "./components/SummaryCards.jsx";
import LatestTransactions from "./components/LatestTransactions.jsx";
import Analytics from "./components/Analytics.jsx";

function App() {

  // 🔥 Load from LocalStorage
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [
      { id: 1, desc: "Salary", amount: 12000 },
      { id: 2, desc: "Payment Sent", amount: -560 },
      { id: 3, desc: "Macbook Purchase", amount: -5560 }
    ];
  });

  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  // 🔥 Save to LocalStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const balance = transactions.reduce(
    (total, t) => total + t.amount,
    0
  );

  const addTransaction = () => {
    if (!desc || !amount) return;

    const newTransaction = {
      id: Date.now(),
      desc,
      amount: Number(amount)
    };

    setTransactions([newTransaction, ...transactions]);
    setDesc("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div style={{ display: "flex", background: "#f5f6fa" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ padding: "40px 60px" }}>

          <SummaryCards balance={balance} />

          <div style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            marginTop: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
          }}>
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

            <button onClick={addTransaction}>
              Add
            </button>
          </div>

          <Analytics />

          <LatestTransactions 
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />

        </div>
      </div>
    </div>
  );
}

export default App;
