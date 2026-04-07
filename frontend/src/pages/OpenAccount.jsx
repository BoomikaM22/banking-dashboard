import { useState } from "react";
import { api } from "../api";
import { UserPlus, CheckCircle } from "lucide-react";

const PREFIXES = ["Mr.", "Ms.", "Mrs.", "Dr."];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const COUNTRIES = ["India", "USA", "UK", "Australia", "UAE", "Singapore"];
const EDUCATION = ["High School", "Bachelor's", "Master's", "PhD", "Other"];
const ID_TYPES = ["Passport", "Driver's License", "National ID", "PAN Card", "Aadhaar"];

export default function OpenAccount() {
  const [form, setForm] = useState({
    prefix: "Mr.", firstName: "", lastName: "", dobMonth: "", dobDay: "", dobYear: "",
    motherName: "", phone: "", email: "", address: "", city: "", state: "", zip: "", country: "India",
    education: "", idType: "", idNumber: "",
    accountType: "Savings Account", monthlyIncome: "", deposit: "", pwd: "", confirm: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const handle = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.firstName || !form.lastName) return setError("Enter full name");
    if (!form.dobMonth || !form.dobDay || !form.dobYear) return setError("Select date of birth");
    if (form.pwd !== form.confirm) return setError("Passwords don't match");
    if (!form.deposit || Number(form.deposit) < 100) return setError("Minimum deposit: ₹100");
    if (form.phone && form.phone.replace(/\D/g, "").length !== 10) return setError("Phone must be 10 digits");
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Invalid email");

    setLoading(true);
    try {
      const acct = await api("/accounts", {
        method: "POST",
        body: { userId: "u1", type: form.accountType, initialDeposit: form.deposit }
      });
      setSuccess(acct);
      setForm({
        prefix: "Mr.", firstName: "", lastName: "", dobMonth: "", dobDay: "", dobYear: "",
        motherName: "", phone: "", email: "", address: "", city: "", state: "", zip: "", country: "India",
        education: "", idType: "", idNumber: "",
        accountType: "Savings Account", monthlyIncome: "", deposit: "", pwd: "", confirm: ""
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const inp = { padding: 11, border: "1px solid var(--border)", borderRadius: 8, background: "var(--surface2)", color: "var(--text)", fontSize: 14, width: "100%" };
  const lbl = { display: "block", fontSize: 11, fontWeight: 600, color: "var(--text2)", marginBottom: 5, textTransform: "uppercase" };
  const sec = { marginBottom: 20, padding: 14, background: "var(--surface2)", borderRadius: 12 };

  if (success) return (
    <div className="page" style={{ padding: 40, textAlign: "center" }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 32, maxWidth: 450, margin: "0 auto" }}>
        <CheckCircle size={48} color="var(--green)" style={{ marginBottom: 12 }} />
        <h2 style={{ fontFamily: "Syne", fontWeight: 700, marginBottom: 8 }}>Account Opened!</h2>
        <p style={{ color: "var(--text2)", marginBottom: 4 }}>{success.type}</p>
        <p style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "var(--accent2)" }}>{success.number}</p>
        <button onClick={() => setSuccess(null)} style={{ marginTop: 16, padding: "10px 24px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600 }}>Open Another</button>
      </div>
    </div>
  );

  return (
    <div className="page" style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(108,99,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <UserPlus size={20} color="var(--accent)" />
          </div>
          <div>
            <h2 style={{ fontFamily: "Syne", fontWeight: 700, margin: 0, fontSize: 18 }}>Account Opening Form</h2>
            <p style={{ fontSize: 12, color: "var(--text3)", margin: 0 }}>All fields marked * are required</p>
          </div>
        </div>

        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {error && <p style={{ color: "var(--red)", background: "rgba(244,63,94,0.1)", padding: 10, borderRadius: 8, margin: 0, fontSize: 13 }}>{error}</p>}

          <div style={sec}>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, margin: "0 0 10px 0" }}>Personal Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Prefix</label>
                <select name="prefix" style={inp} value={form.prefix} onChange={handle}>
                  {PREFIXES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>First Name *</label>
                <input name="firstName" style={inp} placeholder="First" required value={form.firstName} onChange={handle} autoComplete="off" />
              </div>
              <div>
                <label style={lbl}>Last Name *</label>
                <input name="lastName" style={inp} placeholder="Last" required value={form.lastName} onChange={handle} autoComplete="off" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8, marginTop: 8 }}>
              <div>
                <label style={lbl}>Date of Birth *</label>
                <div style={{ display: "flex", gap: 6 }}>
                  <select name="dobMonth" style={{...inp, flex: 1}} value={form.dobMonth} onChange={handle} required>
                    <option value="">Month</option>
                    {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                  </select>
                  <select name="dobDay" style={{...inp, flex: 1}} value={form.dobDay} onChange={handle} required>
                    <option value="">Day</option>
                    {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <select name="dobYear" style={{...inp, flex: 1}} value={form.dobYear} onChange={handle} required>
                    <option value="">Year</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={lbl}>Mother's Maiden Name *</label>
                <input name="motherName" style={inp} placeholder="Maiden name" required value={form.motherName} onChange={handle} />
              </div>
              <div>
                <label style={lbl}>Phone *</label>
                <input name="phone" type="tel" style={inp} placeholder="(000) 000-0000" required value={form.phone} onChange={handle} maxLength={10} />
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <label style={lbl}>Email</label>
              <input name="email" type="email" style={inp} placeholder="example@example.com" value={form.email} onChange={handle} />
            </div>
          </div>

          <div style={sec}>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, margin: "0 0 10px 0" }}>Address</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div>
                <input name="address" style={inp} placeholder="Street Address" required value={form.address} onChange={handle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 100px", gap: 8 }}>
                <div>
                  <input name="city" style={inp} placeholder="City" required value={form.city} onChange={handle} />
                </div>
                <div>
                  <input name="state" style={inp} placeholder="State / Province" required value={form.state} onChange={handle} />
                </div>
                <div>
                  <input name="zip" style={inp} placeholder="Postal / Zip Code" required value={form.zip} onChange={handle} />
                </div>
              </div>
              <div>
                <select name="country" style={inp} value={form.country} onChange={handle} required>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div style={sec}>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, margin: "0 0 10px 0" }}>Identification & Education</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Education Level</label>
                <select name="education" style={inp} value={form.education} onChange={handle} required>
                  <option value="">Select Education</option>
                  {EDUCATION.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>ID Type *</label>
                <select name="idType" style={inp} value={form.idType} onChange={handle} required>
                  <option value="">Select ID</option>
                  {ID_TYPES.map(id => <option key={id} value={id}>{id}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <input name="idNumber" style={inp} placeholder="ID Number" required value={form.idNumber} onChange={handle} />
            </div>
          </div>

          <div style={sec}>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, margin: "0 0 10px 0" }}>Account Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Account Type *</label>
                <select name="accountType" style={inp} value={form.accountType} onChange={handle} required>
                  <option value="Savings Account">Savings Account</option>
                  <option value="Current Account">Current Account</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Recurring Deposit">Recurring Deposit</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Monthly Salary (USD)</label>
                <input name="monthlyIncome" type="number" min="0" step="0.01" style={inp} placeholder="0.00" value={form.monthlyIncome} onChange={handle} />
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <label style={lbl}>Initial Deposit (₹) *</label>
              <input name="deposit" type="number" min="100" step="0.01" style={inp} placeholder="Minimum ₹100" required value={form.deposit} onChange={handle} />
            </div>
          </div>

          <div style={sec}>
            <h3 style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 14, margin: "0 0 10px 0" }}>Security</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={lbl}>Password *</label>
                <input name="pwd" type="password" style={inp} placeholder="Min 6 chars" required value={form.pwd} onChange={handle} autoComplete="off" />
              </div>
              <div>
                <label style={lbl}>Confirm *</label>
                <input name="confirm" type="password" style={inp} placeholder="Re-enter password" required value={form.confirm} onChange={handle} autoComplete="off" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{ padding: 14, background: loading ? "var(--text3)" : "linear-gradient(135deg, var(--accent), #8b5cf6)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Creating…" : "Open Account"}
          </button>
        </form>
      </div>
    </div>
  );
}