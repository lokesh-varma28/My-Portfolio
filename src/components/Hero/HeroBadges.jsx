import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

function HeroBadges() {
  const { personalInfo } = portfolioData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full glass-panel border-cyan-500/30 text-cyan-300 text-xs font-medium mb-6 shadow-xl shadow-cyan-500/10"
    >
      {/* Pulse Dot */}
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
      </span>

      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
      <span>{personalInfo.status.badgeText}</span>
      
      <span className="text-slate-500">|</span>

      <span className="flex items-center gap-1 text-slate-300 font-mono text-[11px]">
        <MapPin className="w-3 h-3 text-purple-400" />
        {personalInfo.location.city}, {personalInfo.location.state}
      </span>
    </motion.div>
  );
}

export default memo(HeroBadges);
