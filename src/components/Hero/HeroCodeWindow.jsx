import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

function HeroCodeWindow() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('config');

  const { codeSnippet } = portfolioData.hero;

  const copySnippet = useCallback(() => {
    navigator.clipboard.writeText(codeSnippet.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeSnippet.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-12 max-w-3xl mx-auto rounded-2xl glass-panel border-slate-800/90 shadow-2xl overflow-hidden text-left"
    >
      {/* IDE Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#080d1a]/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            {codeSnippet.filename}
          </span>
        </div>

        {/* Tab & Copy Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
              activeTab === 'config'
                ? 'bg-slate-800 text-cyan-400 border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Config
          </button>
          <button
            onClick={copySnippet}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#050914]/95 text-slate-300">
        <p className="text-slate-500">// Portfolio Architecture & Stack Config</p>
        <pre className="text-cyan-300 font-mono leading-relaxed mt-2 whitespace-pre-wrap">
          {codeSnippet.content}
        </pre>
      </div>
    </motion.div>
  );
}

export default memo(HeroCodeWindow);
