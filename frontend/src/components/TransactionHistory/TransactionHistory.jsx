import { useState, useMemo } from "react";

export default function TransactionHistory({ transactions = [] }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortType, setSortType] = useState("Latest");
  const [selectedTxn, setSelectedTxn] = useState(null);

  /* ---------------- FILTER + SEARCH ---------------- */

  const filtered = useMemo(() => {
    let data = transactions.filter((t) =>
      t.desc.toLowerCase().includes(search.toLowerCase())
    );

    if (filterType === "Income") {
      data = data.filter((t) => t.amount > 0);
    }

    if (filterType === "Expense") {
      data = data.filter((t) => t.amount < 0);
    }

    if (sortType === "Highest") {
      data.sort((a, b) => b.amount - a.amount);
    } else if (sortType === "Lowest") {
      data.sort((a, b) => a.amount - b.amount);
    } else {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [transactions, search, filterType, sortType]);

  /* ---------------- SUMMARY ---------------- */

  const totalIncome = filtered
    .filter((t) => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);

  const totalExpense = filtered
    .filter((t) => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);

  /* ---------------- EXPORT CSV ---------------- */

  const exportCSV = () => {
    const csv =
      "Date,Description,Amount\n" +
      filtered.map((t) => `${t.date},${t.desc},${t.amount}`).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transaction History</h2>

      {/* SUMMARY */}
      <div style={styles.summary}>
        <div style={styles.card}>
          <p>Total Income</p>
          <h3 style={{ color: "#16a34a" }}>₹{totalIncome}</h3>
        </div>
        <div style={styles.card}>
          <p>Total Expense</p>
          <h3 style={{ color: "#dc2626" }}>₹{Math.abs(totalExpense)}</h3>
        </div>
      </div>

      {/* CONTROLS */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={styles.select}>
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select value={sortType} onChange={(e) => setSortType(e.target.value)} style={styles.select}>
          <option>Latest</option>
          <option>Highest</option>
          <option>Lowest</option>
        </select>

        <button onClick={exportCSV} style={styles.exportBtn}>
          Download CSV
        </button>
      </div>

      {/* LIST */}
      <div style={styles.table}>
        {filtered.map((t) => (
          <div
            key={t.id}
            style={styles.row}
            onClick={() => setSelectedTxn(t)}
          >
            <div>
              <strong>{t.desc}</strong>
              <p style={styles.date}>{t.date}</p>
            </div>

            <span
              style={{
                color: t.amount > 0 ? "#16a34a" : "#dc2626",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              ₹{t.amount}
            </span>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTxn && (
        <div style={styles.modalOverlay} onClick={() => setSelectedTxn(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Transaction Details</h3>
            <p><strong>Description:</strong> {selectedTxn.desc}</p>
            <p><strong>Date:</strong> {selectedTxn.date}</p>
            <p><strong>Amount:</strong> ₹{selectedTxn.amount}</p>
            <p>
              <strong>Type:</strong>{" "}
              {selectedTxn.amount > 0 ? "Income" : "Expense"}
            </p>

            <button
              style={styles.closeBtn}
              onClick={() => setSelectedTxn(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
  },
  heading: {
    marginBottom: "20px",
  },
  summary: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  card: {
    flex: 1,
    background: "#f3f4f6",
    padding: "20px",
    borderRadius: "12px",
  },
  controls: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  exportBtn: {
    padding: "10px 14px",
    background: "linear-gradient(135deg,#6366f1,#4f46e5)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px",
    borderRadius: "12px",
    background: "#f9fafb",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  date: {
    fontSize: "12px",
    color: "gray",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.3s ease",
  },
  modal: {
    background: "white",
    padding: "30px",
    borderRadius: "16px",
    width: "320px",
  },
  closeBtn: {
    marginTop: "20px",
    padding: "8px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
