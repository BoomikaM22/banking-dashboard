import React, { useState } from 'react';

const COUNTRY_CODES = [
  { code: "+91", country: "IN" },
  { code: "+1",  country: "US" },
  { code: "+44", country: "GB" },
  { code: "+971", country: "UAE" },
];

const ACCOUNT_TYPES = [
  "Savings Account",
  "Checking Account",
];

export default function CreateAccountForm() {
  const [acctForm, setAcctForm] = useState({
    firstName: "", lastName: "", email: "",
    countryCode: "+91", phone: "",
    address: "", city: "", state: "", zip: "",
    accountType: "Savings Account", deposit: "",
    password: "", confirmPassword: "",
  });

  const [acctErrors, setAcctErrors] = useState({});
  const [createSuccess, setCreateSuccess] = useState(false);

  // VALIDATION LOGIC
  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAcctSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!acctForm.firstName.trim()) errors.firstName = "Required.";
    if (!acctForm.lastName.trim())  errors.lastName  = "Required.";
    if (!validateEmail(acctForm.email)) errors.email = "Invalid email.";
    if (!/^\d{10}$/.test(acctForm.phone)) errors.phone = "Must be 10 digits.";
    if (!acctForm.address.trim()) errors.address = "Required.";
    if (!acctForm.city.trim())     errors.city    = "Required.";
    if (!acctForm.zip.trim())      errors.zip     = "Required.";
    
    // MANDATORY PASSWORD VALIDATION
    if (!acctForm.password) {
      errors.password = "Password is required.";
    } else if (!validatePassword(acctForm.password)) {
      errors.password = "Min 8 chars: Use Uppercase, Lowercase, Number & Special Char.";
    }
    
    if (acctForm.password !== acctForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setAcctErrors(errors);
      return;
    }

    setCreateSuccess(true);
    setTimeout(() => {
      setCreateSuccess(false);
      setAcctErrors({});
      setAcctForm({
        firstName: "", lastName: "", email: "", countryCode: "+91", phone: "",
        address: "", city: "", state: "", zip: "",
        accountType: "Savings Account", deposit: "", password: "", confirmPassword: "",
      });
    }, 3000);
  };

  // ADVANCED UI STYLES
  const s = {
    page: {
      minHeight: '100vh',
      background: 'radial-gradient(circle at top left, #1e293b, #0f172a)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    },
    card: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '40px',
      width: '100%',
      maxWidth: '650px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      color: '#f8fafc'
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: '#3b82f6',
      marginBottom: '15px',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    button: {
      marginTop: '10px',
      padding: '16px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {createSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '70px', color: '#10b981', marginBottom: '10px' }}>✦</div>
            <h2 style={{ fontSize: '28px' }}>Vault Created!</h2>
            <p style={{ color: '#94a3b8' }}>Welcome to the future of secure banking.</p>
          </div>
        ) : (
          <form onSubmit={handleAcctSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <header>
              <h2 style={{ margin: '0 0 5px 0', fontSize: '26px' }}>Open New Account</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px' }}>Fill in your details to get started.</p>
            </header>

            <div>
              <p style={s.sectionTitle}>Personal Details</p>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <F label="First Name" req name="firstName" val={acctForm.firstName} set={setAcctForm} ph="Jane" err={acctErrors.firstName} />
                <F label="Last Name"  req name="lastName"  val={acctForm.lastName}  set={setAcctForm} ph="Doe" err={acctErrors.lastName} />
              </div>
              <F label="Email Address" req name="email" type="email" val={acctForm.email} set={setAcctForm} ph="jane@example.com" err={acctErrors.email} />
              
              <div style={{ marginTop: '15px' }}>
                <label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block' }}>Phone Number *</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white' }}
                    value={acctForm.countryCode}
                    onChange={(e) => setAcctForm((p) => ({ ...p, countryCode: e.target.value }))}
                  >
                    {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
                  </select>
                  <input
                    style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    type="tel"
                    placeholder="10-digit number"
                    value={acctForm.phone}
                    maxLength={10}
                    onChange={(e) => { const val = e.target.value.replace(/\D/g, ""); setAcctForm((p) => ({ ...p, phone: val })); }}
                    required
                  />
                </div>
                {acctErrors.phone && <span style={{ color: '#f43f5e', fontSize: '12px' }}>{acctErrors.phone}</span>}
              </div>
            </div>

            <div>
              <p style={s.sectionTitle}>Address Information</p>
              <F label="Street Address" req name="address" val={acctForm.address} set={setAcctForm} ph="123 Main St" err={acctErrors.address} />
              <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                <F label="City" req name="city" val={acctForm.city} set={setAcctForm} ph="New York" err={acctErrors.city} />
                <F label="ZIP Code" req name="zip" val={acctForm.zip} set={setAcctForm} ph="10001" err={acctErrors.zip} />
              </div>
            </div>

            <div>
              <p style={s.sectionTitle}>Security & Account</p>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px', display: 'block' }}>Account Type</label>
                  <select 
                    style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: '#1e293b', color: 'white' }} 
                    value={acctForm.accountType} 
                    onChange={(e) => setAcctForm((p) => ({ ...p, accountType: e.target.value }))}
                  >
                    {ACCOUNT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <F label="Initial Deposit" req name="deposit" type="number" min="0" val={acctForm.deposit} set={setAcctForm} ph="5000" />
              </div>
              
              <div style={{ display: 'flex', gap: '15px' }}>
                <F label="Password" req name="password" type="password" val={acctForm.password} set={setAcctForm} ph="••••••••" err={acctErrors.password} />
                <F label="Confirm Password" req name="confirmPassword" type="password" val={acctForm.confirmPassword} set={setAcctForm} ph="••••••••" err={acctErrors.confirmPassword} />
              </div>
            </div>

            <button type="submit" style={s.button}>
              Create Secure Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function F({ label, req, name, val, set, type = "text", ph, min, err }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
      <label style={{ fontSize: '13px', color: '#94a3b8' }}>{label}{req && " *"}</label>
      <input
        style={{ 
          padding: '12px', 
          borderRadius: '10px', 
          border: err ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)', 
          background: 'rgba(0,0,0,0.2)', 
          color: 'white',
          outline: 'none',
          transition: 'border 0.2s ease'
        }}
        type={type}
        name={name}
        value={val}
        placeholder={ph}
        required={req}
        min={min}
        onChange={(e) => set((p) => ({ ...p, [name]: e.target.value }))}
      />
      {err && <span style={{ color: '#f43f5e', fontSize: '11px', lineHeight: '1.2' }}>{err}</span>}
    </div>
  );
}
