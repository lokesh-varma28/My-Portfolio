import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

function HeroStatsPills() {
  const { stats } = portfolioData.hero;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
    >
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center glass-panel"
        >
          <div className="font-display font-bold text-xs text-white">
            {stat.value}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-0.5">
            {stat.label}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default memo(HeroStatsPills);
