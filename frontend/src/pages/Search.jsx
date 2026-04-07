import { useState } from "react";
import { api } from "../api";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

const fmt = (n) => "₹" + Math.abs(n).toLocaleString("en-IN");

export default function SearchPage() {
  const [query, setQuery]   = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async (q) => {
    if (!q.trim()) return;
    setLoading(true); setSearched(true);
    const data = await api(`/transactions?search=${encodeURIComponent(q)}`);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="page" style={{ maxWidth: 700 }}>
      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: 24 }}>
        <Search size={18} color="var(--text3)" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
        <input
          style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "15px 16px 15px 46px", color: "var(--text)", fontSize: 16, transition: "border-color 0.2s, box-shadow 0.2s" }}
          placeholder="Search transactions by description or category…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && search(query)}
          onFocus={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.15)"; }}
          onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
          autoFocus
        />
        <button onClick={() => search(query)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", padding: "8px 18px", borderRadius: 10, border: "none", background: "var(--accent)", color: "#fff", fontWeight: 600, fontSize: 14 }}>
          Search
        </button>
      </div>

      {/* Quick filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["Income", "Shopping", "Bills", "Food", "Transport", "Investment"].map(cat => (
          <button key={cat} onClick={() => { setQuery(cat); search(cat); }} style={{ padding: "7px 14px", borderRadius: 20, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text2)", fontSize: 13, fontWeight: 500, transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text2)"; }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading && <div style={{ color: "var(--text3)", textAlign: "center", padding: 40 }}>Searching…</div>}

      {!loading && searched && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", fontSize: 13, color: "var(--text3)", fontWeight: 600 }}>
            {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
          </div>

          {results.length === 0 ? (
            <div style={{ padding: "48px 20px", textAlign: "center", color: "var(--text3)" }}>No transactions found.</div>
          ) : (
            results.map((t, i) => (
              <div key={t.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 20px", borderBottom: i < results.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ width: 36, height: 36, borderRadius: 9, background: t.amount > 0 ? "rgba(16,185,129,0.12)" : "rgba(244,63,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {t.amount > 0 ? <TrendingUp size={15} color="var(--green)" /> : <TrendingDown size={15} color="var(--red)" />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{t.desc}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)" }}>{t.date} · {t.category} · {t.method}</div>
                </div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: t.amount > 0 ? "var(--green)" : "var(--red)" }}>
                  {t.amount > 0 ? "+" : ""}{fmt(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!searched && (
        <div style={{ textAlign: "center", color: "var(--text3)", padding: "60px 20px" }}>
          <Search size={40} style={{ opacity: 0.2, marginBottom: 14 }} />
          <p style={{ fontSize: 14 }}>Search by description, category, or amount</p>
        </div>
      )}
    </div>
  );
}
