import { Bell, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const PAGE_TITLES = {
  "/": "Dashboard", "/transactions": "Transactions", "/cards": "Cards",
  "/balance": "Balance", "/bills": "Bill Payment", "/open-account": "Open Account",
  "/transfer": "Fund Transfer", "/search": "Search",
};

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header style={{
      height: 64, background: "var(--surface)", borderBottom: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px", position: "sticky", top: 0, zIndex: 100,
    }}>
      <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
        {PAGE_TITLES[location.pathname] || "Finova"}
      </h2>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => navigate("/search")} style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Search size={16} />
        </button>
        <button style={{ width: 38, height: 38, borderRadius: 10, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <Bell size={16} />
          <span style={{ position: "absolute", top: 8, right: 8, width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", border: "2px solid var(--surface)" }} />
        </button>
        {user && (
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#fff" }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </header>
  );
}
