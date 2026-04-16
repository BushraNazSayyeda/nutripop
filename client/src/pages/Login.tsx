import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGetOtp = () => {
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
      toast.success('OTP sent! Use 123456 for demo');
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp !== '123456') {
      toast.error('Invalid OTP. Use 123456 for demo');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(phone);
      toast.success('Login successful! Welcome to NutriPop 🌾');
      navigate('/');
    }, 800);
  };

  return (
    <div className="page-bg login-bg">
      <div className="login-card">
        <div className="login-icon-wrap">
          <span style={{ fontSize: '28px' }}>📱</span>
        </div>
        <h2 className="login-title">Login or Sign Up</h2>
        <p className="login-subtitle">Enter your phone number to get started</p>

        {!otpSent ? (
          <>
            <label className="form-label">Phone Number</label>
            <div className="phone-input-row">
              <span className="phone-prefix">+91</span>
              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="form-input phone-input"
                maxLength={10}
              />
            </div>
            <button
              className="btn-submit-full"
              onClick={handleGetOtp}
              disabled={loading}
              style={{ marginTop: '16px' }}
            >
              {loading ? 'Sending OTP...' : 'Get OTP →'}
            </button>
          </>
        ) : (
          <>
            <p style={{ color: '#6B5B4E', marginBottom: '16px', fontSize: '14px' }}>
              OTP sent to +91 {phone}
            </p>
            <div className="otp-boxes">
              {otpValues.map((val, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  className="otp-box"
                />
              ))}
            </div>
            <button
              className="btn-submit-full"
              onClick={handleVerify}
              disabled={loading || otpValues.join('').length < 6}
              style={{ marginTop: '20px' }}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              className="btn-text"
              onClick={() => { setOtpSent(false); setOtpValues(['','','','','','']); }}
              style={{ marginTop: '10px' }}
            >
              Change phone number
            </button>
          </>
        )}

        <p className="login-secure">
          <Shield size={14} /> Secure & Private
        </p>
      </div>
    </div>
  );
}
