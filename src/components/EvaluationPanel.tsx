import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardCheck, CheckCircle2 } from 'lucide-react';

interface EvaluationPanelProps {
  projectId: string;
}

export default function EvaluationPanel({ projectId }: EvaluationPanelProps) {
  const storageKey = `evaluation_${projectId}`;

  const [scores, setScores] = useState({
    innovation: 0,
    feasibility: 0,
    impact: 0,
    presentation: 0
  });
  const [comments, setComments] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setScores(parsed.scores || { innovation: 0, feasibility: 0, impact: 0, presentation: 0 });
      setComments(parsed.comments || '');
    }
  }, [projectId, storageKey]);

  const totalScore = scores.innovation + scores.feasibility + scores.impact + scores.presentation;

  const handleScoreChange = (category: keyof typeof scores, value: number) => {
    setScores(prev => ({ ...prev, [category]: value }));
    setSaved(false);
  };

  const handleSubmit = () => {
    localStorage.setItem(storageKey, JSON.stringify({ scores, comments, totalScore }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const categories = [
    { key: 'innovation', label: 'Innovation & Originality' },
    { key: 'feasibility', label: 'Technical Feasibility' },
    { key: 'impact', label: 'Impact & Scalability' },
    { key: 'presentation', label: 'Presentation & UX' }
  ] as const;

  return (
    <div className="evaluation-panel">
      {/* Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-[var(--border-subtle)]">
        <div className="w-9 h-9 rounded-lg bg-[rgba(255,209,0,0.1)] text-[var(--accent-yellow)] flex items-center justify-center">
          <ClipboardCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-section-title text-white">Evaluation Portal</h3>
          <p className="text-[11px] font-500 text-[var(--text-muted)]">Official Assessment Panel</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-6 py-6">
        {categories.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between items-end mb-2">
              <label className="text-[12px] font-500 text-[var(--text-muted)] uppercase tracking-wider">{label}</label>
              <div className="flex items-baseline gap-1">
                <span className="text-[18px] font-700 text-white">{scores[key]}</span>
                <span className="text-[11px] font-500 text-[var(--text-muted)]">/10</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={scores[key]}
              onChange={(e) => handleScoreChange(key, parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="divider my-2" />

      {/* Cumulative Score */}
      <div className="cumulative-score">
        <p className="text-[11px] font-500 text-[var(--text-muted)] uppercase tracking-wider mb-1">Cumulative Score</p>
        <div className="flex items-baseline gap-2">
          <motion.span
            key={totalScore}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-[40px] font-700 text-[var(--accent-yellow)]"
          >
            {totalScore}
          </motion.span>
          <span className="text-[16px] font-500 text-[var(--text-muted)]">/40</span>
        </div>
      </div>

      {/* Remarks */}
      <div className="mb-5">
        <label className="block text-[12px] font-500 text-[var(--text-muted)] uppercase tracking-wider mb-2">Official Remarks</label>
        <textarea
          rows={3}
          value={comments}
          onChange={(e) => { setComments(e.target.value); setSaved(false); }}
          className="w-full p-4 bg-[#0B2238] border border-[var(--border-subtle)] text-white text-[13px] rounded-lg outline-none focus:border-[var(--accent-yellow)] transition-colors resize-none"
          placeholder="Provide technical feedback and evaluation notes..."
        />
      </div>

      {/* Finalize */}
      <button
        onClick={handleSubmit}
        className="btn-primary w-full py-3 text-[14px] font-600"
      >
        Finalize Evaluation
      </button>

      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 p-3 text-[12px] font-500 rounded-md border flex items-center gap-2 justify-center bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4" />
            Assessment Recorded Successfully
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
