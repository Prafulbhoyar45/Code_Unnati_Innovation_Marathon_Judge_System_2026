import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { motion, AnimatePresence } from 'motion/react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const showSidebar = ['/dashboard', '/project', '/district-overview'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex min-h-screen bg-[var(--primary-bg)]">
      {showSidebar && (
        <div className="sidebar-fixed">
          <Sidebar />
        </div>
      )}

      <div className={`flex flex-col flex-1 ${showSidebar ? 'main-content-shifted' : 'w-full'}`}>
        <Header />

        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="flex-1 px-6 lg:px-8 py-6 max-w-[1440px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="py-6 border-t border-[var(--border-subtle)]">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-[11px] font-500 text-[var(--text-muted)] tracking-wide">
                Powered by Code Unnati | A Skill Development Initiative
              </p>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 opacity-60">
                Official Digital Evaluation Platform 2026
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
