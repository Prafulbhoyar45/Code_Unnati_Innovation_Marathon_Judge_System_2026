import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const judgeName = localStorage.getItem('judgeName') || 'Judge';
  const isHeroPage = location.pathname === '/';

  return (
    <header className="header-bar">
      {/* Left: Console Title */}
      <div className="console-title">
        Digital Evaluation Console
      </div>

      {/* Right: Search + User */}
      <div className="flex items-center gap-4">
        {!isHeroPage && (
          <div className="hidden md:flex items-center bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg px-3 py-2 w-56 focus-within:border-[var(--accent-yellow)]">
            <Search className="w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-transparent border-none outline-none text-[13px] ml-2 w-full text-white placeholder:text-[var(--text-muted)]"
            />
          </div>
        )}

        <button className="relative p-2 text-[var(--text-muted)] hover:text-white transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--accent-yellow)] border-2 border-[var(--topbar-bg)]" />
        </button>

        <div className="h-6 w-px bg-[var(--border-subtle)] hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-600 text-white leading-none">{judgeName}</p>
            <p className="text-[10px] font-600 text-[var(--accent-yellow)] mt-0.5">Official Evaluator</p>
          </div>
          <div className="w-9 h-9 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-white flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
        </div>

        <button className="lg:hidden p-2 text-[var(--text-muted)] hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
