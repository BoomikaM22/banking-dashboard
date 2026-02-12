import { useState } from "react";

const BillPayment = () => {

  const [billType, setBillType] = useState("Electricity");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = () => {
    if (!accountNumber || !amount) {
      alert("Please fill all fields");
      return;
    }

    setSuccess(true);

    // Reset form
    setAccountNumber("");
    setAmount("");

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div style={container}>
      <h2>Bill Payment</h2>

      <div style={card}>

        <label>Bill Type</label>
        <select
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          style={input}
        >
          <option>Electricity</option>
          <option>Water</option>
          <option>Internet</option>
          <option>Mobile Recharge</option>
        </select>

        <label>Account / Consumer Number</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          style={input}
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={input}
        />

        <button style={button} onClick={handlePayment}>
          Pay Now
        </button>

        {success && (
          <div style={successBox}>
            ✅ Payment Successful!
          </div>
        )}

      </div>
    </div>
  );
};

export default BillPayment;


/* 🔥 Styles */

const container = {
  padding: "40px"
};

const card = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const input = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

const button = {
  background: "linear-gradient(135deg,#6a11cb,#2575fc)",
  color: "white",
  padding: "12px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};

const successBox = {
  marginTop: "15px",
  padding: "10px",
  background: "#d4edda",
  color: "green",
  borderRadius: "8px",
  textAlign: "center"
};
