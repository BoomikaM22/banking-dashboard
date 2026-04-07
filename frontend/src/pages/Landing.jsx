import { useState } from "react";
import { Shield, Zap, Globe, TrendingUp, ArrowRight } from "lucide-react";
import AuthModal from "../components/AuthModal";

const SERVICES = [
  { icon: Shield, name: "Savings Account",  cat: "Accounts",   desc: "Competitive rates, zero fees" },
  { icon: TrendingUp, name: "Fixed Deposit", cat: "Deposits",  desc: "Guaranteed returns up to 8.5%" },
  { icon: Zap, name: "Personal Loan",        cat: "Loans",     desc: "Instant approval, low EMI" },
  { icon: Globe, name: "Wire Transfer",       cat: "Transfers", desc: "Send money globally, fast" },
];

export default function Landing({ onAuth }) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "DM Sans, sans-serif" }}>
      {/* Navbar */}
      <nav style={{ height: 64, background: "rgba(18,21,31,0.95)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 22, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Finova</span>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowAuth(true)} style={{ padding: "9px 20px", borderRadius: 10, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontWeight: 600, fontSize: 14 }}>Log In</button>
          <button onClick={() => setShowAuth(true)} style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 14 }}>Get Started</button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "100px 40px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translate(-50%, 0)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(108,99,255,0.12)", border: "1px solid rgba(108,99,255,0.25)", borderRadius: 20, padding: "6px 18px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24 }}>
            Trusted by 2 million customers
          </div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: "-1px" }}>
            Banking that works<br /><span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>for you</span>
          </h1>
          <p style={{ fontSize: 18, color: "var(--text2)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 36px" }}>
            Open an account in minutes. Manage everything from one sleek dashboard.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setShowAuth(true)} style={{ padding: "14px 32px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, var(--accent), #8b5cf6)", color: "#fff", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
              Open Account <ArrowRight size={16} />
            </button>
            <button onClick={() => setShowAuth(true)} style={{ padding: "14px 32px", borderRadius: 12, border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontWeight: 600, fontSize: 16 }}>
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ display: "flex", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {[["2M+", "Active Customers"], ["150+", "Branch Locations"], ["7.2%", "Savings Rate"], ["24/7", "Customer Support"]].map(([num, label]) => (
          <div key={label} style={{ flex: 1, textAlign: "center", padding: "28px 16px", borderRight: "1px solid var(--border)" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, background: "linear-gradient(135deg, var(--accent), var(--accent2))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
            <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Services */}
      <section style={{ padding: "80px 40px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 32, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>Everything you need</h2>
        <p style={{ color: "var(--text2)", textAlign: "center", marginBottom: 40 }}>A full suite of financial products in one place</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {SERVICES.map(({ icon: Icon, name, cat, desc }) => (
            <div key={name} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: "24px", transition: "all 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(108,99,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon size={20} color="var(--accent)" />
              </div>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{name}</div>
              <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 4 }}>{cat}</div>
              <div style={{ fontSize: 13, color: "var(--text2)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
