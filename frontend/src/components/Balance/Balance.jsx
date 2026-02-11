const Balance = () => {
    const balance = 5880;
    const savings = 15000;
    const expenses = 9120;
  
    return (
      <div style={{ padding: "40px" }}>
        <h2 style={{ marginBottom: "25px" }}>Account Balance Overview</h2>
  
        {/* Main Balance Card */}
        <div
          style={{
            background: "linear-gradient(135deg,#6a11cb,#2575fc)",
            color: "white",
            padding: "40px",
            borderRadius: "20px",
            marginBottom: "30px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.2)"
          }}
        >
          <h3>Available Balance</h3>
          <h1 style={{ fontSize: "42px" }}>₹ {balance.toLocaleString()}</h1>
          <p style={{ opacity: 0.8 }}>+ Stable Growth This Month</p>
        </div>
  
        {/* Extra Info Cards */}
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={cardStyle}>
            <h4>Total Savings</h4>
            <h2 style={{ color: "green" }}>₹ {savings}</h2>
          </div>
  
          <div style={cardStyle}>
            <h4>Total Expenses</h4>
            <h2 style={{ color: "red" }}>₹ {expenses}</h2>
          </div>
        </div>
      </div>
    );
  };
  
  const cardStyle = {
    flex: 1,
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  };
  
  export default Balance;
  