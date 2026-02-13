import { useEffect, useState } from "react";

export default function Analytics() {
  const spending = [40, 60, 30, 80, 50];
  const savings = [20, 70, 45, 60, 35];

  return (
    <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
      <Card title="Spending" data={spending} color="#ef4444" />
      <Card title="Savings" data={savings} color="#16a34a" />
    </div>
  );
}

function Card({ title, data, color }) {
  const total = data.reduce((a, b) => a + b, 0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  return (
    <div style={s.card}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>{title}</h4>
        <small>Total: {total}</small>
      </div>

      <div style={s.bars}>
        {data.map((val, i) => (
          <div
            key={i}
            style={{
              ...s.bar,
              height: animate ? `${val}px` : "0px",
              background: color,
            }}
            title={`${val}%`}
          />
        ))}
      </div>

      <div style={{ fontSize: 12, marginTop: 8, color }}>
        {total > 200 ? "📈 Growing" : "📉 Stable"}
      </div>
    </div>
  );
}

const s = {
  card: {
    flex: 1,
    background: "#fff",
    padding: 20,
    borderRadius: 15,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  bars: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    height: 120,
    marginTop: 15,
  },
  bar: {
    width: 20,
    borderRadius: 6,
    transition: "0.6s ease",
  },
};
