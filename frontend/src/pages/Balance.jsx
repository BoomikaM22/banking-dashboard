import { useEffect, useState } from "react";
import { api } from "../api";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function Balance() {
  const [summary, setSummary] = useState(null);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    Promise.all([api("/summary"), api("/accounts")]).then(([s, a]) => {
      setSummary(s);
      setAccounts(a);
    });
  }, []);

  if (!summary) return <div style={{ color: "var(--text2)", padding: 40 }}>Loading…</div>;

  const netFlow = summary.income - summary.expense;

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Main balance card */}
      <div style={{ background: "linear-gradient(135deg, #1a1040, #0f0a2e)", border: "1px solid var(--border)", borderRadius: 20, padding: "36px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(108,99,255,0.15)" }} />
        <div style={{ position: "absolute", bottom: -40, left: 60, width: 140, height: 140, borderRadius: "50%", background: "rgba(34,211,238,0.08)" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Total Portfolio Balance</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 44, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{fmt(summary.totalBalance)}</div>
          <div style={{ fontSize: 13, color: netFlow >= 0 ? "var(--green)" : "var(--red)", fontWeight: 600 }}>
            {netFlow >= 0 ? "▲" : "▼"} Net flow: {fmt(netFlow)}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { icon: TrendingUp,   label: "Total Income",  value: fmt(summary.income),  color: "var(--green)" },
          { icon: TrendingDown, label: "Total Expense", value: fmt(summary.expense), color: "var(--red)" },
          { icon: PiggyBank,    label: "Savings Rate",  value: summary.savingsRate + "%", color: "var(--accent2)" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "22px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color={color} />
              </div>
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{label}</span>
            </div>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Account-wise */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px" }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Account Breakdown</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {accounts.map(a => {
            const pct = summary.totalBalance > 0 ? (a.balance / summary.totalBalance) * 100 : 0;
            return (
              <div key={a.id} style={{ background: "var(--surface2)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{a.type}</div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2, fontFamily: "monospace" }}>{a.number}</div>
                  </div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--accent2)" }}>{fmt(a.balance)}</div>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: "var(--border)" }}>
                  <div style={{ height: "100%", borderRadius: 3, width: pct + "%", background: "linear-gradient(90deg, var(--accent), var(--accent2))", transition: "width 0.6s ease" }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 5 }}>{pct.toFixed(1)}% of total</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
