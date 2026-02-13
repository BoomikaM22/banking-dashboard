export default function Dashboard() {
  const services = [
    "Current Accounts", "Credit Cards", "Savings Accounts",
    "Loans", "Mortgages", "Insurance", "Investments", "Subscriptions"
  ];

  return (
    <div style={s.container}>

      {/* Header */}
      <header style={s.header}>
        <h1 style={s.logo}>FINOVA</h1>
        <button style={s.loginBtn}>Log in</button>
      </header>

      {/* Hero */}
      <section style={s.hero}>
        <h2 style={s.heroTitle}>Make your money work smarter</h2>
        <p style={s.heroText}>
          Secure, fast and reliable digital banking experience.
        </p>
        <button style={s.heroBtn}>Get Started</button>
      </section>

      {/* Services */}
      <section style={s.services}>
        <h2 style={s.sectionTitle}>Our Banking Services</h2>

        <div style={s.grid}>
          {services.map((item, i) => (
            <div key={i} style={s.card}>
              <h3>{item}</h3>
              <p>Smart financial solutions tailored for you.</p>
              <button style={s.cardBtn}>Explore</button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const s = {
  container: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Inter, sans-serif"
  },

  header: {
    background: "#0f172a",
    padding: "18px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: { color: "#3b82f6", fontWeight: "700" },

  loginBtn: {
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer"
  },

  hero: {
    padding: "100px 50px",
    background: "linear-gradient(135deg,#1e293b,#0f172a)",
    color: "#fff",
    textAlign: "center"
  },

  heroTitle: { fontSize: "38px", fontWeight: "700" },

  heroText: {
    margin: "15px 0 25px",
    color: "#cbd5e1"
  },

  heroBtn: {
    padding: "12px 28px",
    borderRadius: "25px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer"
  },

  services: { padding: "60px 50px" },

  sectionTitle: {
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "600"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
    gap: "25px"
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
    transition: "transform 0.2s ease",
    cursor: "pointer"
  },

  cardBtn: {
    marginTop: "15px",
    padding: "8px 18px",
    borderRadius: "20px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer"
  }
};
