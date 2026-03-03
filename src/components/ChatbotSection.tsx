import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';

interface ChatbotSectionProps {
  summary: string;
}

export default function ChatbotSection({ summary }: ChatbotSectionProps) {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Welcome, Judge. I am the AI Evaluation Assistant. I have analyzed this project\'s documentation. How can I help you with your assessment today?' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isTyping]);

  const handleAsk = () => {
    if (!query.trim()) return;

    const userMsg = query.trim();
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerQuery = userMsg.toLowerCase();
      let response = "Based on the technical documentation, this project aims to provide a scalable solution. " + summary;

      if (lowerQuery.includes('what') || lowerQuery.includes('how') || lowerQuery.includes('explain')) {
        response = `Technical Analysis: ${summary}`;
      } else if (lowerQuery.includes('cost') || lowerQuery.includes('price')) {
        response = "The implementation strategy emphasizes cost-efficiency and resource optimization. " + summary.split('.')[0] + ".";
      } else if (lowerQuery.includes('impact') || lowerQuery.includes('benefit')) {
        response = "The social and technical impact is substantial. " + summary.split('.').slice(-2).join('.');
      }

      setChat(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="card-static flex flex-col h-[550px] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-3 border-b border-[var(--border-subtle)] bg-[var(--primary-blue-dark)]">
        <div className="w-8 h-8 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-white flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[14px] font-600 text-white">AI Evaluation Assistant</div>
          <p className="text-[10px] font-500 text-[var(--text-muted)]">Project Intelligence Module</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-5 overflow-y-auto space-y-5 bg-[var(--primary-blue-dark)]/30">
        {chat.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="shrink-0 mt-1">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-white'
                    : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                }`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
              </div>
              <div className={`p-3.5 text-[13px] font-400 leading-relaxed rounded-md ${
                msg.role === 'user'
                  ? 'bg-[var(--bg-elevated)] text-white border border-[var(--border-subtle)]'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="shrink-0 mt-1">
                <div className="w-7 h-7 rounded-md flex items-center justify-center bg-[var(--bg-elevated)] text-[var(--text-muted)]">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-md flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-secondary)] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
        <div className="flex gap-2 p-1.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-md focus-within:border-[var(--accent-yellow)]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder="Ask about technical feasibility, impact, or cost..."
            className="flex-grow px-3 py-2 bg-transparent outline-none text-[13px] font-400 text-white placeholder:text-[var(--text-muted)]"
          />
          <button
            onClick={handleAsk}
            disabled={!query.trim() || isTyping}
            className="p-2.5 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-white rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
