import { useState } from "react";
import { X } from "lucide-react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: "arun@example.com", password: "password123" });
  const [regForm, setRegForm]   = useState({ name: "", email: "", password: "", confirm: "" });

  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const data = await api("/login", { method: "POST", body: loginForm });
      login(data.user, data.token);
      onClose();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setError(""); 
    if (regForm.password !== regForm.confirm) return setError("Passwords do not match");
    setLoading(true);
    try {
      const data = await api("/register", { method: "POST", body: { name: regForm.name, email: regForm.email, password: regForm.password } });
      login(data.user, data.token);
      onClose();
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const inp = { background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14, width: "100%" };
  const lbl = { display: "block", fontSize: 12, fontWeight: 600, color: "var(--text2)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" };

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, backdropFilter: "blur(6px)" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, width: 400, maxWidth: "95vw", padding: "32px", position: "relative", boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "var(--text2)", display: "flex" }}>
          <X size={20} />
        </button>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "var(--surface2)", borderRadius: 12, padding: 4 }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => { setTab(t); setError(""); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", background: tab === t ? "var(--accent)" : "transparent", color: tab === t ? "#fff" : "var(--text2)", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>
              {t === "login" ? "Log In" : "Register"}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={lbl}>Email</label><input style={inp} type="email" required value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} /></div>
            <div><label style={lbl}>Password</label><input style={inp} type="password" required value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} /></div>
            {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
            <Btn loading={loading}>Sign In</Btn>
            <p style={{ fontSize: 12, color: "var(--text3)", textAlign: "center" }}>Demo: arun@example.com / password123</p>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div><label style={lbl}>Full Name</label><input style={inp} required value={regForm.name} onChange={e => setRegForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div><label style={lbl}>Email</label><input style={inp} type="email" required value={regForm.email} onChange={e => setRegForm(p => ({ ...p, email: e.target.value }))} /></div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}><label style={lbl}>Password</label><input style={inp} type="password" required value={regForm.password} onChange={e => setRegForm(p => ({ ...p, password: e.target.value }))} /></div>
              <div style={{ flex: 1 }}><label style={lbl}>Confirm</label><input style={inp} type="password" required value={regForm.confirm} onChange={e => setRegForm(p => ({ ...p, confirm: e.target.value }))} /></div>
            </div>
            {error && <p style={{ color: "var(--red)", fontSize: 13 }}>{error}</p>}
            <Btn loading={loading}>Create Account</Btn>
          </form>
        )}
      </div>
    </div>
  );
}

function Btn({ children, loading }) {
  return (
    <button type="submit" disabled={loading} style={{ padding: "13px", background: "linear-gradient(135deg, var(--accent), #8b5cf6)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
      {loading ? "Please wait…" : children}
    </button>
  );
}
