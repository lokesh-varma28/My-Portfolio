import { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

function AnimatedHeading() {
  const [index, setIndex] = useState(0);
  const headlines = portfolioData.hero.animatedHeadlines;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  return (
    <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
      {/* Primary Display Title */}
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.1]">
        {portfolioData.hero.headline.prefix}{' '}
        <span className="gradient-text-cyan-blue inline-block">
          {portfolioData.hero.headline.highlight}
        </span>{' '}
        {portfolioData.hero.headline.suffix}
      </h1>

      {/* Dynamic Animated Sub-Headline Carousel */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-1.5 sm:gap-0 sm:h-12 overflow-hidden">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 sm:mr-2">
          SPECIALIZING IN
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-display font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/10">
              {headlines[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default memo(AnimatedHeading);
