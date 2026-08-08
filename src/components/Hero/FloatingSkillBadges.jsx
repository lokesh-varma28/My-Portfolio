import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs } from 'react-icons/fa6';
import { SiExpo, SiSupabase } from 'react-icons/si';

function FloatingSkillBadges() {
  return (
    <>
      {/* Badge 1: React 19 (Top-Left) */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        className="absolute -top-3 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl glass-panel border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 shadow-xl hidden sm:flex"
      >
        <FaReact className="w-4 h-4 text-cyan-400 animate-spin-slow" />
        <span>React 19</span>
      </motion.div>

      {/* Badge 2: Expo Mobile (Top-Right) */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -top-3 -right-4 sm:-right-6 px-3 py-1.5 rounded-xl glass-panel border-purple-500/40 text-purple-300 text-xs font-mono flex items-center gap-1.5 shadow-xl hidden sm:flex"
      >
        <SiExpo className="w-4 h-4 text-purple-400" />
        <span>Expo</span>
      </motion.div>

      {/* Badge 3: Node.js (Bottom-Left) */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -bottom-3 -left-4 sm:-left-6 px-3 py-1.5 rounded-xl glass-panel border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 shadow-xl hidden sm:flex"
      >
        <FaNodeJs className="w-4 h-4 text-emerald-400" />
        <span>Node.js</span>
      </motion.div>

      {/* Badge 4: Supabase (Bottom-Right) */}
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-3 -right-4 sm:-right-6 px-3 py-1.5 rounded-xl glass-panel border-emerald-400/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 shadow-xl hidden sm:flex"
      >
        <SiSupabase className="w-4 h-4 text-emerald-400" />
        <span>Supabase</span>
      </motion.div>
    </>
  );
}

export default memo(FloatingSkillBadges);
