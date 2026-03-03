import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LayoutGrid, Filter, ArrowUpDown, CheckCircle, Clock, BarChart3 } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import { GoogleGenAI, Modality } from "@google/genai";

let sessionVoicePlayed = false;

export default function Dashboard() {
  const navigate = useNavigate();
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const judgeName = localStorage.getItem('judgeName');
    if (!judgeName) {
      navigate('/');
      return;
    }

    const hasPlayed = localStorage.getItem("voicePlayed");
    if (hasPlayed === "true" || sessionVoicePlayed) return;

    const gender = localStorage.getItem("judgeGender");

    const speak = async () => {
      try {
        // Stop any previous audio context
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }

        const text = `Welcome ${judgeName}, to the Code Unnati Innovation Marathon Digital Evaluation Platform. Please select a project to begin your assessment.`;

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const voiceName = gender === "Male" ? "Zephyr" : "Kore";

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
          audioCtxRef.current = audioCtx;
          const binaryString = window.atob(base64Audio);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const int16Array = new Int16Array(bytes.buffer);
          const float32Array = new Float32Array(int16Array.length);
          for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
          }
          const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
          audioBuffer.copyToChannel(float32Array, 0);
          const source = audioCtx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioCtx.destination);
          source.start();

          localStorage.setItem("voicePlayed", "true");
          sessionVoicePlayed = true;
        }
      } catch (error) {
        console.error("Error playing voice:", error);
      }
    };

    speak();

    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    };
  }, [navigate]);

  const stats = [
    { label: 'Total Projects', value: '30', icon: LayoutGrid },
    { label: 'Evaluated', value: '04', icon: CheckCircle },
    { label: 'Pending', value: '26', icon: Clock },
    { label: 'Avg. Score', value: '8.4', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="dashboard-card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-500 text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-[var(--accent-yellow)] opacity-70" />
            </div>
            <h3 className="stat-number">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="card-static p-3 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2 text-[12px]">
            <Filter className="w-3.5 h-3.5" />
            Filter by District
          </button>
          <button className="btn-secondary flex items-center gap-2 text-[12px]">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by ID
          </button>
        </div>
        <p className="text-[11px] font-500 text-[var(--text-muted)]">
          30 Projects &middot; Live Monitoring
        </p>
      </div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index % 8) * 0.04 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
