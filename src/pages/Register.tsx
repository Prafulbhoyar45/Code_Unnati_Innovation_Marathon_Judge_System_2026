import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, User, Calendar, Users } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const dashboardURL = 'https://judgesystem2026.vercel.app/dashboard';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !age) return;

    localStorage.setItem('judgeName', fullName);
    localStorage.setItem('judgeAge', age);
    localStorage.setItem('judgeGender', gender);
    localStorage.setItem("voicePlayed", "false");

    navigate('/dashboard');
  };

  return (
    <div className="hero-grid">
      {/* ── Left: Branding ── */}
      <motion.div
        className="hero-left"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Badge */}
        <div className="hero-badge">
          <ShieldCheck className="w-4 h-4" />
          Official Evaluation Portal
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Code Unnati<br />
          <span>Innovation Marathon 2026</span>
        </h1>

        {/* Description */}
        <p className="hero-description">
          A premier skill development initiative empowering the next generation
          of innovators. Access the secure evaluation console to review and score
          student projects.
        </p>

        {/* Metrics */}
        <div className="hero-metrics">
          <div className="hero-metric">
            <h2>500+</h2>
            <span>Expert Judges</span>
          </div>
          <div className="metric-divider" />
          <div className="hero-metric">
            <h2>1200+</h2>
            <span>Innovations</span>
          </div>
        </div>
      </motion.div>

      {/* ── Right: Auth + QR ── */}
      <div className="hero-right">
        {/* Auth Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="auth-panel"
        >
          <div className="mb-8">
            <h2 className="auth-title">Judge Login</h2>
            <p className="auth-subtitle">Secure evaluation access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="auth-label">Full Name</label>
              <div className="input-wrapper">
                <User />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="auth-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="auth-label">Age</label>
                <div className="input-wrapper">
                  <Calendar />
                  <input
                    type="number"
                    required
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="auth-input"
                    placeholder="Age"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="auth-label">Gender</label>
                <div className="input-wrapper">
                  <Users />
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="auth-input appearance-none"
                  >
                    <option value="" className="bg-[var(--bg-elevated)]">Select</option>
                    <option value="Male" className="bg-[var(--bg-elevated)]">Male</option>
                    <option value="Female" className="bg-[var(--bg-elevated)]">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="auth-button w-full flex items-center justify-center gap-2"
            >
              Enter Evaluation Console
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </motion.div>

        {/* QR Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="qr-card"
        >
          <div className="qr-box">
            <QRCodeSVG value={dashboardURL} size={240} level="H" includeMargin fgColor="#08243D" />
          </div>
          <p className="text-[14px] font-600 text-white mt-5">Scan to Access Dashboard</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-1">Point your camera at the QR code</p>
        </motion.div>
      </div>
    </div>
  );
}
