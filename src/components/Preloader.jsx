import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const diff = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + diff, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white"
        >
          {/* Subtle aurora glow center */}
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6">
            {/* Logo Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mb-8 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-2xl shadow-cyan-500/20"
            >
              <div className="w-full h-full bg-[#070b14] rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                NL
              </div>
            </motion.div>

            {/* Name & Role */}
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xl font-bold tracking-tight text-white mb-1"
            >
              Natra Lokesh
            </motion.h2>
            <p className="text-xs text-slate-400 font-mono tracking-wider uppercase mb-8">
              Full Stack & Mobile Engineer
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-slate-900/80 border border-slate-800 rounded-full h-1.5 p-0.5 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="w-full flex justify-between items-center text-xs font-mono text-slate-400 mt-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Initializing System...
              </span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
