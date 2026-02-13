import { useState, useMemo } from "react";

export default function TransactionHistory({ transactions = [] }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    let data = [...transactions];

    if (search)
      data = data.filter(t =>
        t.desc.toLowerCase().includes(search.toLowerCase())
      );

    if (type !== "All")
      data = data.filter(t =>
        type === "Income" ? t.amount > 0 : t.amount < 0
      );

    data.sort((a, b) => {
      if (sort === "Highest") return b.amount - a.amount;
      if (sort === "Lowest") return a.amount - b.amount;
      return new Date(b.date) - new Date(a.date);
    });

    return data;
  }, [transactions, search, type, sort]);

  const income = filtered
    .filter(t => t.amount > 0)
    .reduce((a, t) => a + t.amount, 0);

  const expense = filtered
    .filter(t => t.amount < 0)
    .reduce((a, t) => a + t.amount, 0);

  const exportCSV = () => {
    const csv = ["Date,Description,Amount",
      ...filtered.map(t => `${t.date},${t.desc},${t.amount}`)
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "transactions.csv",
    });
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2>Transaction History</h2>

      <div style={styles.summary}>
        <Card title="Income" value={income} color="#16a34a" />
        <Card title="Expense" value={Math.abs(expense)} color="#dc2626" />
      </div>

      <div style={styles.controls}>
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setType(e.target.value)}>
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <select onChange={e => setSort(e.target.value)}>
          <option>Latest</option>
          <option>Highest</option>
          <option>Lowest</option>
        </select>

        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {filtered.map(t => (
        <div
          key={t.id}
          style={styles.row}
          onClick={() => setSelected(t)}
        >
          <div>
            <strong>{t.desc}</strong>
            <p style={{ fontSize: 12, color: "gray" }}>{t.date}</p>
          </div>
          <span
            style={{
              color: t.amount > 0 ? "#16a34a" : "#dc2626",
              fontWeight: "bold",
            }}
          >
            ₹{t.amount}
          </span>
        </div>
      ))}

      {selected && (
        <div style={styles.overlay} onClick={() => setSelected(null)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>Transaction Details</h3>
            <p>{selected.desc}</p>
            <p>{selected.date}</p>
            <p>₹{selected.amount}</p>
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const Card = ({ title, value, color }) => (
  <div style={{ ...styles.card }}>
    <p>{title}</p>
    <h3 style={{ color }}>₹{value}</h3>
  </div>
);

const styles = {
  container: { padding: 30, background: "#fff", borderRadius: 20 },
  summary: { display: "flex", gap: 15, margin: "15px 0" },
  card: {
    flex: 1,
    background: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
  },
  controls: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: 15,
    background: "#f9fafb",
    borderRadius: 10,
    marginBottom: 10,
    cursor: "pointer",
    transition: "0.3s",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 280,
  },
};
