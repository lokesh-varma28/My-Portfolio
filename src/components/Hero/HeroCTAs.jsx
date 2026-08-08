import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../data/portfolioData';

function HeroCTAs() {
  const [copied, setCopied] = useState(false);
  const { cta } = portfolioData.hero;

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(cta.copyEmail.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#3b82f6', '#a855f7'],
    });
    setTimeout(() => setCopied(false), 2000);
  }, [cta.copyEmail.email]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
    >
      {/* Primary CTA */}
      <a
        href={cta.primary.href}
        className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-display font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300"
      >
        <span>{cta.primary.text}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>

      {/* Secondary CTA */}
      <a
        href={cta.secondary.href}
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass-panel-interactive border-slate-700 text-slate-200 font-display font-semibold text-sm hover:text-white"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
        <span>{cta.secondary.text}</span>
      </a>

      {/* Copy Email Action */}
      <button
        onClick={handleCopyEmail}
        className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full glass-panel border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors text-xs font-mono"
        title="Copy Email to Clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied Email!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{cta.copyEmail.text}</span>
          </>
        )}
      </button>
    </motion.div>
  );
}

export default memo(HeroCTAs);
