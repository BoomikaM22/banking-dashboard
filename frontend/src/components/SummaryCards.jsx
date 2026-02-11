const SummaryCards = () => {
    return (
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "30px"
      }}>
  
        <div style={{
          background: "#9cd85c",
          padding: "20px",
          borderRadius: "15px",
          flex: 1,
          color: "white"
        }}>
          <h3>Card Number</h3>
          <p>3829 4820 4629 5025</p>
        </div>
  
        <div style={{
          background: "#ff6b00",
          padding: "20px",
          borderRadius: "15px",
          flex: 1,
          color: "white"
        }}>
          <h3>Saving Status</h3>
          <p>4.28%</p>
        </div>
  
        <div style={{
          background: "#19b5d1",
          padding: "20px",
          borderRadius: "15px",
          flex: 1,
          color: "white"
        }}>
          <h3>Working Balance</h3>
          <p>₹ 9,25,000</p>
        </div>
  
      </div>
    );
  };
  
  export default SummaryCards;
  