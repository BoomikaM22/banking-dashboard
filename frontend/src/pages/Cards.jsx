import { useEffect, useState } from "react";
import { api } from "../api";
import { Wifi, CreditCard } from "lucide-react";

export default function Cards() {
  const [cards, setCards] = useState([]);
  useEffect(() => { api("/cards").then(setCards); }, []);

  return (
    <div className="page">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, marginBottom: 28 }}>
        {cards.map(card => (
          <div key={card.id} style={{ borderRadius: 20, padding: "28px 30px", background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", position: "relative", overflow: "hidden", minHeight: 190 }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ position: "absolute", bottom: -40, left: 40, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Finova Bank</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>{card.type}</div>
              </div>
              <Wifi size={22} color="rgba(255,255,255,0.7)" style={{ transform: "rotate(90deg)" }} />
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 17, letterSpacing: "0.15em", color: "rgba(255,255,255,0.9)", marginBottom: 20 }}>{card.number}</div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>EXPIRES</div>
                <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>{card.expiry}</div>
              </div>
              {card.limit && (
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 3 }}>CREDIT LIMIT</div>
                  <div style={{ fontSize: 14, color: "#fff", fontWeight: 600 }}>₹{card.limit.toLocaleString("en-IN")}</div>
                </div>
              )}
              <CreditCard size={28} color="rgba(255,255,255,0.2)" />
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "24px" }}>
        <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Card Controls</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {["Block Card", "Set Limit", "View PIN", "Card Statements"].map(action => (
            <button key={action} style={{ padding: "14px", borderRadius: 12, background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--text)", fontWeight: 500, fontSize: 14, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
