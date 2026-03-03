import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Lightbulb,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('judgeName');
    localStorage.removeItem('judgeAge');
    localStorage.removeItem('judgeGender');
    localStorage.removeItem('voicePlayed');
    navigate('/');
  };

  const navSections = [
    {
      label: 'MAIN',
      items: [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Lightbulb, label: 'Innovation Projects', path: '/dashboard' },
        { icon: ClipboardCheck, label: 'Evaluation Panel', path: '/dashboard' },
      ]
    },
    {
      label: 'ANALYTICS',
      items: [
        { icon: BarChart3, label: 'District Analytics', path: '/district-overview' },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { icon: Settings, label: 'Settings', path: '/dashboard' },
      ]
    },
  ];

  return (
    <aside className="sidebar-container">
      {/* Brand */}
      <div className="sidebar-brand">
        <img src="/assets/code-unnati.png" alt="Code Unnati" className="sidebar-logo" />
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-primary">Code Unnati</span>
          <span className="sidebar-brand-secondary">Innovation Marathon 2026</span>
        </div>
      </div>

      {/* Navigation with Sections */}
      <nav className="sidebar-nav">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="sidebar-section-label">{section.label}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-item ${isActive ? 'sidebar-item-active' : ''}`
                }
              >
                <item.icon className="sidebar-icon" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="mb-3 px-2">
          <p className="text-[11px] font-medium text-[var(--text-muted)] mb-2">Evaluation Progress</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '33%' }} />
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-1.5">4 of 12 evaluated</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-400/10 transition-all text-[13px] font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>End Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
