import React, { useState } from "react";

export default function App() {
  const [accounts, setAccounts] = useState({
    SBI: 50000,
    Canara: 30000,
    Indian: 20000,
    HDFC: 70000
  });

  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = () => {
    if (!selectedBank) {
      setMessage("Please select a bank");
      return;
    }

    if (amount <= 0) {
      setMessage("Enter valid amount");
      return;
    }

    setAccounts({
      ...accounts,
      [selectedBank]: accounts[selectedBank] + Number(amount)
    });

    setMessage(`₹${amount} credited successfully to ${selectedBank}`);
    setAmount("");
  };

  return (
    <div style={styles.body}>
      <div style={styles.dashboard}>
        <h1 style={styles.heading}>Fintech Banking Dashboard</h1>

        {/* Accounts Section */}
        <div style={styles.card}>
          <h2>My Accounts</h2>
          {Object.keys(accounts).map((bank) => (
            <div
              key={bank}
              style={styles.bankItem}
              onClick={() => setSelectedBank(bank)}
            >
              {bank} Bank
            </div>
          ))}
        </div>

        {/* Account Details */}
        {selectedBank && (
          <div style={styles.card}>
            <h2>{selectedBank} Account</h2>
            <p>Available Balance: ₹{accounts[selectedBank]}</p>
          </div>
        )}

        {/* Fund Transfer */}
        <div style={styles.card}>
          <h2>Fund Transfer</h2>

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Bank</option>
            {Object.keys(accounts).map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>

          <button style={styles.button} onClick={handleTransfer}>
            Transfer
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    padding: "20px"
  },
  dashboard: {
    maxWidth: "800px",
    margin: "auto",
    fontFamily: "Arial"
  },
  heading: {
    textAlign: "center"
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  bankItem: {
    backgroundColor: "#e3eafc",
    padding: "10px",
    margin: "5px 0",
    cursor: "pointer",
    borderRadius: "5px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "10px"
  },
  button: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    backgroundColor: "#4a6cf7",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  message: {
    marginTop: "10px",
    fontWeight: "bold"
  }
};
