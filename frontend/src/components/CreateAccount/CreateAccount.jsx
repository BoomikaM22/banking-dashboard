import React, { useState } from "react";

export default function BankingRegistration() {
  const [formData, setFormData] = useState({
    fullName: "", dateOfBirth: "", email: "", phone: "", address: "",
    bankName: "", accountType: "", paymentMethod: "",
    upiId: "", cardNumber: "", cardExpiry: "", cardCvv: "",
    initialDeposit: "", panCard: null, aadhaarCard: null, signature: null
  });

  const [errors, setErrors] = useState({});

  const s = {
    input: (err) => ({
      width: "100%", padding: "10px",
      border: `2px solid ${err ? "#f56565" : "#e2e8f0"}`,
      borderRadius: "8px"
    }),
    error: { color: "#f56565", fontSize: "12px" },
    section: { fontWeight: "600", margin: "20px 0 10px" },
    row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
    btn: { width: "100%", padding: "12px", background: "#667eea",
      color: "white", border: "none", borderRadius: "8px", marginTop: "20px" }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const val = name === "cardNumber"
      ? value.replace(/\D/g, "").slice(0, 16)
      : value;

    setFormData(p => ({ ...p, [name]: type === "file" ? files[0] : val }));
    setErrors(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    const f = formData;

    if (!f.fullName.trim()) e.fullName = "Required";
    if (!f.dateOfBirth || new Date().getFullYear() - new Date(f.dateOfBirth).getFullYear() < 18)
      e.dateOfBirth = "Must be 18+";
    if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(f.phone)) e.phone = "10-digit number required";
    if (!f.address.trim()) e.address = "Required";
    if (!f.bankName) e.bankName = "Required";
    if (!f.accountType) e.accountType = "Required";
    if (!f.paymentMethod) e.paymentMethod = "Required";

    if (f.paymentMethod === "upi" && !f.upiId.includes("@"))
      e.upiId = "Valid UPI ID required";

    if (f.paymentMethod === "card") {
      if (!/^\d{16}$/.test(f.cardNumber)) e.cardNumber = "16-digit required";
      if (!/^\d{2}\/\d{2}$/.test(f.cardExpiry)) e.cardExpiry = "MM/YY required";
      if (!/^\d{3}$/.test(f.cardCvv)) e.cardCvv = "3-digit CVV required";
    }

    if (!f.initialDeposit || f.initialDeposit < 1000)
      e.initialDeposit = "Min ₹1,000";
    if (!f.panCard) e.panCard = "Required";
    if (!f.aadhaarCard) e.aadhaarCard = "Required";
    if (!f.signature) e.signature = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const Field = ({ label, name, type = "text", ...props }) => (
    <div>
      <label>{label} *</label>
      <input
        type={type}
        name={name}
        value={type === "file" ? undefined : formData[name]}
        onChange={handleChange}
        style={s.input(errors[name])}
        {...props}
      />
      {errors[name] && <div style={s.error}>{errors[name]}</div>}
    </div>
  );

  const Select = ({ label, name, options }) => (
    <div>
      <label>{label} *</label>
      <select name={name} value={formData[name]}
        onChange={handleChange} style={s.input(errors[name])}>
        {options.map(([v, t]) => (
          <option key={v} value={v}>{t}</option>
        ))}
      </select>
      {errors[name] && <div style={s.error}>{errors[name]}</div>}
    </div>
  );

  return (
    <form onSubmit={e => { e.preventDefault(); if (validate()) alert("Account Created!"); }}>
      <h2 style={s.section}>Personal Info</h2>
      <Field label="Full Name" name="fullName" />
      <div style={s.row}>
        <Field label="DOB" name="dateOfBirth" type="date" />
        <Field label="Phone" name="phone" maxLength="10" />
      </div>
      <Field label="Email" name="email" type="email" />
      <Field label="Address" name="address" />

      <h2 style={s.section}>Account</h2>
      <Select label="Bank" name="bankName"
        options={[["","Choose"],["sbi","SBI"],["icici","ICICI"],["hdfc","HDFC"]]} />
      <Select label="Type" name="accountType"
        options={[["","Select"],["savings","Savings"],["current","Current"]]} />

      <h2 style={s.section}>Payment</h2>
      <Select label="Method" name="paymentMethod"
        options={[["","Select"],["upi","UPI"],["card","Card"]]} />

      {formData.paymentMethod === "upi" &&
        <Field label="UPI ID" name="upiId" />}

      {formData.paymentMethod === "card" &&
        <>
          <Field label="Card Number" name="cardNumber" maxLength="16" />
          <div style={s.row}>
            <Field label="Expiry" name="cardExpiry" />
            <Field label="CVV" name="cardCvv" type="password" />
          </div>
        </>
      }

      <Field label="Initial Deposit" name="initialDeposit" type="number" />

      <h2 style={s.section}>Documents</h2>
      <div style={s.row}>
        <Field label="PAN" name="panCard" type="file" />
        <Field label="Aadhaar" name="aadhaarCard" type="file" />
      </div>
      <Field label="Signature" name="signature" type="file" />

      <button type="submit" style={s.btn}>Submit & Pay</button>
    </form>
  );
}
