import { useEffect, useState } from "react";
import { api } from "../api";
import { TrendingUp, TrendingDown, Trash2 } from "lucide-react";

const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");

const CAT_COLORS = {
  Income: "var(--green)", Shopping: "#f59e0b", Bills: "var(--accent)", Food: "#f97316",
  Transport: "var(--accent2)", Investment: "#a78bfa", Transfer: "var(--text2)", Expense: "var(--red)",
};

export default function Transactions() {
  const [txns, setTxns]   = useState([]);
  const [filter, setFilter] = useState("all");

  const load = async () => {
    const data = await api("/transactions");
    setTxns(data);
  };

  useEffect(() => { load(); }, []);

  const del = async (id) => { await api(`/transactions/${id}`, { method: "DELETE" }); load(); };

  const filtered = filter === "all" ? txns : txns.filter(t => (filter === "income" ? t.amount > 0 : t.amount < 0));

  return (
    <div className="page">
      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["all", "income", "expense"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 10, border: "1px solid var(--border)", background: filter === f ? "var(--accent)" : "var(--surface)", color: filter === f ? "#fff" : "var(--text2)", fontWeight: 600, fontSize: 13, textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontFamily: "Syne, sans-serif", fontSize: 13, color: "var(--text3)", display: "flex", alignItems: "center" }}>
          {filtered.length} transactions
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 110px 90px 36px", gap: 0, borderBottom: "1px solid var(--border)", padding: "12px 20px" }}>
          {["Description", "Category", "Date", "Amount", ""].map((h, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>
          ))}
        </div>

        {filtered.map((t, i) => (
          <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 110px 90px 36px", gap: 0, padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: t.amount > 0 ? "rgba(16,185,129,0.12)" : "rgba(244,63,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {t.amount > 0 ? <TrendingUp size={14} color="var(--green)" /> : <TrendingDown size={14} color="var(--red)" />}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{t.desc}</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{t.method}</div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: CAT_COLORS[t.category] || "var(--text2)", background: (CAT_COLORS[t.category] || "var(--text2)") + "18", padding: "4px 10px", borderRadius: 20, width: "fit-content" }}>{t.category}</span>
            <span style={{ fontSize: 13, color: "var(--text2)" }}>{t.date}</span>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 14, color: t.amount > 0 ? "var(--green)" : "var(--red)" }}>
              {t.amount > 0 ? "+" : ""}{fmt(t.amount)}
            </span>
            <button onClick={() => del(t.id)} style={{ background: "none", border: "none", color: "var(--text3)", display: "flex", padding: 6, borderRadius: 6 }}>
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
