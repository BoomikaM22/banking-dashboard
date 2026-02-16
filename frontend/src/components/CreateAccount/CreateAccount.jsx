import React, { useState } from "react";

export default function BankingRegistration() {

  const [formData, setFormData] = useState({
    fullName:"",dateOfBirth:"",email:"",phone:"",address:"",
    bankName:"",accountType:"",paymentMethod:"",
    upiId:"",cardNumber:"",cardExpiry:"",cardCvv:"",
    initialDeposit:"",panCard:null,aadhaarCard:null,signature:null
  });

  const [errors,setErrors]=useState({});

  const s={
    container:{
      minHeight:"100vh",
      background:"#f8fafc",
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding:"40px"
    },
    card:{
      background:"#ffffff",
      width:"100%",
      maxWidth:"750px",
      padding:"40px",
      borderRadius:"16px",
      boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
    },
    title:{fontSize:"26px",fontWeight:"700",marginBottom:"25px"},
    section:{fontWeight:"600",margin:"25px 0 10px",color:"#334155"},
    input:(err)=>({
      width:"100%",
      padding:"10px",
      border:`2px solid ${err?"#ef4444":"#e2e8f0"}`,
      borderRadius:"8px",
      marginTop:"5px"
    }),
    error:{color:"#ef4444",fontSize:"12px",marginTop:"3px"},
    row:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"15px"},
    btn:{
      width:"100%",
      padding:"14px",
      background:"linear-gradient(135deg,#6366f1,#4f46e5)",
      color:"#fff",
      border:"none",
      borderRadius:"8px",
      marginTop:"25px",
      fontWeight:"600",
      cursor:"pointer"
    }
  };

  const handleChange=e=>{
    const {name,value,type,files}=e.target;
    const val=name==="cardNumber"
      ?value.replace(/\D/g,"").slice(0,16)
      :value;
    setFormData(p=>({...p,[name]:type==="file"?files[0]:val}));
    setErrors(p=>({...p,[name]:""}));
  };

  const validate=()=>{
    const e={},f=formData;
    if(!f.fullName.trim()) e.fullName="Required";
    if(!f.dateOfBirth||new Date().getFullYear()-new Date(f.dateOfBirth).getFullYear()<18)
      e.dateOfBirth="Must be 18+";
    if(!/\S+@\S+\.\S+/.test(f.email)) e.email="Valid email required";
    if(!/^\d{10}$/.test(f.phone)) e.phone="10-digit required";
    if(!f.address.trim()) e.address="Required";
    if(!f.bankName) e.bankName="Required";
    if(!f.accountType) e.accountType="Required";
    if(!f.paymentMethod) e.paymentMethod="Required";

    if(f.paymentMethod==="upi"&&!f.upiId.includes("@"))
      e.upiId="Valid UPI ID required";

    if(f.paymentMethod==="card"){
      if(!/^\d{16}$/.test(f.cardNumber)) e.cardNumber="16-digit required";
      if(!/^\d{2}\/\d{2}$/.test(f.cardExpiry)) e.cardExpiry="MM/YY";
      if(!/^\d{3}$/.test(f.cardCvv)) e.cardCvv="3-digit CVV";
    }

    if(!f.initialDeposit||f.initialDeposit<1000)
      e.initialDeposit="Min ₹1,000";
    if(!f.panCard) e.panCard="Required";
    if(!f.aadhaarCard) e.aadhaarCard="Required";
    if(!f.signature) e.signature="Required";

    setErrors(e);
    return Object.keys(e).length===0;
  };

  const Field=({label,name,type="text",...props})=>(
    <div>
      <label>{label} *</label>
      <input
        type={type}
        name={name}
        value={type==="file"?undefined:formData[name]}
        onChange={handleChange}
        style={s.input(errors[name])}
        {...props}
      />
      {errors[name]&&<div style={s.error}>{errors[name]}</div>}
    </div>
  );

  const Select=({label,name,options})=>(
    <div>
      <label>{label} *</label>
      <select name={name}
        value={formData[name]}
        onChange={handleChange}
        style={s.input(errors[name])}>
        {options.map(([v,t])=>
          <option key={v} value={v}>{t}</option>
        )}
      </select>
      {errors[name]&&<div style={s.error}>{errors[name]}</div>}
    </div>
  );

  return(
    <div style={s.container}>
      <div style={s.card}>

        <div style={s.title}>🏦 Open New Bank Account</div>

        <form onSubmit={e=>{
          e.preventDefault();
          if(validate()) alert("Account Created Successfully!");
        }}>

          <div style={s.section}>Personal Information</div>
          <Field label="Full Name" name="fullName"/>
          <div style={s.row}>
            <Field label="DOB" name="dateOfBirth" type="date"/>
            <Field label="Phone" name="phone" maxLength="10"/>
          </div>
          <Field label="Email" name="email" type="email"/>
          <Field label="Address" name="address"/>

          <div style={s.section}>Account Details</div>
          <Select label="Bank" name="bankName"
            options={[["","Choose"],["sbi","SBI"],["icici","ICICI"],["hdfc","HDFC"]]} />
          <Select label="Type" name="accountType"
            options={[["","Select"],["savings","Savings"],["current","Current"]]} />

          <div style={s.section}>Payment Details</div>
          <Select label="Method" name="paymentMethod"
            options={[["","Select"],["upi","UPI"],["card","Card"]]} />

          {formData.paymentMethod==="upi" &&
            <Field label="UPI ID" name="upiId"/>}

          {formData.paymentMethod==="card" &&
            <>
              <Field label="Card Number" name="cardNumber" maxLength="16"/>
              <div style={s.row}>
                <Field label="Expiry (MM/YY)" name="cardExpiry"/>
                <Field label="CVV" name="cardCvv" type="password"/>
              </div>
            </>
          }

          <Field label="Initial Deposit" name="initialDeposit" type="number"/>

          <div style={s.section}>Upload Documents</div>
          <div style={s.row}>
            <Field label="PAN" name="panCard" type="file"/>
            <Field label="Aadhaar" name="aadhaarCard" type="file"/>
          </div>
          <Field label="Signature" name="signature" type="file"/>

          <button type="submit" style={s.btn}>
            Submit & Complete Registration
          </button>

        </form>
      </div>
    </div>
  );
}
