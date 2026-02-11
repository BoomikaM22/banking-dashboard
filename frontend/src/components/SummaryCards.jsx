const SummaryCards = ({ balance }) => {
    return (
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "20px"
      }}>
        <div style={cardStyle("#a8e063")}>
          <h3>Card Number</h3>
          <p>3829 4820 4629 5025</p>
        </div>
  
        <div style={cardStyle("#ff6a00")}>
          <h3>Saving Status</h3>
          <p>4.28%</p>
        </div>
  
        <div style={cardStyle("#00c6ff")}>
          <h3>Working Balance</h3>
          <p>₹ {balance.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  