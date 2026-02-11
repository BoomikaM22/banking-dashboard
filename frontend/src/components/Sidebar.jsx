const Sidebar = () => {
    return (
      <div
        style={{
          width: "230px",
          background: "linear-gradient(to bottom, #1f1c2c, #928dab)",
          color: "white",
          padding: "30px 20px",
          minHeight: "100vh",
          boxShadow: "5px 0 20px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>Super Finti</h2>
  
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={menuItem}>Dashboard</li>
          <li style={menuItem}>Transactions</li>
          <li style={menuItem}>Cards</li>
          <li style={menuItem}>Settings</li>
        </ul>
      </div>
    );
  };
  
  const menuItem = {
    margin: "20px 0",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s"
  };
  
  export default Sidebar;
  