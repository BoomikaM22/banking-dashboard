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
