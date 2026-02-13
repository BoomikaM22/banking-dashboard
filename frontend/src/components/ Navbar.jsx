import { useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  const s = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: dark
        ? "#0f172a"
        : "linear-gradient(135deg,#5f2c82,#49a09d)",
      color: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    },
    right: { display: "flex", gap: 15, alignItems: "center" },
    input: {
      padding: "6px 12px",
      borderRadius: 8,
      border: "none",
      outline: "none",
    },
    icon: { cursor: "pointer", fontSize: 18 },
    profile: {
      width: 35,
      height: 35,
      borderRadius: "50%",
      background: "white",
      color: "#5f2c82",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      cursor: "pointer",
    },
    dropdown: {
      position: "absolute",
      right: 30,
      top: 60,
      background: "#fff",
      color: "#000",
      borderRadius: 10,
      padding: 10,
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    },
  };

  return (
    <>
      <div style={s.nav}>
        <div style={{ fontWeight: "bold", fontSize: 18 }}>
          🏦 MyBank
        </div>

        <div style={s.right}>
          <input placeholder="Search services..." style={s.input} />

          <span style={s.icon}>🔔</span>

          <span style={s.icon} onClick={() => setDark(!dark)}>
            {dark ? "🌙" : "☀️"}
          </span>

          <div style={s.profile} onClick={() => setOpen(!open)}>
            B
          </div>
        </div>
      </div>

      {open && (
        <div style={s.dropdown}>
          <div>Profile</div>
          <div>Settings</div>
          <div>Logout</div>
        </div>
      )}
    </>
  );
}
