const Navbar = () => {
    return (
      <div
        style={{
          padding: "20px 30px",
          background: "linear-gradient(to right, #5f2c82, #49a09d)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.2)"
        }}
      >
        <h2>Banking Dashboard</h2>
  
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <input
            type="text"
            placeholder="Search..."
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              outline: "none"
            }}
          />
  
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "white",
              color: "#5f2c82",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold"
            }}
          >
            B
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  