import "./Balance.css";

const Balance = ({ balance }) => {
  return (
    <div className="balance-card">
      <h2>Available Balance</h2>
      <p className="amount">₹ {balance}</p>
    </div>
  );
};

export default Balance;
