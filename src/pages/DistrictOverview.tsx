import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Building2,
  Users,
  Lightbulb,
  Trophy,
  BarChart3,
  Medal,
  ArrowLeft
} from 'lucide-react';
import { districtStats, schoolPerformances, topProjects, scoreDistributions } from '../data/districtData';

const AnimatedNumber = ({ value, isDecimal = false }: { value: number | string, isDecimal?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (typeof value === 'string') return;
    let start = 0;
    const end = value;
    const duration = 1200;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  if (typeof value === 'string') return <span>{value}</span>;
  return <span>{isDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}</span>;
};

export default function DistrictOverview() {
  const navigate = useNavigate();

  useEffect(() => {
    const judgeName = localStorage.getItem('judgeName');
    if (!judgeName) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary flex items-center gap-2 text-[12px] w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-2 text-[11px] font-500 text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live Evaluation Monitoring
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total Schools', value: districtStats.totalSchools, icon: Building2 },
          { label: 'Total Teams', value: districtStats.totalTeams, icon: Users },
          { label: 'Avg Innovation', value: districtStats.averageInnovationScore, icon: Lightbulb, isDecimal: true, suffix: '/10' },
          { label: 'Top School', value: districtStats.topPerformingSchool, icon: Trophy, isText: true },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="dashboard-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-[rgba(255,209,0,0.1)] flex items-center justify-center text-[var(--accent-yellow)]">
                <stat.icon className="w-4 h-4" />
              </div>
              <h3 className="text-[11px] font-500 text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</h3>
            </div>
            <div className="stat-number flex items-baseline gap-1">
              {stat.isText ? (
                <span className="text-[15px] text-white">{stat.value}</span>
              ) : (
                <>
                  <AnimatedNumber value={stat.value} isDecimal={stat.isDecimal} />
                  {stat.suffix && <span className="text-[12px] text-[var(--text-muted)]">{stat.suffix}</span>}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 card-static overflow-hidden"
        >
          <div className="section-header">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[var(--accent-yellow)]" />
              <h2 className="text-[18px] font-600 text-white">School Performance</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="table-header border-b border-[var(--border-subtle)]">
                  <th className="p-4 font-500">School Name</th>
                  <th className="p-4 font-500 text-center">Teams</th>
                  <th className="p-4 font-500 text-center">Avg Score</th>
                  <th className="p-4 font-500 text-center">Highest</th>
                  <th className="p-4 font-500 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)]">
                {schoolPerformances.map((school) => (
                  <tr key={school.id} className="table-row">
                    <td className="p-4 text-[13px] font-500 text-white">{school.name}</td>
                    <td className="p-4 text-center text-[13px] text-[var(--text-muted)]">{school.totalTeams}</td>
                    <td className="p-4 text-center text-[13px] text-[var(--text-muted)]">{school.averageScore.toFixed(1)}</td>
                    <td className="p-4 text-center text-[13px] text-[var(--text-muted)]">{school.highestScore}</td>
                    <td className="p-4 text-center">
                      <span className={`status-badge ${
                        school.status === 'Excellent' ? 'status-excellent' :
                        school.status === 'Good' ? 'status-good' :
                        'status-developing'
                      }`}>
                        {school.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Distribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="card-static overflow-hidden flex flex-col"
        >
          <div className="section-header">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-[var(--accent-yellow)]" />
              <h2 className="text-[18px] font-600 text-white">Score Distribution</h2>
            </div>
          </div>
          <div className="p-6 flex-grow flex flex-col justify-center gap-6">
            {scoreDistributions.map((dist, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-[11px] font-500 text-[var(--text-muted)] uppercase tracking-wider">{dist.category}</span>
                  <span className="text-[13px] font-600 text-white">{dist.averageScore}/10</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dist.averageScore * 10}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + (index * 0.1) }}
                    className="progress-fill"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Projects */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="card-static overflow-hidden"
      >
        <div className="section-header">
          <div className="flex items-center gap-3">
            <Medal className="w-5 h-5 text-[var(--accent-yellow)]" />
              <h2 className="text-[18px] font-600 text-white">Top 5 District Projects</h2>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {topProjects.map((project) => (
            <div key={project.id} className="rounded-xl p-5 border border-[var(--border-subtle)] bg-[var(--panel-bg)] relative">
              <div className="absolute -top-2.5 -left-2.5 w-7 h-7 rounded-md bg-[rgba(255,209,0,0.15)] border border-[rgba(255,209,0,0.3)] text-[var(--accent-yellow)] font-700 text-[11px] flex items-center justify-center">
                #{project.rank}
              </div>
              <h3 className="font-600 text-[13px] text-white mb-1 mt-3 line-clamp-2">{project.title}</h3>
              <p className="text-[10px] font-500 text-[var(--text-muted)] mb-4">{project.schoolName}</p>
              <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-between items-center">
                <span className="text-[10px] font-500 text-[var(--text-muted)] uppercase tracking-wider">Score</span>
                <span className="text-[16px] font-700 text-[var(--accent-yellow)]">{project.score}<span className="text-[11px] text-[var(--text-muted)]">/40</span></span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
