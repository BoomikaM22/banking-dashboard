import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaCreditCard,
  FaWallet,
  FaFileInvoiceDollar,
  FaUserPlus,
  FaMoneyBillWave,
  FaSearch,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      ...sidebarStyle,
      width: collapsed ? "80px" : "230px",
      transition: "0.4s"
    }}>

      {/* Toggle Button */}
      <div style={{ marginBottom: "30px", cursor: "pointer" }}>
        <FaBars onClick={() => setCollapsed(!collapsed)} />
      </div>

      {/* Profile Section */}
      {!collapsed && (
        <div style={profileSection}>
          <div style={avatar}>B</div>
          <div>
            <h4 style={{ margin: 0 }}>Boomika</h4>
            <small>Premium User</small>
          </div>
        </div>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>

        <MenuItem collapsed={collapsed} to="/" icon={<FaTachometerAlt />} text="Dashboard" />
        <MenuItem collapsed={collapsed} to="/transactions" icon={<FaExchangeAlt />} text="Transactions" />
        <MenuItem collapsed={collapsed} to="/cards" icon={<FaCreditCard />} text="Cards" />
        <MenuItem collapsed={collapsed} to="/balance" icon={<FaWallet />} text="Balance" />
        <MenuItem collapsed={collapsed} to="/billpayment" icon={<FaFileInvoiceDollar />} text="Bill Payment" />
        <MenuItem collapsed={collapsed} to="/createaccount" icon={<FaUserPlus />} text="Create Account" />
        <MenuItem collapsed={collapsed} to="/fundtransfer" icon={<FaMoneyBillWave />} text="Fund Transfer" />
        <MenuItem collapsed={collapsed} to="/search" icon={<FaSearch />} text="Search" />

      </ul>

      {/* Floating Logout */}
      <div style={logoutSection}>
        <FaSignOutAlt />
        {!collapsed && <span style={{ marginLeft: "10px" }}>Logout</span>}
      </div>

    </div>
  );
};

const MenuItem = ({ to, icon, text, collapsed }) => {
  return (
    <li style={{ margin: "18px 0" }}>
      <NavLink
        to={to}
        style={({ isActive }) => ({
          textDecoration: "none",
          color: isActive ? "#00f5d4" : "white",
          fontWeight: isActive ? "bold" : "normal",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "10px 15px",
          borderRadius: "10px",
          background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
          transition: "0.3s",
        })}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = "0 0 15px #00f5d4";
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = "none";
        }}
      >
        {icon}
        {!collapsed && text}
      </NavLink>
    </li>
  );
};

const sidebarStyle = {
  background: "linear-gradient(to bottom, #1f1c2c, #928dab)",
  color: "white",
  padding: "30px 20px",
  minHeight: "100vh",
  boxShadow: "5px 0 20px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const profileSection = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "30px"
};

const avatar = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#00f5d4",
  color: "#1f1c2c",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold"
};

const logoutSection = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: "15px",
  borderTop: "1px solid rgba(255,255,255,0.2)"
};

export default Sidebar;
