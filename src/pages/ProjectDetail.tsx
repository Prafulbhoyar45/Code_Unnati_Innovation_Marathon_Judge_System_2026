import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  FileText,
  PlaySquare,
  Smartphone,
  MessageSquare,
  Activity,
  ExternalLink
} from 'lucide-react';
import EvaluationPanel from '../components/EvaluationPanel';
import ChatbotSection from '../components/ChatbotSection';
import { projects } from '../data/projects';

type Tab = 'overview' | 'demo' | 'ai-qa' | 'simulation';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  useEffect(() => {
    const judgeName = localStorage.getItem('judgeName');
    if (!judgeName) {
      navigate('/');
      return;
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card-static text-center p-10">
          <h2 className="text-page-title text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary px-6 py-3"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'demo', label: 'Demo', icon: PlaySquare },
    { id: 'ai-qa', label: 'AI Q&A', icon: MessageSquare },
    { id: 'simulation', label: 'Simulation', icon: Activity },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-secondary flex items-center gap-2 text-[12px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[10px] font-600 px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-white uppercase tracking-wider">
            {project.teamId}
          </span>
          <span className="text-meta text-[11px]">
            {project.district} &middot; {project.category}
          </span>
        </div>
      </div>

      {/* Main Grid: 2fr 1fr */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 items-start">
        {/* Left */}
        <div className="flex flex-col gap-6">
          {/* Team Banner */}
          <div className="card-static p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-14 h-14 rounded-full border-3 border-[var(--bg-surface)] overflow-hidden">
                    <img src={`https://picsum.photos/seed/member${i}${project.id}/200/200`} alt="Member" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-14 h-14 rounded-full border-3 border-[var(--bg-surface)] flex items-center justify-center bg-[var(--panel-bg)] text-white font-700 text-sm">
                  +2
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-page-title text-white mb-2">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-500 px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">{project.category}</span>
                  <span className="text-[10px] font-500 px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-muted)]">{project.district}</span>
                  <span className="text-[10px] font-500 px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-muted)]">{project.teamId}</span>
                </div>
                <p className="text-body">{project.tagline}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card-static flex items-center p-1.5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`project-tab ${activeTab === tab.id ? 'project-tab-active' : ''}`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-static p-6 lg:p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-md bg-[var(--bg-elevated)] flex items-center justify-center text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h2 className="text-section-title text-white">Executive Summary</h2>
                  </div>
                  <p className="text-body text-[15px] leading-relaxed mb-5">{project.shortDescription}</p>
                  <div className="divider my-5" />
                  <p className="text-body leading-relaxed">{project.fullDescription}</p>
                </motion.div>
              )}

              {activeTab === 'demo' && (
                <motion.div
                  key="demo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="card-static p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-md bg-red-500/10 flex items-center justify-center text-red-400">
                        <PlaySquare className="w-5 h-5" />
                      </div>
                      <h3 className="text-section-title text-white">Solution Demo</h3>
                    </div>
                    <div className="aspect-video rounded-md bg-black overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        src={project.videoURL}
                        title="Demo Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>

                  <div className="card-static p-6 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-4 w-full justify-center">
                      <div className="w-9 h-9 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <h3 className="text-section-title text-white">Interactive Prototype</h3>
                    </div>
                    <div className="p-4 bg-white rounded-2xl mb-4">
                      <QRCodeSVG value={project.demoLink} size={140} level="H" fgColor="#0A3D62" />
                    </div>
                    <p className="text-meta mb-6">Scan to test the live prototype</p>
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full py-3 flex items-center justify-center gap-2 text-[13px]"
                    >
                      Launch Web Demo
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai-qa' && (
                <motion.div
                  key="ai-qa"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ChatbotSection summary={project.shortDescription} />
                </motion.div>
              )}

              {activeTab === 'simulation' && (
                <motion.div
                  key="simulation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="card-static p-10 flex flex-col items-center justify-center text-center min-h-[350px]"
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-white/5 text-[var(--text-secondary)]">
                    <Activity className="w-7 h-7" />
                  </div>
                  <h3 className="text-section-title text-white mb-2">Live Simulation Environment</h3>
                  <p className="text-body max-w-md">
                    This module is being prepared for the final round.
                    Evaluators will be able to simulate real-world stress tests.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Evaluation */}
        <div>
          <EvaluationPanel projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
