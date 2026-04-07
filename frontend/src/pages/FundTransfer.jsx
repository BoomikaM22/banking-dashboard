import { useEffect, useState } from "react";
import { api } from "../api";
import { Send, CheckCircle } from "lucide-react";

const fmt = (n) => "₹" + n.toLocaleString("en-IN");

export default function FundTransfer() {
  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({ fromAccountId: "", toAccount: "", amount: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    api("/accounts").then(a => { setAccounts(a); setForm(f => ({ ...f, fromAccountId: a[0]?.id || "" })); });
  }, []);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const res = await api("/transfer", { method: "POST", body: form });
      setSuccess(res);
      setForm(f => ({ ...f, toAccount: "", amount: "", note: "" }));
      api("/accounts").then(setAccounts);
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", color: "var(--text)", fontSize: 14, width: "100%", transition: "border-color 0.2s" };
  const lbl = { display: "block", fontSize: 12, fontWeight: 600, color: "var(--text2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" };

  return (
    <div className="page" style={{ maxWidth: 600 }}>
      {success && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 14, padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <CheckCircle size={20} color="var(--green)" />
          <div>
            <div style={{ fontWeight: 600, color: "var(--green)", fontSize: 14 }}>Transfer Successful!</div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>New balance: {fmt(success.newBalance)}</div>
          </div>
          <button onClick={() => setSuccess(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text3)", fontSize: 18 }}>×</button>
        </div>
      )}

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px 30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(108,99,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Send size={18} color="var(--accent)" />
          </div>
          <div>
            <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 18, fontWeight: 700 }}>Fund Transfer</h3>
            <p style={{ fontSize: 12, color: "var(--text3)" }}>NEFT / IMPS / UPI</p>
          </div>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div>
            <label style={lbl}>From Account</label>
            <select name="fromAccountId" style={{ ...inp, appearance: "none" }} value={form.fromAccountId} onChange={handle} required>
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.type} — {a.number} ({fmt(a.balance)})</option>
              ))}
            </select>
          </div>

          <div>
            <label style={lbl}>To Account / UPI ID</label>
            <input name="toAccount" style={inp} placeholder="Account number or UPI ID" required value={form.toAccount} onChange={handle} />
          </div>

          <div>
            <label style={lbl}>Amount (₹)</label>
            <input name="amount" type="number" min="1" style={inp} placeholder="Enter amount" required value={form.amount} onChange={handle} />
          </div>

          <div>
            <label style={lbl}>Note (optional)</label>
            <input name="note" style={inp} placeholder="Add a note" value={form.note} onChange={handle} />
          </div>

          {error && <p style={{ color: "var(--red)", fontSize: 13, background: "rgba(244,63,94,0.08)", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ padding: "14px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--accent), #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.7 : 1 }}>
            <Send size={16} />{loading ? "Processing…" : "Send Money"}
          </button>
        </form>
      </div>

      {/* Quick tips */}
      <div style={{ marginTop: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "18px 22px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Transfer Limits</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[["NEFT", "No limit", "2-3 hours"], ["IMPS", "₹5,00,000/day", "Instant"], ["UPI", "₹1,00,000/day", "Instant"]].map(([type, limit, time]) => (
            <div key={type} style={{ display: "flex", gap: 12, fontSize: 13 }}>
              <span style={{ color: "var(--accent)", fontWeight: 600, width: 42 }}>{type}</span>
              <span style={{ color: "var(--text2)", flex: 1 }}>{limit}</span>
              <span style={{ color: "var(--text3)" }}>{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
