import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Receipt,
  UserPlus,
  Send,
  Search,
  History
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Transactions", path: "/transactions", icon: <History size={20} /> },
    { name: "Cards", path: "/cards", icon: <CreditCard size={20} /> },
    { name: "Balance", path: "/balance", icon: <Wallet size={20} /> },
    { name: "Bill Payment", path: "/billpayment", icon: <Receipt size={20} /> },
    { name: "Create Account", path: "/createaccount", icon: <UserPlus size={20} /> },
    { name: "Fund Transfer", path: "/fundtransfer", icon: <Send size={20} /> },
    { name: "Search", path: "/search", icon: <Search size={20} /> }
  ];

  return (
    <div
      style={{
        width: collapsed ? "85px" : "260px",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        color: "white",
        minHeight: "100vh",
        padding: "30px 15px",
        transition: "all 0.4s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "6px 0 30px rgba(0,0,0,0.5)"
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "55px",
          textAlign: collapsed ? "center" : "left",
          paddingLeft: collapsed ? "0" : "10px",
          letterSpacing: "1px",
          background: "linear-gradient(90deg,#22d3ee,#6366f1)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transition: "0.3s ease"
        }}
      >
        {collapsed ? "💳" : "Finova Bank"}
      </div>

      {/* Menu */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "13px 15px",
              borderRadius: "14px",
              textDecoration: "none",
              color: "#cbd5e1",
              position: "relative",
              transition: "all 0.3s ease"
            }}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>

      {/* Collapse */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginTop: "auto",
          padding: "18px",
          cursor: "pointer",
          textAlign: "center",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          color: "#94a3b8",
          transition: "0.3s ease"
        }}
        className="collapse-btn"
      >
        {collapsed ? "➡" : "⬅ Collapse"}
      </div>

      {/* Animations */}
      <style>
        {`
          .sidebar-link:hover {
            background: rgba(255,255,255,0.08);
            transform: translateX(8px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.4);
          }

          .sidebar-link.active {
            background: linear-gradient(90deg,#0ea5e9,#6366f1);
            color: white !important;
            box-shadow: 0 6px 20px rgba(99,102,241,0.5);
          }

          .sidebar-link::before {
            content: "";
            position: absolute;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 0%;
            background: #22d3ee;
            border-radius: 4px;
            transition: 0.3s ease;
          }

          .sidebar-link.active::before {
            height: 60%;
          }

          .collapse-btn:hover {
            color: #22d3ee;
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
