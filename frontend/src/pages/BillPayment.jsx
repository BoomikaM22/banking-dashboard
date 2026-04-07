import { useEffect, useState } from "react";
import { api } from "../api";
import { CheckCircle, Clock, Zap, Wifi, Phone, Droplets } from "lucide-react";

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

const ICONS = { Electricity: Zap, Internet: Wifi, "Mobile Recharge": Phone, "Water Bill": Droplets };

export default function BillPayment() {
  const [bills, setBills]   = useState([]);
  const [paying, setPaying] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => { api("/bills").then(setBills); }, []);

  const pay = async (id) => {
    setPaying(id);
    try {
      await api(`/bills/${id}/pay`, { method: "POST" });
      setBills(b => b.map(x => x.id === id ? { ...x, status: "paid" } : x));
      setSuccess(id);
      setTimeout(() => setSuccess(null), 2500);
    } catch (e) { alert(e.message); }
    setPaying(null);
  };

  const pending = bills.filter(b => b.status === "pending");
  const paid    = bills.filter(b => b.status === "paid");

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Pending</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--yellow)" }}>
            {fmt(pending.reduce((s, b) => s + b.amount, 0))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{pending.length} bills due</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Paid This Month</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--green)" }}>
            {fmt(paid.reduce((s, b) => s + b.amount, 0))}
          </div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>{paid.length} bills paid</div>
        </div>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 24px" }}>
          <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Bills</div>
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text)" }}>{bills.length}</div>
          <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 4 }}>registered billers</div>
        </div>
      </div>

      {/* Bill list */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px" }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Your Bills</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {bills.map(b => {
            const Icon = ICONS[b.name] || Zap;
            const isPaid = b.status === "paid";
            const isSuccess = success === b.id;
            return (
              <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: "var(--surface2)", borderRadius: 14, border: `1px solid ${isPaid ? "rgba(16,185,129,0.2)" : "var(--border)"}`, transition: "all 0.3s" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: isPaid ? "rgba(16,185,129,0.15)" : "rgba(108,99,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={isPaid ? "var(--green)" : "var(--accent)"} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{b.provider} · Due {b.dueDate}</div>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text)", marginRight: 16 }}>{fmt(b.amount)}</div>
                {isPaid ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--green)", fontSize: 13, fontWeight: 600 }}>
                    <CheckCircle size={15} /> Paid
                  </div>
                ) : (
                  <button onClick={() => pay(b.id)} disabled={paying === b.id} style={{ padding: "9px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 13, display: "flex", alignItems: "center", gap: 6, transition: "opacity 0.2s", opacity: paying === b.id ? 0.6 : 1 }}>
                    <Clock size={13} /> {paying === b.id ? "Paying…" : "Pay Now"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
