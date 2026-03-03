import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Award, BarChart3 } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const judgeName = localStorage.getItem('judgeName');
  const [hasEvaluations, setHasEvaluations] = useState(false);

  useEffect(() => {
    const checkEvaluations = () => {
      let found = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i)?.startsWith('evaluation_')) {
          found = true;
          break;
        }
      }
      setHasEvaluations(found);
    };
    
    checkEvaluations();
    window.addEventListener('storage', checkEvaluations);
    return () => window.removeEventListener('storage', checkEvaluations);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('judgeName');
    localStorage.removeItem('judgeAge');
    localStorage.removeItem('judgeGender');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f172a] shadow-md px-6 py-4 flex justify-between items-center border-b border-slate-800 text-white">
      <Link to="/dashboard" className="text-xl font-bold tracking-tight flex items-center gap-3 group">
        <div className="bg-gradient-to-br from-[#2563eb] to-blue-800 p-2 rounded-lg shadow-md group-hover:shadow-blue-500/20 transition-all">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="leading-tight">Innovation Marathon 2026</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Government of Education</span>
        </div>
      </Link>
      
      {judgeName && (
        <div className="flex items-center gap-6">
          {hasEvaluations && (
            <Link 
              to="/district-overview"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-200 hover:text-white bg-blue-900/30 hover:bg-blue-800/50 px-4 py-2 rounded-lg transition-colors border border-blue-800/50"
            >
              <BarChart3 className="w-4 h-4" />
              District Overview
            </Link>
          )}
          
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-semibold text-white">{judgeName}</span>
            <span className="text-xs text-yellow-500 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
              Senior Judge
            </span>
          </div>
          <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg transition-colors border border-slate-700"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Portal</span>
          </button>
        </div>
      )}
    </header>
  );
}
