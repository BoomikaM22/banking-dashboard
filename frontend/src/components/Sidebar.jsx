import { NavLink } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, History, CreditCard, Wallet, Receipt, UserPlus, Send, Search, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const items = [
  { name: "Dashboard",      path: "/",             icon: LayoutDashboard },
  { name: "Transactions",   path: "/transactions", icon: History },
  { name: "Cards",          path: "/cards",        icon: CreditCard },
  { name: "Balance",        path: "/balance",      icon: Wallet },
  { name: "Bill Payment",   path: "/bills",        icon: Receipt },
  { name: "Open Account",   path: "/open-account", icon: UserPlus },
  { name: "Fund Transfer",  path: "/transfer",     icon: Send },
  { name: "Search",         path: "/search",       icon: Search },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <aside style={{
      width: collapsed ? 72 : 240,
      minHeight: "100vh",
      background: "var(--surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: "width 0.3s ease",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "24px 0" : "24px 20px", textAlign: collapsed ? "center" : "left" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: collapsed ? 18 : 22, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", whiteSpace: "nowrap" }}>
          {collapsed ? "F" : "Finova"}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "0 8px", display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map(({ name, path, icon: Icon }) => (
          <NavLink key={path} to={path} end={path === "/"} style={({ isActive }) => ({
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 12px", borderRadius: 12,
            textDecoration: "none", color: isActive ? "#fff" : "var(--text2)",
            background: isActive ? "linear-gradient(135deg, var(--accent), #8b5cf6)" : "transparent",
            fontWeight: isActive ? 600 : 400, fontSize: 14,
            transition: "all 0.2s", whiteSpace: "nowrap",
            boxShadow: isActive ? "0 4px 15px rgba(108,99,255,0.3)" : "none",
          })}>
            <Icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "12px 8px", borderTop: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 4 }}>
        {user && !collapsed && (
          <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--surface2)", marginBottom: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "var(--text3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
          </div>
        )}
        {user && (
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: "none", border: "none", color: "var(--red)", fontSize: 14, fontWeight: 500, width: "100%", justifyContent: collapsed ? "center" : "flex-start" }}>
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {!collapsed && "Sign Out"}
          </button>
        )}
        <button onClick={() => setCollapsed(c => !c)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "9px 12px", borderRadius: 10, background: "none", border: "none", color: "var(--text3)", fontSize: 13 }}>
          {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /> Collapse</>}
        </button>
      </div>
    </aside>
  );
}
