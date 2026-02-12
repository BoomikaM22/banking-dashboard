import React from "react";

const BankingCard = ({
  cardHolder = "Boomika Murugan",
  cardNumber = "4532 8821 0092 8942",
  expiry = "12/28",
  balance = "5,240.00",
  brand = "VISA",
  color = "#1a1a1a"
}) => {

  const maskNumber = (num) => {
    return num.replace(/\d{4}(?= \d{4} \d{4})/g, "****");
  };

  return (
    <div
      style={{
        width: "320px",
        height: "190px",
        background: color,
        borderRadius: "20px",
        padding: "20px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "12px", opacity: 0.7 }}>Balance</p>
          <h2 style={{ margin: 0 }}>₹{balance}</h2>
        </div>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>
          {brand}
        </div>
      </div>

      <div>
        <p style={{ letterSpacing: "2px", fontSize: "16px" }}>
          {maskNumber(cardNumber)}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "10px", opacity: 0.6 }}>Card Holder</p>
          <p style={{ margin: 0 }}>{cardHolder}</p>
        </div>
        <div>
          <p style={{ fontSize: "10px", opacity: 0.6 }}>Expiry</p>
          <p style={{ margin: 0 }}>{expiry}</p>
        </div>
      </div>
    </div>
  );
};

export default BankingCard;
  
