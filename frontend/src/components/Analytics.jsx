const Analytics = () => {
    return (
      <div style={{
        display: "flex",
        gap: "20px",
        marginTop: "30px"
      }}>
  
        <div style={cardStyle}>
          <h4>Spending</h4>
          <div style={barsContainer}>
            <div style={bar(40)}></div>
            <div style={bar(60)}></div>
            <div style={bar(30)}></div>
            <div style={bar(80)}></div>
            <div style={bar(50)}></div>
          </div>
        </div>
  
        <div style={cardStyle}>
          <h4>Savings</h4>
          <div style={barsContainer}>
            <div style={bar(20)}></div>
            <div style={bar(70)}></div>
            <div style={bar(45)}></div>
            <div style={bar(60)}></div>
            <div style={bar(35)}></div>
          </div>
        </div>
  
      </div>
    );
  };
  
  const cardStyle = {
    flex: 1,
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  };
  
  const barsContainer = {
    display: "flex",
    alignItems: "flex-end",
    gap: "10px",
    height: "120px",
    marginTop: "15px"
  };
  
  const bar = (height) => ({
    width: "20px",
    height: `${height}px`,
    background: "#5f2c82",
    borderRadius: "5px"
  });
  
  export default Analytics;
  