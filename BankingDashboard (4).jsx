import { useState, useRef, useEffect } from "react";

const COUNTRY_CODES = [
  { code: "+91", country: "IN" },
  { code: "+1",  country: "US" },
  { code: "+44", country: "GB" },
  { code: "+61", country: "AU" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "SG" },
  { code: "+60", country: "MY" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
];

const ACCOUNT_TYPES = [
  "Savings Account",
  "Fixed Deposit",
  "Recurring Deposit",
  "Current Account",
  "Salary Account",
  "NRI Account",
];

const SERVICES = [
  { id: 1,  name: "Savings Account",    category: "Accounts",    desc: "Grow your money with competitive interest rates" },
  { id: 2,  name: "Fixed Deposit",      category: "Deposits",    desc: "Lock in high returns with guaranteed interest" },
  { id: 3,  name: "Recurring Deposit",  category: "Deposits",    desc: "Save a fixed amount every month" },
  { id: 4,  name: "Personal Loan",      category: "Loans",       desc: "Quick loans with flexible repayment" },
  { id: 5,  name: "Home Loan",          category: "Loans",       desc: "Finance your dream home" },
  { id: 6,  name: "Credit Card",        category: "Cards",       desc: "Rewards and benefits on every spend" },
  { id: 7,  name: "Debit Card",         category: "Cards",       desc: "Secure payments anywhere" },
  { id: 8,  name: "Wire Transfer",      category: "Transfers",   desc: "Send money globally, fast and secure" },
  { id: 9,  name: "Mobile Banking",     category: "Digital",     desc: "Full banking access on your phone" },
  { id: 10, name: "Investment Account", category: "Investments", desc: "Mutual funds, stocks and more" },
];

const CAT_COLORS = {
  Accounts: "#2563eb", Deposits: "#0891b2", Loans: "#b45309",
  Cards: "#7c3aed", Transfers: "#0f766e", Digital: "#15803d", Investments: "#be185d",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; }
  .bd-page { min-height: 100vh; background: #f8f7f4; color: #1c1c1e; }

  .bd-nav {
    position: sticky; top: 0; z-index: 200;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2.5rem; height: 64px;
    background: #fff; border-bottom: 1px solid #e5e2db;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .bd-brand { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #1c1c1e; letter-spacing: -0.3px; }
  .bd-brand span { color: #2563eb; }
  .bd-nav-center { display: flex; gap: 0.25rem; align-items: center; }
  .bd-nav-btn {
    background: none; border: none; padding: 0.45rem 1.1rem;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
    color: #555; cursor: pointer; border-radius: 6px; transition: all 0.15s;
  }
  .bd-nav-btn:hover { background: #f0ede8; color: #1c1c1e; }
  .bd-nav-btn.active { background: #eef2ff; color: #2563eb; font-weight: 600; }
  .bd-nav-right { display: flex; align-items: center; gap: 0.75rem; }
  .bd-login-btn {
    background: none; border: 1px solid #d0cdc7; border-radius: 8px;
    padding: 0.4rem 1.1rem; font-size: 0.875rem; font-weight: 600;
    color: #444; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s;
  }
  .bd-login-btn:hover { border-color: #2563eb; color: #2563eb; }
  .bd-reg-btn {
    background: #1c1c1e; border: none; border-radius: 8px;
    padding: 0.4rem 1.1rem; font-size: 0.875rem; font-weight: 600;
    color: #fff; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.15s;
  }
  .bd-reg-btn:hover { background: #2563eb; }
  .bd-avatar-btn {
    width: 36px; height: 36px; border-radius: 50%; border: 2px solid #2563eb;
    background: #eef2ff; cursor: pointer; font-size: 0.85rem; font-weight: 700;
    color: #2563eb; display: flex; align-items: center; justify-content: center; transition: all 0.15s;
  }
  .bd-avatar-btn:hover { background: #2563eb; color: #fff; }

  .bd-menu-wrap { position: relative; }
  .bd-dropdown {
    position: absolute; top: calc(100% + 10px); left: 0;
    background: #fff; border: 1px solid #e5e2db; border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.1); min-width: 320px;
    padding: 1.25rem; z-index: 300; animation: dropIn 0.15s ease;
  }
  .bd-dropdown.wide { min-width: 500px; max-height: 82vh; overflow-y: auto; }
  @keyframes dropIn { from { opacity:0; transform: translateY(-6px); } to { opacity:1; transform:translateY(0); } }

  .bd-search {
    width: 100%; padding: 0.55rem 0.85rem; font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif; border: 1px solid #ddd; border-radius: 8px;
    outline: none; background: #fafaf9; margin-bottom: 0.85rem;
  }
  .bd-search:focus { border-color: #2563eb; }
  .bd-svc-list { display: flex; flex-direction: column; gap: 0.3rem; max-height: 280px; overflow-y: auto; }
  .bd-svc-row { display: flex; align-items: center; gap: 0.85rem; padding: 0.55rem 0.6rem; border-radius: 8px; cursor: pointer; transition: background 0.12s; }
  .bd-svc-row:hover { background: #f5f3f0; }
  .bd-svc-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  .bd-svc-name { font-size: 0.88rem; font-weight: 600; color: #1c1c1e; }
  .bd-svc-cat { font-size: 0.75rem; color: #888; margin-top: 1px; }
  .bd-no-result { font-size: 0.85rem; color: #aaa; text-align: center; padding: 1.5rem 0; }

  .bd-form-heading { font-family: 'DM Serif Display', serif; font-size: 1.25rem; color: #1c1c1e; margin-bottom: 1.25rem; }
  .bd-section-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.09em; color: #aaa; margin-bottom: 0.6rem; }
  .bd-section-block { margin-bottom: 1.1rem; padding-bottom: 1.1rem; border-bottom: 1px solid #f0ede8; }
  .bd-section-block:last-of-type { border-bottom: none; }
  .bd-row { display: flex; gap: 0.75rem; }
  .bd-field { flex: 1; display: flex; flex-direction: column; margin-bottom: 0.65rem; }
  .bd-label { font-size: 0.78rem; font-weight: 600; color: #555; margin-bottom: 0.28rem; }
  .bd-required { color: #e53935; margin-left: 2px; }
  .bd-input, .bd-select {
    padding: 0.5rem 0.75rem; font-size: 0.875rem; font-family: 'DM Sans', sans-serif;
    border: 1px solid #ddd; border-radius: 8px; outline: none;
    background: #fafaf9; color: #1c1c1e; width: 100%; transition: border-color 0.15s;
  }
  .bd-input:focus, .bd-select:focus { border-color: #2563eb; background: #fff; }
  .bd-phone-wrap { display: flex; gap: 0.5rem; }
  .bd-country-select {
    width: 95px; flex-shrink: 0; padding: 0.5rem 0.4rem; font-size: 0.85rem;
    font-family: 'DM Sans', sans-serif; border: 1px solid #ddd; border-radius: 8px;
    outline: none; background: #fafaf9;
  }
  .bd-country-select:focus { border-color: #2563eb; }
  .bd-submit-btn {
    margin-top: 0.75rem; width: 100%; padding: 0.65rem;
    background: #1c1c1e; color: #fff; border: none; border-radius: 8px;
    font-size: 0.9rem; font-weight: 700; font-family: 'DM Sans', sans-serif;
    cursor: pointer; transition: background 0.15s; letter-spacing: 0.02em;
  }
  .bd-submit-btn:hover { background: #2563eb; }
  .bd-success { text-align: center; padding: 2.5rem 1rem; }
  .bd-success-icon { font-size: 2rem; margin-bottom: 0.75rem; color: #16a34a; }
  .bd-success-text { font-size: 1.05rem; font-weight: 700; color: #16a34a; }
  .bd-success-sub { font-size: 0.85rem; color: #888; margin-top: 0.3rem; }

  .bd-modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.35);
    display: flex; align-items: center; justify-content: center;
    z-index: 500; backdrop-filter: blur(2px); animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  .bd-modal {
    background: #fff; border-radius: 18px; width: 420px; max-width: 95vw;
    padding: 2.25rem 2.5rem; box-shadow: 0 20px 60px rgba(0,0,0,0.18);
    animation: slideUp 0.2s ease; position: relative;
  }
  @keyframes slideUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .bd-modal-title { font-family: 'DM Serif Display', serif; font-size: 1.6rem; margin-bottom: 0.35rem; color: #1c1c1e; }
  .bd-modal-sub { font-size: 0.875rem; color: #888; margin-bottom: 1.75rem; }
  .bd-modal-close {
    position: absolute; top: 1.1rem; right: 1.25rem;
    background: none; border: none; font-size: 1.3rem; cursor: pointer; color: #aaa; line-height: 1;
  }
  .bd-modal-close:hover { color: #1c1c1e; }
  .bd-tab-row { display: flex; margin-bottom: 1.75rem; border-bottom: 2px solid #f0ede8; }
  .bd-tab {
    flex: 1; padding: 0.6rem; text-align: center; font-size: 0.9rem; font-weight: 600;
    font-family: 'DM Sans', sans-serif; background: none; border: none; cursor: pointer;
    color: #aaa; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.15s;
  }
  .bd-tab.active { color: #2563eb; border-bottom-color: #2563eb; }
  .bd-forgot {
    font-size: 0.8rem; color: #2563eb; background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; display: block; margin-top: -0.2rem; margin-bottom: 1rem; text-align: right; width: 100%;
  }

  .bd-profile-menu {
    position: absolute; top: calc(100% + 10px); right: 0;
    background: #fff; border: 1px solid #e5e2db; border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.1); min-width: 200px; padding: 0.75rem;
    z-index: 300; animation: dropIn 0.15s ease;
  }
  .bd-profile-info { padding: 0.5rem 0.6rem 0.85rem; border-bottom: 1px solid #f0ede8; margin-bottom: 0.5rem; }
  .bd-profile-name { font-size: 0.9rem; font-weight: 700; color: #1c1c1e; }
  .bd-profile-email { font-size: 0.78rem; color: #888; margin-top: 2px; }
  .bd-profile-item {
    display: block; width: 100%; text-align: left; background: none; border: none;
    padding: 0.5rem 0.6rem; font-size: 0.875rem; font-family: 'DM Sans', sans-serif;
    color: #444; cursor: pointer; border-radius: 7px; transition: background 0.12s;
  }
  .bd-profile-item:hover { background: #f5f3f0; color: #1c1c1e; }
  .bd-profile-item.danger { color: #e53935; }
  .bd-profile-item.danger:hover { background: #fef2f2; }

  .bd-hero {
    padding: 5.5rem 2.5rem 4.5rem;
    background: linear-gradient(155deg, #ffffff 0%, #eef4ff 55%, #e8f5e9 100%);
    position: relative; overflow: hidden;
  }
  .bd-hero::before {
    content: ''; position: absolute; top: -100px; right: -60px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .bd-hero::after {
    content: ''; position: absolute; bottom: -60px; left: 30%;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(21,128,61,0.05) 0%, transparent 65%);
    pointer-events: none;
  }
  .bd-hero-inner { max-width: 680px; position: relative; z-index: 1; }
  .bd-hero-tag {
    display: inline-block; background: #eef2ff; color: #2563eb;
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.35rem 0.9rem; border-radius: 20px; margin-bottom: 1.5rem; border: 1px solid #c7d7fd;
  }
  .bd-hero-title {
    font-family: 'DM Serif Display', serif; font-size: 3.4rem;
    line-height: 1.1; color: #1c1c1e; margin-bottom: 1.25rem; letter-spacing: -1.5px;
  }
  .bd-hero-title em { color: #2563eb; font-style: normal; }
  .bd-hero-sub { font-size: 1.05rem; color: #666; line-height: 1.72; max-width: 520px; margin-bottom: 2.25rem; font-weight: 400; }
  .bd-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
  .bd-hero-cta {
    background: #1c1c1e; color: #fff; border: none; border-radius: 10px;
    padding: 0.8rem 1.8rem; font-size: 0.95rem; font-weight: 700;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: background 0.15s; letter-spacing: 0.01em;
  }
  .bd-hero-cta:hover { background: #2563eb; }
  .bd-hero-cta-outline {
    background: transparent; color: #1c1c1e; border: 1.5px solid #c8c4bc; border-radius: 10px;
    padding: 0.8rem 1.8rem; font-size: 0.95rem; font-weight: 600;
    font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s;
  }
  .bd-hero-cta-outline:hover { border-color: #2563eb; color: #2563eb; }

  .bd-stats {
    display: flex; gap: 0; background: #fff;
    border-top: 1px solid #e8e5e0; border-bottom: 1px solid #e8e5e0;
  }
  .bd-stat-item {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    padding: 1.75rem 1rem; border-right: 1px solid #e8e5e0;
  }
  .bd-stat-item:last-child { border-right: none; }
  .bd-stat-num { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #1c1c1e; letter-spacing: -0.5px; }
  .bd-stat-label { font-size: 0.8rem; color: #888; margin-top: 3px; font-weight: 500; }

  .bd-features { padding: 4rem 2.5rem; background: #f8f7f4; }
  .bd-features-head { margin-bottom: 2.25rem; }
  .bd-features-title { font-family: 'DM Serif Display', serif; font-size: 2rem; color: #1c1c1e; margin-bottom: 0.4rem; }
  .bd-features-sub { font-size: 0.9rem; color: #888; }
  .bd-features-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 1.25rem; }
  .bd-feature-card {
    background: #fff; border-radius: 14px; padding: 1.5rem;
    border: 1px solid #e8e5e0; transition: box-shadow 0.2s, transform 0.2s;
  }
  .bd-feature-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-3px); }
  .bd-feature-icon {
    width: 38px; height: 38px; border-radius: 9px; background: #eef2ff;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem; font-size: 0.8rem; font-weight: 800; color: #2563eb; letter-spacing: -0.5px;
  }
  .bd-feature-name { font-size: 0.92rem; font-weight: 700; color: #1c1c1e; margin-bottom: 0.35rem; }
  .bd-feature-desc { font-size: 0.8rem; color: #888; line-height: 1.55; }
`;

export default function BankingDashboard() {
  const [openMenu,      setOpenMenu]      = useState(null);
  const [authModal,     setAuthModal]     = useState(null);
  const [authTab,       setAuthTab]       = useState("login");
  const [loggedIn,      setLoggedIn]      = useState(false);
  const [user,          setUser]          = useState(null);
  const [profileOpen,   setProfileOpen]   = useState(false);
  const [search,        setSearch]        = useState("");
  const [regSuccess,    setRegSuccess]    = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const navRef     = useRef(null);
  const profileRef = useRef(null);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm,   setRegForm]   = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [acctForm,  setAcctForm]  = useState({
    firstName: "", lastName: "", email: "",
    countryCode: "+91", phone: "",
    address: "", city: "", state: "", zip: "",
    accountType: "Savings Account", deposit: "",
    password: "", confirmPassword: "",
  });

  useEffect(() => {
    const handle = (e) => {
      if (navRef.current     && !navRef.current.contains(e.target))     setOpenMenu(null);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const toggleMenu = (m) => setOpenMenu((p) => (p === m ? null : m));

  const filtered = SERVICES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase()) ||
    s.desc.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    setUser({ name: loginForm.email.split("@")[0], email: loginForm.email });
    setAuthModal(null);
    setLoginForm({ email: "", password: "" });
  };

  const handleRegSubmit = (e) => {
    e.preventDefault();
    if (regForm.password !== regForm.confirmPassword) { alert("Passwords do not match."); return; }
    setRegSuccess(true);
    setTimeout(() => {
      setLoggedIn(true);
      setUser({ name: regForm.firstName + " " + regForm.lastName, email: regForm.email });
      setRegSuccess(false);
      setAuthModal(null);
      setRegForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    }, 1800);
  };

  const handleAcctSubmit = (e) => {
    e.preventDefault();
    const digits = acctForm.phone.replace(/\D/g, "");
    if (digits.length !== 10) { alert("Phone number must be exactly 10 digits."); return; }
    if (acctForm.password !== acctForm.confirmPassword) { alert("Passwords do not match."); return; }
    setCreateSuccess(true);
    setTimeout(() => {
      setCreateSuccess(false);
      setOpenMenu(null);
      setAcctForm({
        firstName: "", lastName: "", email: "",
        countryCode: "+91", phone: "",
        address: "", city: "", state: "", zip: "",
        accountType: "Savings Account", deposit: "",
        password: "", confirmPassword: "",
      });
    }, 2000);
  };

  return (
    <>
      <style>{css}</style>
      <div className="bd-page">

        {/* NAVBAR */}
        <nav className="bd-nav" ref={navRef}>
          <div className="bd-brand">Bright<span>Bank</span></div>

          <div className="bd-nav-center">
            <button className="bd-nav-btn">Home</button>

            {/* Services dropdown */}
            <div className="bd-menu-wrap">
              <button
                className={`bd-nav-btn ${openMenu === "services" ? "active" : ""}`}
                onClick={() => toggleMenu("services")}
              >
                Services
              </button>
              {openMenu === "services" && (
                <div className="bd-dropdown">
                  <input
                    autoFocus className="bd-search" type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className="bd-svc-list">
                    {filtered.length === 0
                      ? <p className="bd-no-result">No services found.</p>
                      : filtered.map((svc) => (
                          <div key={svc.id} className="bd-svc-row">
                            <span className="bd-svc-dot" style={{ background: CAT_COLORS[svc.category] || "#aaa" }} />
                            <div>
                              <p className="bd-svc-name">{svc.name}</p>
                              <p className="bd-svc-cat">{svc.category} — {svc.desc}</p>
                            </div>
                          </div>
                        ))
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Open Account dropdown */}
            <div className="bd-menu-wrap">
              <button
                className={`bd-nav-btn ${openMenu === "create" ? "active" : ""}`}
                onClick={() => toggleMenu("create")}
              >
                Open Account
              </button>
              {openMenu === "create" && (
                <div className="bd-dropdown wide">
                  {createSuccess ? (
                    <div className="bd-success">
                      <div className="bd-success-icon">&#10003;</div>
                      <p className="bd-success-text">Account Created Successfully</p>
                      <p className="bd-success-sub">Welcome to BrightBank</p>
                    </div>
                  ) : (
                    <form onSubmit={handleAcctSubmit}>
                      <p className="bd-form-heading">Open a New Account</p>

                      <div className="bd-section-block">
                        <p className="bd-section-label">Personal Information</p>
                        <div className="bd-row">
                          <F label="First Name" req name="firstName" val={acctForm.firstName} set={setAcctForm} ph="Jane" />
                          <F label="Last Name"  req name="lastName"  val={acctForm.lastName}  set={setAcctForm} ph="Doe" />
                        </div>
                        <F label="Email Address" req name="email" type="email" val={acctForm.email} set={setAcctForm} ph="jane@example.com" />
                        <div className="bd-field">
                          <label className="bd-label">Phone Number <span className="bd-required">*</span></label>
                          <div className="bd-phone-wrap">
                            <select
                              className="bd-country-select"
                              value={acctForm.countryCode}
                              onChange={(e) => setAcctForm((p) => ({ ...p, countryCode: e.target.value }))}
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>{c.code} {c.country}</option>
                              ))}
                            </select>
                            <input
                              className="bd-input" type="tel"
                              placeholder="10-digit number"
                              value={acctForm.phone}
                              maxLength={10}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setAcctForm((p) => ({ ...p, phone: val }));
                              }}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bd-section-block">
                        <p className="bd-section-label">Address</p>
                        <F label="Street Address" req name="address" val={acctForm.address} set={setAcctForm} ph="123 Main Street" />
                        <div className="bd-row">
                          <F label="City"     req name="city"  val={acctForm.city}  set={setAcctForm} ph="Mumbai" />
                          <F label="State"    req name="state" val={acctForm.state} set={setAcctForm} ph="MH" />
                          <F label="PIN Code" req name="zip"   val={acctForm.zip}   set={setAcctForm} ph="400001" />
                        </div>
                      </div>

                      <div className="bd-section-block">
                        <p className="bd-section-label">Account Details</p>
                        <div className="bd-row">
                          <div className="bd-field">
                            <label className="bd-label">Account Type <span className="bd-required">*</span></label>
                            <select
                              className="bd-select"
                              value={acctForm.accountType}
                              onChange={(e) => setAcctForm((p) => ({ ...p, accountType: e.target.value }))}
                            >
                              {ACCOUNT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                          <F label="Initial Deposit" req name="deposit" type="number" min="0" val={acctForm.deposit} set={setAcctForm} ph="5000" />
                        </div>
                      </div>

                      <div className="bd-section-block">
                        <p className="bd-section-label">Set Password</p>
                        <div className="bd-row">
                          <F label="Password"         req name="password"        type="password" val={acctForm.password}        set={setAcctForm} ph="••••••••" />
                          <F label="Confirm Password" req name="confirmPassword" type="password" val={acctForm.confirmPassword} set={setAcctForm} ph="••••••••" />
                        </div>
                      </div>

                      <button className="bd-submit-btn" type="submit">Create Account</button>
                    </form>
                  )}
                </div>
              )}
            </div>

            <button className="bd-nav-btn">About</button>
            <button className="bd-nav-btn">Contact</button>
          </div>

          {/* Right — auth / profile */}
          <div className="bd-nav-right">
            {loggedIn ? (
              <div style={{ position: "relative" }} ref={profileRef}>
                <button
                  className="bd-avatar-btn"
                  onClick={() => setProfileOpen((p) => !p)}
                  title={user?.name}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </button>
                {profileOpen && (
                  <div className="bd-profile-menu">
                    <div className="bd-profile-info">
                      <p className="bd-profile-name">{user?.name}</p>
                      <p className="bd-profile-email">{user?.email}</p>
                    </div>
                    <button className="bd-profile-item">My Accounts</button>
                    <button className="bd-profile-item">Transactions</button>
                    <button className="bd-profile-item">Settings</button>
                    <button className="bd-profile-item danger" onClick={() => { setLoggedIn(false); setUser(null); setProfileOpen(false); }}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button className="bd-login-btn" onClick={() => { setAuthTab("login");    setAuthModal("auth"); }}>Log In</button>
                <button className="bd-reg-btn"   onClick={() => { setAuthTab("register"); setAuthModal("auth"); }}>Register</button>
              </>
            )}
          </div>
        </nav>

        {/* HOMEPAGE */}
        <section className="bd-hero">
          <div className="bd-hero-inner">
            <span className="bd-hero-tag">Trusted by 2 million customers</span>
            <h1 className="bd-hero-title">
              Banking that works <em>for you</em>,<br />not the other way around.
            </h1>
            <p className="bd-hero-sub">
              Open an account in minutes, access your money anywhere, and grow your
              savings with industry-leading rates. BrightBank puts you in control.
            </p>
            <div className="bd-hero-actions">
              <button className="bd-hero-cta"         onClick={() => toggleMenu("create")}>Open an Account</button>
              <button className="bd-hero-cta-outline" onClick={() => toggleMenu("services")}>Explore Services</button>
            </div>
          </div>
        </section>

        <div className="bd-stats">
          {[
            { num: "2M+",  label: "Active Customers" },
            { num: "150+", label: "Branch Locations" },
            { num: "7.2%", label: "Savings Interest Rate" },
            { num: "24/7", label: "Customer Support" },
          ].map((s) => (
            <div key={s.label} className="bd-stat-item">
              <span className="bd-stat-num">{s.num}</span>
              <span className="bd-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <section className="bd-features">
          <div className="bd-features-head">
            <h2 className="bd-features-title">Everything you need</h2>
            <p className="bd-features-sub">A full suite of banking products built for modern life.</p>
          </div>
          <div className="bd-features-grid">
            {[
              { icon: "S",  name: "Savings Accounts", desc: "Competitive interest rates with zero fees." },
              { icon: "FD", name: "Fixed Deposits",    desc: "Lock in guaranteed returns up to 8.5% p.a." },
              { icon: "L",  name: "Instant Loans",     desc: "Personal and home loans, approved fast." },
              { icon: "CC", name: "Credit Cards",      desc: "Rewards on every transaction, no annual fee." },
              { icon: "IN", name: "Investments",       desc: "Mutual funds and stocks from one dashboard." },
              { icon: "GT", name: "Global Transfers",  desc: "Send money worldwide in seconds." },
            ].map((f) => (
              <div key={f.name} className="bd-feature-card">
                <div className="bd-feature-icon">{f.icon}</div>
                <p className="bd-feature-name">{f.name}</p>
                <p className="bd-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AUTH MODAL */}
        {authModal && (
          <div
            className="bd-modal-overlay"
            onClick={(e) => { if (e.target.classList.contains("bd-modal-overlay")) setAuthModal(null); }}
          >
            <div className="bd-modal">
              <button className="bd-modal-close" onClick={() => setAuthModal(null)}>&#x2715;</button>
              <div className="bd-tab-row">
                <button className={`bd-tab ${authTab === "login"    ? "active" : ""}`} onClick={() => setAuthTab("login")}>Log In</button>
                <button className={`bd-tab ${authTab === "register" ? "active" : ""}`} onClick={() => setAuthTab("register")}>Register</button>
              </div>

              {authTab === "login" ? (
                <form onSubmit={handleLoginSubmit}>
                  <p className="bd-modal-title">Welcome back</p>
                  <p className="bd-modal-sub">Sign in to your BrightBank account</p>
                  <div className="bd-field">
                    <label className="bd-label">Email Address <span className="bd-required">*</span></label>
                    <input className="bd-input" type="email" required placeholder="jane@example.com"
                      value={loginForm.email} onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="bd-field">
                    <label className="bd-label">Password <span className="bd-required">*</span></label>
                    <input className="bd-input" type="password" required placeholder="••••••••"
                      value={loginForm.password} onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))} />
                  </div>
                  <button type="button" className="bd-forgot">Forgot password?</button>
                  <button className="bd-submit-btn" type="submit">Sign In</button>
                </form>
              ) : regSuccess ? (
                <div className="bd-success">
                  <div className="bd-success-icon">&#10003;</div>
                  <p className="bd-success-text">Registration Successful</p>
                  <p className="bd-success-sub">Signing you in...</p>
                </div>
              ) : (
                <form onSubmit={handleRegSubmit}>
                  <p className="bd-modal-title">Create account</p>
                  <p className="bd-modal-sub">Join BrightBank today — it only takes a minute</p>
                  <div className="bd-row">
                    <div className="bd-field">
                      <label className="bd-label">First Name <span className="bd-required">*</span></label>
                      <input className="bd-input" required placeholder="Jane"
                        value={regForm.firstName} onChange={(e) => setRegForm((p) => ({ ...p, firstName: e.target.value }))} />
                    </div>
                    <div className="bd-field">
                      <label className="bd-label">Last Name <span className="bd-required">*</span></label>
                      <input className="bd-input" required placeholder="Doe"
                        value={regForm.lastName} onChange={(e) => setRegForm((p) => ({ ...p, lastName: e.target.value }))} />
                    </div>
                  </div>
                  <div className="bd-field">
                    <label className="bd-label">Email <span className="bd-required">*</span></label>
                    <input className="bd-input" type="email" required placeholder="jane@example.com"
                      value={regForm.email} onChange={(e) => setRegForm((p) => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="bd-row">
                    <div className="bd-field">
                      <label className="bd-label">Password <span className="bd-required">*</span></label>
                      <input className="bd-input" type="password" required placeholder="••••••••"
                        value={regForm.password} onChange={(e) => setRegForm((p) => ({ ...p, password: e.target.value }))} />
                    </div>
                    <div className="bd-field">
                      <label className="bd-label">Confirm <span className="bd-required">*</span></label>
                      <input className="bd-input" type="password" required placeholder="••••••••"
                        value={regForm.confirmPassword} onChange={(e) => setRegForm((p) => ({ ...p, confirmPassword: e.target.value }))} />
                    </div>
                  </div>
                  <button className="bd-submit-btn" type="submit">Create Account</button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

function F({ label, req, name, val, set, type = "text", ph, min }) {
  return (
    <div className="bd-field">
      <label className="bd-label">{label}{req && <span className="bd-required"> *</span>}</label>
      <input
        className="bd-input" type={type} name={name} value={val}
        placeholder={ph} required={req} min={min}
        onChange={(e) => set((p) => ({ ...p, [name]: e.target.value }))}
      />
    </div>
  );
}
