const LatestTransactions = ({ transactions, deleteTransaction }) => {
  return (
    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      marginTop: "40px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
    }}>
      <h3>Latest Transactions</h3>

      {transactions.map((t) => (
        <div key={t.id} style={rowStyle}>
          <span>{t.desc}</span>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{
              color: t.amount > 0 ? "green" : "red",
              fontWeight: "bold"
            }}>
              {t.amount > 0 ? "+" : ""}₹{t.amount.toLocaleString()}
            </span>

            <button
              onClick={() => deleteTransaction(t.id)}
              style={deleteBtn}
            >
              ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #eee"
};

const deleteBtn = {
  background: "red",
  color: "white",
  border: "none",
  padding: "5px 8px",
  borderRadius: "5px",
  cursor: "pointer"
};

export default LatestTransactions;
