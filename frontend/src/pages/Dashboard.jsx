import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import {
  TrendingUp, TrendingDown, Wallet, PiggyBank, Plus, Trash2,
  Send, Phone, Tv, Zap, Wifi, ShoppingBag, Gift, Fuel, MoreHorizontal,
  ChevronRight, Bell, Star, AlertTriangle, Sparkles, FileText,
  X, Download, Calendar, CreditCard, CheckCheck, Copy
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--text2)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={color} />
        </div>
      </div>
      <div style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--text)" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text3)" }}>{sub}</div>}
    </div>
  );
}

function QuickTransfer({ accounts, onDone }) {
  const [form, setForm] = useState({ fromAccountId: accounts[0]?.id || "", toAccount: "", amount: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      await api("/transfer", { method: "POST", body: form });
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onDone(); }, 1800);
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 9, padding: "10px 13px", color: "var(--text)", fontSize: 14, width: "100%" };

  if (success) return (
    <div style={{ textAlign: "center", padding: "24px 0" }}>
      <CheckCheck size={36} color="var(--green)" style={{ marginBottom: 10 }} />
      <div style={{ fontWeight: 700, color: "var(--green)", fontSize: 15 }}>Transfer Successful!</div>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <select style={{ ...inp, appearance: "none" }} value={form.fromAccountId} onChange={e => set("fromAccountId", e.target.value)}>
        {accounts.map(a => <option key={a.id} value={a.id}>{a.type} ({fmt(a.balance)})</option>)}
      </select>
      <input style={inp} placeholder="To account / UPI ID" required value={form.toAccount} onChange={e => set("toAccount", e.target.value)} />
      <div style={{ display: "flex", gap: 8 }}>
        <input style={{ ...inp, flex: 1 }} type="number" min="1" placeholder="Amount (₹)" required value={form.amount} onChange={e => set("amount", e.target.value)} />
        <input style={{ ...inp, flex: 1 }} placeholder="Note" value={form.note} onChange={e => set("note", e.target.value)} />
      </div>
      {error && <p style={{ color: "var(--red)", fontSize: 12 }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ padding: "11px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, var(--accent), #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        <Send size={14} />{loading ? "Sending…" : "Send Money"}
      </button>
    </form>
  );
}

function RechargeModal({ type, onClose, onDone }) {
  const OPS = { "Mobile": ["Jio","Airtel","Vi","BSNL"], "DTH": ["Tata Play","Dish TV","Sun Direct","Airtel DTH"], "Electricity": ["TNEB","BESCOM","MSEDCL","BSES"], "Broadband": ["Jio Fiber","ACT","Hathway","Airtel"], "Gas": ["Indane","HP Gas","Bharat Gas"], "Water": ["CMWSSB","BWSSB","HMWSSB"], "FASTag": ["Paytm","ICICI","HDFC","Axis"] };
  const [form, setForm] = useState({ number: "", amount: "", operator: (OPS[type]||["Other"])[0] });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await api("/recharge", { method: "POST", body: { type, ...form } }); setSuccess(true); setTimeout(() => { onClose(); onDone(); }, 1600); } catch {}
    setLoading(false);
  };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14, width: "100%" };
  const lbl = { display: "block", fontSize: 11, fontWeight: 700, color: "var(--text3)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(6px)" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, width: 380, padding: "28px", boxShadow: "0 25px 60px rgba(0,0,0,0.5)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", color: "var(--text2)", display: "flex" }}><X size={18} /></button>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{type} Recharge</div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 22 }}>Quick and secure payment</div>
        {success ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <CheckCheck size={44} color="var(--green)" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 700, color: "var(--green)", fontSize: 16 }}>Recharge Successful!</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={lbl}>Operator / Provider</label><select style={{ ...inp, appearance: "none" }} value={form.operator} onChange={e => set("operator", e.target.value)}>{(OPS[type]||["Other"]).map(op=><option key={op}>{op}</option>)}</select></div>
            <div><label style={lbl}>{type==="Mobile"?"Mobile Number":type==="Electricity"?"Consumer Number":type==="DTH"?"Subscriber ID":"Account / Number"}</label><input style={inp} required placeholder="Enter number" value={form.number} onChange={e => set("number", e.target.value)} maxLength={12} /></div>
            <div>
              <label style={lbl}>Amount (₹)</label>
              <input style={inp} type="number" min="1" required placeholder="Enter amount" value={form.amount} onChange={e => set("amount", e.target.value)} />
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {(type==="Mobile"?[99,199,299,399]:[200,500,1000,2000]).map(v=>(
                  <button key={v} type="button" onClick={()=>set("amount",String(v))} style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid var(--border)", background: form.amount==v?"var(--accent)":"var(--surface2)", color: form.amount==v?"#fff":"var(--text2)", fontSize: 12, fontWeight: 600 }}>₹{v}</button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ padding: "13px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--accent), #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 15, opacity: loading?0.7:1 }}>
              {loading ? "Processing…" : `Pay ₹${form.amount||"0"}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function StatementModal({ accounts, onClose }) {
  const [accId, setAccId] = useState(accounts[0]?.id||"");
  const [from, setFrom]   = useState("2026-01-01");
  const [to, setTo]       = useState(new Date().toISOString().slice(0,10));
  const [data, setData]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await api(`/accounts/${accId}/statement?from=${from}&to=${to}`);
    setData(res); setLoading(false);
  };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 9, padding: "9px 12px", color: "var(--text)", fontSize: 13, colorScheme: "dark" };

  const printStatement = () => {
    const w = window.open();
    w.document.write(`<pre style="font-family:monospace;padding:20px;font-size:13px">FINOVA BANK — ACCOUNT STATEMENT\n${"=".repeat(55)}\nAccount : ${data.account.type}\nNumber  : ${data.account.number}\nPeriod  : ${from} to ${to}\nBalance : ${fmt(data.account.balance)}\n${"─".repeat(55)}\nDate         Description                      Amount\n${"─".repeat(55)}\n${data.transactions.map(t=>`${t.date}  ${(t.desc||"").substring(0,32).padEnd(32)}${(t.amount>0?"+":"")+fmt(t.amount)}`).join("\n")}\n${"─".repeat(55)}\nTotal Credit : ${fmt(data.totalCredit)}\nTotal Debit  : ${fmt(data.totalDebit)}\nTransactions : ${data.count}</pre>`);
    w.print();
  };

  return (
    <div onClick={e=>e.target===e.currentTarget&&onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(6px)" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, width: 660, maxWidth: "95vw", maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><FileText size={16} color="var(--accent)" /><span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16 }}>Account Statement</span></div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text2)", display: "flex" }}><X size={18} /></button>
        </div>

        <div style={{ padding: "14px 24px", borderBottom: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
          <select style={{ ...inp, flex: "1 1 180px", appearance: "none" }} value={accId} onChange={e=>setAccId(e.target.value)}>
            {accounts.map(a=><option key={a.id} value={a.id}>{a.type} – {a.number}</option>)}
          </select>
          <input style={{ ...inp, flex: "0 0 130px" }} type="date" value={from} onChange={e=>setFrom(e.target.value)} />
          <span style={{ color: "var(--text3)", fontSize: 13 }}>to</span>
          <input style={{ ...inp, flex: "0 0 130px" }} type="date" value={to} onChange={e=>setTo(e.target.value)} />
          <button onClick={fetchData} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 13, flexShrink: 0 }}>{loading?"Loading…":"Fetch"}</button>
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {!data ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text3)" }}>
              <Calendar size={36} style={{ opacity: 0.2, marginBottom: 12 }} />
              <p style={{ fontSize: 14 }}>Select account and date range, then click Fetch</p>
            </div>
          ) : (
            <>
              <div style={{ padding: "14px 24px", background: "var(--surface2)", display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[["Account", data.account.type, "var(--text)"],["Number", data.account.number, "var(--text2)"],["Balance", fmt(data.account.balance),"var(--accent2)"],["Credit","+"+fmt(data.totalCredit),"var(--green)"],["Debit","-"+fmt(data.totalDebit),"var(--red)"],["Count", data.count+" txns","var(--text)"]].map(([lbl,val,clr])=>(
                  <div key={lbl}><div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lbl}</div><div style={{ fontSize: 13, fontWeight: 700, color: clr, fontFamily: lbl==="Number"?"monospace":"inherit" }}>{val}</div></div>
                ))}
              </div>
              <div style={{ padding: "0 24px 20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "88px 1fr 90px 90px", gap: 0, padding: "10px 0", borderBottom: "1px solid var(--border)", marginTop: 12 }}>
                  {["Date","Description","Method","Amount"].map(h=><span key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</span>)}
                </div>
                {data.transactions.length===0 ? <div style={{ textAlign:"center",padding:32,color:"var(--text3)",fontSize:14 }}>No transactions in this range.</div>
                : data.transactions.map((t,i)=>(
                  <div key={t.id} style={{ display: "grid", gridTemplateColumns: "88px 1fr 90px 90px", gap: 0, padding: "11px 0", borderBottom: i<data.transactions.length-1?"1px solid var(--border)":"none", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{t.date}</span>
                    <span style={{ fontSize: 13, color: "var(--text)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>{t.desc}</span>
                    <span style={{ fontSize: 12, color: "var(--text3)" }}>{t.method}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.amount>0?"var(--green)":"var(--red)" }}>{t.amount>0?"+":""}{fmt(t.amount)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {data && (
          <div style={{ padding: "12px 24px", borderTop: "1px solid var(--border)", display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={()=>{ const txt = data.transactions.map(t=>`${t.date}  ${t.desc}  ${t.method}  ${t.amount>0?"+":""}${fmt(t.amount)}`).join("\n"); navigator.clipboard.writeText(txt); setCopied(true); setTimeout(()=>setCopied(false),2000); }} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 9, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontSize: 13, fontWeight: 600 }}>
              {copied?<CheckCheck size={14} color="var(--green)"/>:<Copy size={14}/>}{copied?"Copied!":"Copy"}
            </button>
            <button onClick={printStatement} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 9, border: "none", background: "var(--accent)", color: "#fff", fontSize: 13, fontWeight: 600 }}>
              <Download size={14}/> Download / Print
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const BADGE_STYLES = {
  offer:  { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b", border: "rgba(245,158,11,0.25)" },
  alert:  { bg: "rgba(244,63,94,0.12)",   color: "#f43f5e", border: "rgba(244,63,94,0.25)" },
  reward: { bg: "rgba(139,92,246,0.12)",  color: "#8b5cf6", border: "rgba(139,92,246,0.25)" },
  new:    { bg: "rgba(34,211,238,0.12)",  color: "#22d3ee", border: "rgba(34,211,238,0.25)" },
};
const BADGE_ICONS = { offer: Star, alert: AlertTriangle, reward: Gift, new: Sparkles };

const QUICK_LINKS = [
  { label: "Send Money",   icon: Send,          color: "#6c63ff", modal: null,          route: "/transfer" },
  { label: "Mobile",       icon: Phone,         color: "#22d3ee", modal: "Mobile"                        },
  { label: "DTH",          icon: Tv,            color: "#f59e0b", modal: "DTH"                           },
  { label: "Electricity",  icon: Zap,           color: "#10b981", modal: "Electricity"                   },
  { label: "Broadband",    icon: Wifi,          color: "#8b5cf6", modal: "Broadband"                     },
  { label: "Gas",          icon: Fuel,          color: "#f97316", modal: "Gas"                           },
  { label: "Shopping",     icon: ShoppingBag,   color: "#ec4899", modal: null,          route: "/transactions" },
  { label: "More",         icon: MoreHorizontal,color: "#64748b", modal: null,          route: null       },
];

export default function Dashboard() {
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const [summary,      setSummary]      = useState(null);
  const [accounts,     setAccounts]     = useState([]);
  const [txns,         setTxns]         = useState([]);
  const [announcements,setAnnouncements]= useState([]);
  const [desc,         setDesc]         = useState("");
  const [amount,       setAmount]       = useState("");
  const [error,        setError]        = useState("");
  const [adding,       setAdding]       = useState(false);
  const [rechargeModal,setRechargeModal]= useState(null);
  const [showStatement,setShowStatement]= useState(false);
  const [dismissed,    setDismissed]    = useState([]);

  const load = async () => {
    const [s, t, a, ac] = await Promise.all([api("/summary"), api("/transactions"), api("/announcements"), api("/accounts")]);
    setSummary(s); setTxns(t.slice(0,6)); setAnnouncements(a); setAccounts(ac);
  };

  useEffect(() => { load(); }, []);

  const addTxn = async () => {
    if (!desc.trim()) return setError("Description required");
    if (!amount || isNaN(amount)) return setError("Valid amount required");
    setAdding(true); setError("");
    try { await api("/transactions", { method: "POST", body: { accountId: "acc1", desc, amount: Number(amount) } }); setDesc(""); setAmount(""); await load(); }
    catch (e) { setError(e.message); }
    setAdding(false);
  };

  const delTxn = async (id) => { await api(`/transactions/${id}`, { method: "DELETE" }); load(); };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 9, padding: "10px 13px", color: "var(--text)", fontSize: 14 };
  const visibleAnnc = announcements.filter(a => !dismissed.includes(a.id));
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Greeting */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 800 }}>Good {greeting}, {user?.name?.split(" ")[0]} 👋</h2>
          <p style={{ fontSize: 13, color: "var(--text3)", marginTop: 3 }}>Here's your financial overview for today</p>
        </div>
        <button onClick={()=>setShowStatement(true)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", fontWeight: 600, fontSize: 13 }}>
          <FileText size={14}/> Account Statement
        </button>
      </div>

      {/* Stats */}
      {summary && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          <StatCard icon={Wallet}       label="Total Balance" value={fmt(summary.totalBalance)} color="var(--accent)"   sub="Across all accounts"/>
          <StatCard icon={TrendingUp}   label="Total Income"  value={fmt(summary.income)}       color="var(--green)"   sub="All time"/>
          <StatCard icon={TrendingDown} label="Total Expense" value={fmt(summary.expense)}      color="var(--red)"     sub="All time"/>
          <StatCard icon={PiggyBank}    label="Savings Rate"  value={summary.savingsRate+"%"}   color="var(--accent2)" sub="Of income saved"/>
        </div>
      )}

      {/* Account Detail Cards */}
      {accounts.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 14 }}>
          {accounts.map((acct,idx) => (
            <div key={acct.id} style={{ background: idx===0?"linear-gradient(135deg,#1a0f40,#0d1a38)":"linear-gradient(135deg,#0a2015,#0d1a1a)", border: "1px solid var(--border)", borderRadius: 18, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 110, height: 110, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }}/>
              <div style={{ position: "absolute", bottom: -20, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }}/>
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{acct.type}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>{acct.number}</div>
                  </div>
                  <CreditCard size={20} color="rgba(255,255,255,0.2)"/>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 3 }}>{fmt(acct.balance)}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>Since {acct.createdAt}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={()=>setShowStatement(true)} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600 }}>
                    <FileText size={11}/> Statement
                  </button>
                  <button onClick={()=>navigate("/transfer")} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600 }}>
                    <Send size={11}/> Transfer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 22px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Quick Actions</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: 8 }}>
          {QUICK_LINKS.map(({ label, icon: Icon, color, modal, route }) => (
            <button key={label} onClick={()=>{ if(modal) setRechargeModal(modal); else if(route) navigate(route); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "14px 6px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--surface2)", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=color; e.currentTarget.style.background=color+"18"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.background="var(--surface2)"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: color+"20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} color={color}/>
              </div>
              <span style={{ fontSize: 11, color: "var(--text2)", fontWeight: 600, textAlign: "center", lineHeight: 1.2 }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2-col: Quick Transfer + Recent Transactions */}
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Send size={14} color="var(--accent)"/>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700 }}>Quick Transfer</span>
          </div>
          {accounts.length > 0 && <QuickTransfer accounts={accounts} onDone={load}/>}
        </div>

        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 15, fontWeight: 700 }}>Recent Transactions</span>
            <button onClick={()=>navigate("/transactions")} style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", color: "var(--accent)", fontSize: 12, fontWeight: 600 }}>View all <ChevronRight size={13}/></button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {txns.map(t => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", padding: "9px 6px", borderRadius: 9, gap: 12, transition: "background 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--surface2)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <div style={{ width: 32, height: 32, borderRadius: 8, background: t.amount>0?"rgba(16,185,129,0.15)":"rgba(244,63,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.amount>0?<TrendingUp size={13} color="var(--green)"/>:<TrendingDown size={13} color="var(--red)"/>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.desc}</div>
                  <div style={{ fontSize: 11, color: "var(--text3)" }}>{t.date} · {t.method}</div>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: t.amount>0?"var(--green)":"var(--red)", flexShrink: 0 }}>{t.amount>0?"+":""}{fmt(t.amount)}</div>
                <button onClick={()=>delTxn(t.id)} style={{ background: "none", border: "none", color: "var(--text3)", padding: 4, display: "flex", opacity: 0.5, flexShrink: 0 }}><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Transaction */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "18px 22px" }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Add Transaction</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input style={{ ...inp, flex: 1 }} placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}/>
          <input style={{ ...inp, width: 190 }} type="number" placeholder="Amount (+income / -expense)" value={amount} onChange={e=>setAmount(e.target.value)}/>
          <button onClick={addTxn} disabled={adding} style={{ padding: "10px 18px", borderRadius: 9, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 5 }}>
            <Plus size={15}/>{adding?"Adding…":"Add"}
          </button>
        </div>
        {error && <p style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>{error}</p>}
      </div>

      {/* Announcements */}
      {visibleAnnc.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Bell size={14} color="var(--accent)"/>
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 14, fontWeight: 700 }}>Bank Announcements</span>
            <span style={{ fontSize: 11, background: "var(--accent)", color: "#fff", borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>{visibleAnnc.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
            {visibleAnnc.map(a => {
              const st = BADGE_STYLES[a.type]||BADGE_STYLES.new;
              const Icon = BADGE_ICONS[a.type]||Bell;
              return (
                <div key={a.id} style={{ background: "var(--surface)", border: `1px solid ${st.border}`, borderRadius: 14, padding: "18px", position: "relative", transition: "transform 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
                >
                  <button onClick={()=>setDismissed(d=>[...d,a.id])} style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: "var(--text3)", display: "flex", opacity: 0.6 }}><X size={14}/></button>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: st.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={13} color={st.color}/></div>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", color: st.color, background: st.bg, padding: "3px 8px", borderRadius: 20 }}>{a.badge}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)", marginBottom: 5, lineHeight: 1.4 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.6 }}>{a.body}</div>
                  <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 8 }}>{a.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {rechargeModal && <RechargeModal type={rechargeModal} onClose={()=>setRechargeModal(null)} onDone={load}/>}
      {showStatement  && <StatementModal accounts={accounts} onClose={()=>setShowStatement(false)}/>}
    </div>
  );
}
