import React, { useState } from 'react';

const BankAccountCreation = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    nationality: '',
    
    // Step 2: Regulatory & Financial
    taxId: '',
    occupation: '',
    employerName: '',
    annualIncome: '',
    sourceOfFunds: '',
    isPEP: 'no',
    
    // Step 3: Security Setup
    username: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: '',
    
    // Step 4: Documents
    panCard: null,
    aadharCard: null,
    photoId: null,
    signature: null,
    addressProof: null,
    termsAccepted: false,
    dataConsent: false,
    
    // Step 5: Payment & Bank Selection
    selectedBank: '',
    accountType: '',
    initialDeposit: '',
    paymentMethod: '',
    cardNumber: '',
    cardHolderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    upiId: '',
    netBankingBank: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    accountNumber: '',
    ifscCode: '',
    branchName: ''
  });

  const totalSteps = 5;

  // Bank options with IFSC codes
  const banks = [
    { name: 'State Bank of India (SBI)', code: 'SBI', ifsc: 'SBIN0001234', branch: 'Main Branch' },
    { name: 'HDFC Bank', code: 'HDFC', ifsc: 'HDFC0001234', branch: 'Central Branch' },
    { name: 'ICICI Bank', code: 'ICICI', ifsc: 'ICIC0001234', branch: 'Downtown Branch' },
    { name: 'Axis Bank', code: 'AXIS', ifsc: 'UTIB0001234', branch: 'City Center' },
    { name: 'Punjab National Bank (PNB)', code: 'PNB', ifsc: 'PUNB0001234', branch: 'Regional Office' },
    { name: 'Bank of Baroda', code: 'BOB', ifsc: 'BARB0001234', branch: 'Corporate Branch' }
  ];

  const styles = {
    bankingRegistration: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif'
    },
    container: {
      maxWidth: '800px',
      width: '100%',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      padding: '40px',
      animation: 'fadeIn 0.5s ease-in'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    h1: {
      color: '#2d3748',
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },
    headerP: {
      color: '#718096',
      fontSize: '16px',
      margin: '0'
    },
    progressContainer: {
      marginBottom: '40px'
    },
    progressBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
      position: 'relative'
    },
    progressStepWrapper: {
      display: 'flex',
      alignItems: 'center',
      flex: '1'
    },
    progressStepWrapperLast: {
      display: 'flex',
      alignItems: 'center',
      flex: '0'
    },
    progressStep: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#e2e8f0',
      color: '#718096',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      zIndex: '2'
    },
    progressStepActive: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#667eea',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      zIndex: '2',
      boxShadow: '0 0 0 4px rgba(102, 126, 234, 0.2)'
    },
    progressStepCompleted: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: '#48bb78',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      zIndex: '2'
    },
    progressLine: {
      flex: '1',
      height: '3px',
      background: '#e2e8f0',
      transition: 'background 0.3s ease',
      margin: '0 -2px'
    },
    progressLineCompleted: {
      flex: '1',
      height: '3px',
      background: '#48bb78',
      transition: 'background 0.3s ease',
      margin: '0 -2px'
    },
    progressLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '11px',
      color: '#718096',
      fontWeight: '500'
    },
    progressLabel: {
      flex: '1',
      textAlign: 'center',
      transition: 'color 0.3s ease'
    },
    progressLabelActive: {
      flex: '1',
      textAlign: 'center',
      color: '#667eea',
      fontWeight: '600'
    },
    formStep: {
      animation: 'slideIn 0.4s ease'
    },
    h2: {
      color: '#2d3748',
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '8px',
      marginTop: '0'
    },
    stepDescription: {
      color: '#718096',
      fontSize: '14px',
      marginBottom: '30px'
    },
    formGroup: {
      marginBottom: '24px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      color: '#2d3748',
      fontWeight: '500',
      marginBottom: '8px',
      fontSize: '14px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#2d3748',
      transition: 'all 0.3s ease',
      background: 'white',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    inputError: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #f56565',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#2d3748',
      transition: 'all 0.3s ease',
      background: 'white',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#2d3748',
      transition: 'all 0.3s ease',
      background: 'white',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#2d3748',
      transition: 'all 0.3s ease',
      background: 'white',
      boxSizing: 'border-box',
      fontFamily: 'inherit'
    },
    errorMessage: {
      display: 'block',
      color: '#f56565',
      fontSize: '12px',
      marginTop: '6px',
      fontWeight: '500'
    },
    infoText: {
      color: '#718096',
      fontSize: '12px',
      marginTop: '6px',
      fontStyle: 'italic'
    },
    passwordWrapper: {
      position: 'relative'
    },
    togglePassword: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '18px',
      padding: '4px',
      opacity: '0.6'
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '8px'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '12px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '12px',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    checkboxLabelError: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      cursor: 'pointer',
      padding: '12px',
      border: '2px solid #f56565',
      borderRadius: '8px',
      background: '#fff5f5'
    },
    radioInput: {
      width: '18px',
      height: '18px',
      cursor: 'pointer',
      accentColor: '#667eea'
    },
    checkboxSpan: {
      flex: '1',
      color: '#2d3748',
      fontSize: '14px'
    },
    link: {
      color: '#667eea',
      textDecoration: 'none',
      fontWeight: '500'
    },
    fileSelected: {
      color: '#48bb78',
      fontSize: '13px',
      marginTop: '6px',
      fontWeight: '500'
    },
    consentSection: {
      background: '#f7fafc',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    checkboxGroup: {
      marginBottom: '16px'
    },
    infoBox: {
      background: '#edf2f7',
      borderLeft: '4px solid #667eea',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '20px'
    },
    infoBoxStrong: {
      color: '#2d3748',
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px'
    },
    infoBoxP: {
      color: '#4a5568',
      fontSize: '13px',
      lineHeight: '1.5',
      margin: '0'
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '16px',
      marginTop: '40px',
      paddingTop: '30px',
      borderTop: '2px solid #e2e8f0'
    },
    btnPrimary: {
      padding: '14px 32px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#667eea',
      color: 'white',
      flex: '1',
      justifyContent: 'center'
    },
    btnSecondary: {
      padding: '14px 32px',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      background: 'white',
      color: '#667eea',
      border: '2px solid #667eea'
    },
    btnSuccess: {
      padding: '14px 32px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
      background: '#48bb78',
      color: 'white',
      flex: '1',
      justifyContent: 'center'
    },
    bankCard: {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    bankCardActive: {
      border: '2px solid #667eea',
      background: '#f0f4ff',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    bankIcon: {
      fontSize: '24px',
      marginBottom: '8px'
    },
    bankName: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '4px'
    },
    bankDetails: {
      fontSize: '12px',
      color: '#718096'
    },
    paymentOption: {
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    paymentOptionActive: {
      border: '2px solid #667eea',
      background: '#f0f4ff',
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    successModal: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1000',
      animation: 'fadeIn 0.3s ease'
    },
    successContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '500px',
      textAlign: 'center',
      animation: 'slideUp 0.3s ease'
    },
    successIcon: {
      fontSize: '64px',
      marginBottom: '20px'
    },
    successTitle: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#2d3748',
      marginBottom: '10px'
    },
    accountDetailBox: {
      background: '#f7fafc',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '20px',
      textAlign: 'left'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '12px',
      fontSize: '14px'
    },
    detailLabel: {
      color: '#718096',
      fontWeight: '500'
    },
    detailValue: {
      color: '#2d3748',
      fontWeight: '600'
    }
  };

  // Generate account number
  const generateAccountNumber = () => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      else {
        const age = new Date().getFullYear() - new Date(formData.dateOfBirth).getFullYear();
        if (age < 18) newErrors.dateOfBirth = 'Must be 18 or older';
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Valid 10-digit phone number required';
      }
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required';
    }

    if (currentStep === 2) {
      if (!formData.taxId.trim()) newErrors.taxId = 'Tax ID is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
      if (formData.occupation === 'employed' && !formData.employerName.trim()) {
        newErrors.employerName = 'Employer name is required';
      }
      if (!formData.annualIncome) newErrors.annualIncome = 'Annual income is required';
      if (!formData.sourceOfFunds) newErrors.sourceOfFunds = 'Source of funds is required';
    }

    if (currentStep === 3) {
      if (!formData.username.trim() || formData.username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters';
      }
      if (!formData.password || formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
        newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.securityQuestion) newErrors.securityQuestion = 'Security question is required';
      if (!formData.securityAnswer.trim()) newErrors.securityAnswer = 'Security answer is required';
    }

    if (currentStep === 4) {
      if (!formData.panCard) newErrors.panCard = 'PAN Card is required';
      if (!formData.aadharCard) newErrors.aadharCard = 'Aadhaar Card is required';
      if (!formData.photoId) newErrors.photoId = 'Photo ID is required';
      if (!formData.signature) newErrors.signature = 'Signature is required';
      if (!formData.addressProof) newErrors.addressProof = 'Address proof is required';
      if (!formData.termsAccepted) newErrors.termsAccepted = 'You must accept terms and conditions';
      if (!formData.dataConsent) newErrors.dataConsent = 'Data consent is required';
    }

    if (currentStep === 5) {
      if (!formData.selectedBank) newErrors.selectedBank = 'Please select a bank';
      if (!formData.accountType) newErrors.accountType = 'Please select account type';
      if (!formData.initialDeposit || parseFloat(formData.initialDeposit) < 500) {
        newErrors.initialDeposit = 'Minimum initial deposit is ₹500';
      }
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
      
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber)) {
          newErrors.cardNumber = 'Card number must be 16 digits';
        }
        if (!formData.cardHolderName.trim()) {
          newErrors.cardHolderName = 'Card holder name is required';
        }
        if (!formData.expiryMonth || !formData.expiryYear) {
          newErrors.expiryMonth = 'Expiry date is required';
        }
        if (!formData.cvv || !/^\d{3}$/.test(formData.cvv)) {
          newErrors.cvv = 'CVV must be 3 digits';
        }
      } else if (formData.paymentMethod === 'upi') {
        if (!formData.upiId.trim() || !formData.upiId.includes('@')) {
          newErrors.upiId = 'Valid UPI ID is required';
        }
      } else if (formData.paymentMethod === 'netbanking') {
        if (!formData.netBankingBank) {
          newErrors.netBankingBank = 'Please select your bank';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      // Generate account details
      const selectedBankData = banks.find(b => b.code === formData.selectedBank);
      const accountNumber = generateAccountNumber();
      
      setAccountDetails({
        accountNumber: accountNumber,
        ifscCode: selectedBankData.ifsc,
        branchName: selectedBankData.branch
      });
      
      setShowSuccessModal(true);
    }
  };

  const renderProgressBar = () => (
    <div style={styles.progressContainer}>
      <div style={styles.progressBar}>
        {[1, 2, 3, 4, 5].map(num => (
          <div key={num} style={num < 5 ? styles.progressStepWrapper : styles.progressStepWrapperLast}>
            <div style={step > num ? styles.progressStepCompleted : (step === num ? styles.progressStepActive : styles.progressStep)}>
              {step > num ? '✓' : num}
            </div>
            {num < 5 && <div style={step > num ? styles.progressLineCompleted : styles.progressLine} />}
          </div>
        ))}
      </div>
      <div style={styles.progressLabels}>
        <span style={step === 1 ? styles.progressLabelActive : styles.progressLabel}>Personal</span>
        <span style={step === 2 ? styles.progressLabelActive : styles.progressLabel}>Financial</span>
        <span style={step === 3 ? styles.progressLabelActive : styles.progressLabel}>Security</span>
        <span style={step === 4 ? styles.progressLabelActive : styles.progressLabel}>Documents</span>
        <span style={step === 5 ? styles.progressLabelActive : styles.progressLabel}>Payment</span>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div style={styles.formStep}>
      <h2 style={styles.h2}>Personal Information</h2>
      <p style={styles.stepDescription}>Please provide your basic details as they appear on your government ID</p>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Full Name *</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          style={errors.fullName ? styles.inputError : styles.input}
        />
        {errors.fullName && <span style={styles.errorMessage}>{errors.fullName}</span>}
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            style={errors.dateOfBirth ? styles.inputError : styles.input}
          />
          {errors.dateOfBirth && <span style={styles.errorMessage}>{errors.dateOfBirth}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Nationality *</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            style={errors.nationality ? styles.inputError : styles.select}
          >
            <option value="">Select</option>
            <option value="indian">Indian</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="other">Other</option>
          </select>
          {errors.nationality && <span style={styles.errorMessage}>{errors.nationality}</span>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            style={errors.email ? styles.inputError : styles.input}
          />
          {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit number"
            maxLength="10"
            style={errors.phone ? styles.inputError : styles.input}
          />
          {errors.phone && <span style={styles.errorMessage}>{errors.phone}</span>}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Residential Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Complete address including street, city, state, and postal code"
          rows="3"
          style={errors.address ? {...styles.textarea, border: '2px solid #f56565'} : styles.textarea}
        />
        {errors.address && <span style={styles.errorMessage}>{errors.address}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.formStep}>
      <h2 style={styles.h2}>Regulatory & Financial Profile</h2>
      <p style={styles.stepDescription}>This information is required for compliance and account setup</p>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Tax ID Number (PAN/SSN) *</label>
        <input
          type="text"
          name="taxId"
          value={formData.taxId}
          onChange={handleChange}
          placeholder="e.g., ABCDE1234F"
          style={errors.taxId ? styles.inputError : styles.input}
        />
        {errors.taxId && <span style={styles.errorMessage}>{errors.taxId}</span>}
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Occupation *</label>
          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            style={errors.occupation ? styles.inputError : styles.select}
          >
            <option value="">Select</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-Employed</option>
            <option value="business">Business Owner</option>
            <option value="student">Student</option>
            <option value="retired">Retired</option>
          </select>
          {errors.occupation && <span style={styles.errorMessage}>{errors.occupation}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Employer Name {formData.occupation === 'employed' && '*'}</label>
          <input
            type="text"
            name="employerName"
            value={formData.employerName}
            onChange={handleChange}
            placeholder="Company/Organization name"
            style={errors.employerName ? styles.inputError : styles.input}
          />
          {errors.employerName && <span style={styles.errorMessage}>{errors.employerName}</span>}
        </div>
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Annual Income *</label>
          <select
            name="annualIncome"
            value={formData.annualIncome}
            onChange={handleChange}
            style={errors.annualIncome ? styles.inputError : styles.select}
          >
            <option value="">Select range</option>
            <option value="0-5L">₹0 - ₹5 Lakhs</option>
            <option value="5-10L">₹5 - ₹10 Lakhs</option>
            <option value="10-25L">₹10 - ₹25 Lakhs</option>
            <option value="25L+">₹25 Lakhs+</option>
          </select>
          {errors.annualIncome && <span style={styles.errorMessage}>{errors.annualIncome}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Source of Funds *</label>
          <select
            name="sourceOfFunds"
            value={formData.sourceOfFunds}
            onChange={handleChange}
            style={errors.sourceOfFunds ? styles.inputError : styles.select}
          >
            <option value="">Select source</option>
            <option value="salary">Salary/Wages</option>
            <option value="business">Business Income</option>
            <option value="investment">Investment Returns</option>
            <option value="inheritance">Inheritance</option>
            <option value="savings">Savings</option>
          </select>
          {errors.sourceOfFunds && <span style={styles.errorMessage}>{errors.sourceOfFunds}</span>}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Politically Exposed Person (PEP) Status *</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="isPEP"
              value="no"
              checked={formData.isPEP === 'no'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            No, I am not a PEP
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="isPEP"
              value="yes"
              checked={formData.isPEP === 'yes'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            Yes, I hold or have held a prominent public position
          </label>
        </div>
        <p style={styles.infoText}>PEP: Government official, senior executive in state-owned enterprise, or close family member of such individuals</p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.formStep}>
      <h2 style={styles.h2}>Security Setup</h2>
      <p style={styles.stepDescription}>Create your account credentials and security questions</p>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Username *</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Choose a unique username"
          style={errors.username ? styles.inputError : styles.input}
        />
        {errors.username && <span style={styles.errorMessage}>{errors.username}</span>}
      </div>

      <div style={styles.formRow}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password *</label>
          <div style={styles.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 8 characters"
              style={errors.password ? styles.inputError : styles.input}
            />
            <button
              type="button"
              style={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
          <p style={styles.infoText}>Must include uppercase, lowercase, number, and special character</p>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password *</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            style={errors.confirmPassword ? styles.inputError : styles.input}
          />
          {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
        </div>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Security Question *</label>
        <select
          name="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleChange}
          style={errors.securityQuestion ? styles.inputError : styles.select}
        >
          <option value="">Select a question</option>
          <option value="pet">What was the name of your first pet?</option>
          <option value="school">What was the name of your elementary school?</option>
          <option value="city">In what city were you born?</option>
          <option value="mother">What is your mother's maiden name?</option>
        </select>
        {errors.securityQuestion && <span style={styles.errorMessage}>{errors.securityQuestion}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Security Answer *</label>
        <input
          type="text"
          name="securityAnswer"
          value={formData.securityAnswer}
          onChange={handleChange}
          placeholder="Your answer (case-sensitive)"
          style={errors.securityAnswer ? styles.inputError : styles.input}
        />
        {errors.securityAnswer && <span style={styles.errorMessage}>{errors.securityAnswer}</span>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div style={styles.formStep}>
      <h2 style={styles.h2}>Document Upload</h2>
      <p style={styles.stepDescription}>Upload all required documents for verification</p>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>PAN Card *</label>
        <input
          type="file"
          name="panCard"
          onChange={handleChange}
          accept="image/*,.pdf"
          style={errors.panCard ? styles.inputError : styles.input}
        />
        {formData.panCard && (
          <p style={styles.fileSelected}>✓ {formData.panCard.name}</p>
        )}
        {errors.panCard && <span style={styles.errorMessage}>{errors.panCard}</span>}
        <p style={styles.infoText}>Upload clear image or PDF of your PAN Card</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Aadhaar Card *</label>
        <input
          type="file"
          name="aadharCard"
          onChange={handleChange}
          accept="image/*,.pdf"
          style={errors.aadharCard ? styles.inputError : styles.input}
        />
        {formData.aadharCard && (
          <p style={styles.fileSelected}>✓ {formData.aadharCard.name}</p>
        )}
        {errors.aadharCard && <span style={styles.errorMessage}>{errors.aadharCard}</span>}
        <p style={styles.infoText}>Upload clear image or PDF of your Aadhaar Card</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Photo ID (Passport size) *</label>
        <input
          type="file"
          name="photoId"
          onChange={handleChange}
          accept="image/*"
          style={errors.photoId ? styles.inputError : styles.input}
        />
        {formData.photoId && (
          <p style={styles.fileSelected}>✓ {formData.photoId.name}</p>
        )}
        {errors.photoId && <span style={styles.errorMessage}>{errors.photoId}</span>}
        <p style={styles.infoText}>Upload a clear passport-size photograph</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Signature *</label>
        <input
          type="file"
          name="signature"
          onChange={handleChange}
          accept="image/*"
          style={errors.signature ? styles.inputError : styles.input}
        />
        {formData.signature && (
          <p style={styles.fileSelected}>✓ {formData.signature.name}</p>
        )}
        {errors.signature && <span style={styles.errorMessage}>{errors.signature}</span>}
        <p style={styles.infoText}>Upload an image of your signature on white paper</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Address Proof *</label>
        <input
          type="file"
          name="addressProof"
          onChange={handleChange}
          accept="image/*,.pdf"
          style={errors.addressProof ? styles.inputError : styles.input}
        />
        {formData.addressProof && (
          <p style={styles.fileSelected}>✓ {formData.addressProof.name}</p>
        )}
        {errors.addressProof && <span style={styles.errorMessage}>{errors.addressProof}</span>}
        <p style={styles.infoText}>Utility bill, Bank statement, or Rental agreement</p>
      </div>

      <div style={styles.consentSection}>
        <div style={styles.checkboxGroup}>
          <label style={errors.termsAccepted ? styles.checkboxLabelError : styles.checkboxLabel}>
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              style={styles.radioInput}
            />
            <span style={styles.checkboxSpan}>I accept the <a href="#terms" style={styles.link}>Terms and Conditions</a> *</span>
          </label>
          {errors.termsAccepted && <span style={styles.errorMessage}>{errors.termsAccepted}</span>}
        </div>

        <div style={styles.checkboxGroup}>
          <label style={errors.dataConsent ? styles.checkboxLabelError : styles.checkboxLabel}>
            <input
              type="checkbox"
              name="dataConsent"
              checked={formData.dataConsent}
              onChange={handleChange}
              style={styles.radioInput}
            />
            <span style={styles.checkboxSpan}>I consent to the processing of my personal data as per the <a href="#privacy" style={styles.link}>Privacy Policy</a> *</span>
          </label>
          {errors.dataConsent && <span style={styles.errorMessage}>{errors.dataConsent}</span>}
        </div>
      </div>

      <div style={styles.infoBox}>
        <strong style={styles.infoBoxStrong}>🔒 Your data is secure</strong>
        <p style={styles.infoBoxP}>All documents are encrypted and stored securely. They will only be used for account verification purposes.</p>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div style={styles.formStep}>
      <h2 style={styles.h2}>Payment & Bank Selection</h2>
      <p style={styles.stepDescription}>Choose your bank and make initial deposit payment</p>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Select Your Bank *</label>
        {banks.map(bank => (
          <div
            key={bank.code}
            style={formData.selectedBank === bank.code ? styles.bankCardActive : styles.bankCard}
            onClick={() => {
              setFormData(prev => ({ ...prev, selectedBank: bank.code }));
              setErrors(prev => ({ ...prev, selectedBank: '' }));
            }}
          >
            <div style={styles.bankIcon}>🏦</div>
            <div style={styles.bankName}>{bank.name}</div>
            <div style={styles.bankDetails}>
              IFSC: {bank.ifsc} • Branch: {bank.branch}
            </div>
          </div>
        ))}
        {errors.selectedBank && <span style={styles.errorMessage}>{errors.selectedBank}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Account Type *</label>
        <select
          name="accountType"
          value={formData.accountType}
          onChange={handleChange}
          style={errors.accountType ? styles.inputError : styles.select}
        >
          <option value="">Select Account Type</option>
          <option value="savings">Savings Account</option>
          <option value="current">Current Account</option>
          <option value="salary">Salary Account</option>
        </select>
        {errors.accountType && <span style={styles.errorMessage}>{errors.accountType}</span>}
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Initial Deposit Amount (₹) *</label>
        <input
          type="number"
          name="initialDeposit"
          value={formData.initialDeposit}
          onChange={handleChange}
          placeholder="Minimum ₹500"
          min="500"
          style={errors.initialDeposit ? styles.inputError : styles.input}
        />
        {errors.initialDeposit && <span style={styles.errorMessage}>{errors.initialDeposit}</span>}
        <p style={styles.infoText}>This amount will be credited to your new account</p>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Payment Method *</label>
        
        <div
          style={formData.paymentMethod === 'card' ? styles.paymentOptionActive : styles.paymentOption}
          onClick={() => {
            setFormData(prev => ({ ...prev, paymentMethod: 'card' }));
            setErrors(prev => ({ ...prev, paymentMethod: '' }));
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💳</div>
          <div style={{ fontWeight: '600' }}>Debit/Credit Card</div>
        </div>

        <div
          style={formData.paymentMethod === 'upi' ? styles.paymentOptionActive : styles.paymentOption}
          onClick={() => {
            setFormData(prev => ({ ...prev, paymentMethod: 'upi' }));
            setErrors(prev => ({ ...prev, paymentMethod: '' }));
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
          <div style={{ fontWeight: '600' }}>UPI Payment</div>
        </div>

        <div
          style={formData.paymentMethod === 'netbanking' ? styles.paymentOptionActive : styles.paymentOption}
          onClick={() => {
            setFormData(prev => ({ ...prev, paymentMethod: 'netbanking' }));
            setErrors(prev => ({ ...prev, paymentMethod: '' }));
          }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏦</div>
          <div style={{ fontWeight: '600' }}>Net Banking</div>
        </div>
        {errors.paymentMethod && <span style={styles.errorMessage}>{errors.paymentMethod}</span>}
      </div>

      {/* Card Payment Details */}
      {formData.paymentMethod === 'card' && (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Card Number *</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              style={errors.cardNumber ? styles.inputError : styles.input}
            />
            {errors.cardNumber && <span style={styles.errorMessage}>{errors.cardNumber}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Card Holder Name *</label>
            <input
              type="text"
              name="cardHolderName"
              value={formData.cardHolderName}
              onChange={handleChange}
              placeholder="Name on card"
              style={errors.cardHolderName ? styles.inputError : styles.input}
            />
            {errors.cardHolderName && <span style={styles.errorMessage}>{errors.cardHolderName}</span>}
          </div>

          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Expiry Month *</label>
              <select
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                style={errors.expiryMonth ? styles.inputError : styles.select}
              >
                <option value="">MM</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, '0')}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Expiry Year *</label>
              <select
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                style={errors.expiryMonth ? styles.inputError : styles.select}
              >
                <option value="">YYYY</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 + i}>
                    {2024 + i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {errors.expiryMonth && <span style={styles.errorMessage}>{errors.expiryMonth}</span>}

          <div style={styles.formGroup}>
            <label style={styles.label}>CVV *</label>
            <input
              type="password"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              maxLength="3"
              style={errors.cvv ? styles.inputError : styles.input}
            />
            {errors.cvv && <span style={styles.errorMessage}>{errors.cvv}</span>}
          </div>
        </>
      )}

      {/* UPI Payment Details */}
      {formData.paymentMethod === 'upi' && (
        <div style={styles.formGroup}>
          <label style={styles.label}>UPI ID *</label>
          <input
            type="text"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            placeholder="yourname@upi"
            style={errors.upiId ? styles.inputError : styles.input}
          />
          {errors.upiId && <span style={styles.errorMessage}>{errors.upiId}</span>}
        </div>
      )}

      {/* Net Banking Details */}
      {formData.paymentMethod === 'netbanking' && (
        <div style={styles.formGroup}>
          <label style={styles.label}>Select Your Bank *</label>
          <select
            name="netBankingBank"
            value={formData.netBankingBank}
            onChange={handleChange}
            style={errors.netBankingBank ? styles.inputError : styles.select}
          >
            <option value="">Select Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="axis">Axis Bank</option>
            <option value="pnb">Punjab National Bank</option>
          </select>
          {errors.netBankingBank && <span style={styles.errorMessage}>{errors.netBankingBank}</span>}
        </div>
      )}
    </div>
  );

  const renderSuccessModal = () => (
    <div style={styles.successModal} onClick={() => window.location.reload()}>
      <div style={styles.successContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.successIcon}>🎉</div>
        <h2 style={styles.successTitle}>Account Created Successfully!</h2>
        <p style={{ color: '#718096', marginBottom: '20px' }}>
          Your bank account has been created and payment of ₹{formData.initialDeposit} has been processed.
        </p>
        
        <div style={styles.accountDetailBox}>
          <h3 style={{ marginTop: '0', color: '#2d3748', fontSize: '16px' }}>Account Details</h3>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Account Number:</span>
            <span style={styles.detailValue}>{accountDetails.accountNumber}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Bank:</span>
            <span style={styles.detailValue}>
              {banks.find(b => b.code === formData.selectedBank)?.name}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>IFSC Code:</span>
            <span style={styles.detailValue}>{accountDetails.ifscCode}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Branch:</span>
            <span style={styles.detailValue}>{accountDetails.branchName}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Account Type:</span>
            <span style={styles.detailValue}>
              {formData.accountType.charAt(0).toUpperCase() + formData.accountType.slice(1)}
            </span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Initial Balance:</span>
            <span style={styles.detailValue}>₹{parseFloat(formData.initialDeposit).toLocaleString()}</span>
          </div>
        </div>

        <button 
          style={{ ...styles.btnSuccess, marginTop: '20px' }}
          onClick={() => window.location.reload()}
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.bankingRegistration}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.h1}>🏦 Create New Bank Account</h1>
          <p style={styles.headerP}>Complete your account creation in {totalSteps} simple steps</p>
        </div>

        {renderProgressBar()}

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}

          <div style={styles.formActions}>
            {step > 1 && (
              <button type="button" onClick={handlePrev} style={styles.btnSecondary}>
                ← Previous
              </button>
            )}
            {step < totalSteps ? (
              <button type="button" onClick={handleNext} style={styles.btnPrimary}>
                Next →
              </button>
            ) : (
              <button type="submit" style={styles.btnSuccess}>
                Create Account & Pay
              </button>
            )}
          </div>
        </form>
      </div>

      {showSuccessModal && renderSuccessModal()}
    </div>
  );
};

export default BankAccountCreation;
  
