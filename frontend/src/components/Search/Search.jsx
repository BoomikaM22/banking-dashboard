import React, { useState } from 'react';

const ServiceSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [btnHover, setBtnHover] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const services = [
    { id: 1, name: 'Transaction History', category: 'Activity' },
    { id: 2, name: 'Balance Inquiry', category: 'Accounts' },
    { id: 3, name: 'All Accounts', category: 'Accounts' },
    { id: 4, name: 'Fund Transfer', category: 'Payments' },
    { id: 5, name: 'Bill Payment', category: 'Payments' },
    { id: 6, name: 'Cards Management', category: 'Settings' },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const s = {
    wrapper: {
      padding: '40px 20px',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    searchGroup: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    inputWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      background: 'rgba(15, 23, 42, 0.8)', // Deep navy background
      borderRadius: '12px',
      padding: '4px 15px',
      border: '2px solid #38bdf8', // Blue border by default
      transition: 'box-shadow 0.3s ease',
    },
    input: {
      width: '100%',
      padding: '12px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      fontSize: '16px'
    },
    searchBtn: {
      padding: '14px 28px',
      borderRadius: '12px',
      border: '2px solid #38bdf8', // Blue border by default
      background: btnHover ? '#38bdf8' : 'transparent', // Fills on hover
      color: btnHover ? '#0f172a' : '#38bdf8',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '16px',
      whiteSpace: 'nowrap',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    resultsBox: {
      marginTop: '15px',
      background: '#1e293b',
      borderRadius: '16px',
      overflow: 'hidden',
      border: '2px solid #38bdf8', // Blue border for results box
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
    },
    item: (isHovered) => ({
      padding: '15px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      backgroundColor: isHovered ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
      borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
      transition: '0.2s'
    })
  };

  return (
    <div style={s.wrapper}>
      <div style={s.searchGroup}>
        <div style={s.inputWrapper}>
          <span style={{ color: '#38bdf8', marginRight: '5px' }}></span>
          <input
            type="text"
            placeholder="Search banking services..."
            style={s.input}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          style={s.searchBtn}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          onClick={() => alert(`Initiating search for: ${searchTerm}`)}
        >
          Search
        </button>
      </div>

      {searchTerm && (
        <div style={s.resultsBox}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div
                key={service.id}
                style={s.item(hoverIndex === index)}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <span style={{fontSize: '20px'}}>{service.icon}</span>
                <div>
                  <div style={{color: '#fff', fontWeight: '600'}}>{service.name}</div>
                  <div style={{color: '#38bdf8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px'}}>
                    {service.category}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{padding: '20px', color: '#94a3b8', textAlign: 'center'}}>
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceSearch;
=======
import { useState } from "react";

export default function Search({ transactions = [] }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // Filtering
  let filtered = transactions.filter((t) =>
    t.desc.toLowerCase().includes(query.toLowerCase()) ||
    t.amount.toString().includes(query) ||
    (t.date && t.date.includes(query))
  );

  // Type filter
  if (typeFilter === "Income") {
    filtered = filtered.filter((t) => t.amount > 0);
  } else if (typeFilter === "Expense") {
    filtered = filtered.filter((t) => t.amount < 0);
  }

  // Sorting
  if (sortBy === "highest") {
    filtered.sort((a, b) => b.amount - a.amount);
  } else if (sortBy === "lowest") {
    filtered.sort((a, b) => a.amount - b.amount);
  } else {
    filtered.sort((a, b) => b.id - a.id);
  }

  return (
    <div style={styles.container}>
      <h2 style={{ marginBottom: "20px" }}>
        🔍 Global Transaction Intelligence
      </h2>

      {/* Search Controls */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search by description, amount or date..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={styles.select}
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.select}
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>

      {/* Results */}
      <div style={styles.results}>
        {filtered.length === 0 ? (
          <p style={{ opacity: 0.6 }}>No transactions found.</p>
        ) : (
          filtered.map((t) => (
            <div key={t.id} style={styles.card}>
              <div>
                <strong>{t.desc}</strong>
                <p style={{ fontSize: "12px", opacity: 0.6 }}>
                  {t.date || "No Date"}
                </p>
              </div>

              <span
                style={{
                  color: t.amount > 0 ? "#16a34a" : "#dc2626",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                ₹{t.amount}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    minHeight: "100vh",
    background: "#f5f6fa",
  },
  controls: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    background: "white",
    padding: "15px 20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    transition: "0.2s ease",
  },
};
>>>>>>> Updated dashboard UI, added transactions, search, animations and features
