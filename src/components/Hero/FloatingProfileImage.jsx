import { memo } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import profileImg from '../../assets/images/lokesh.jpeg';
import FloatingSkillBadges from './FloatingSkillBadges';

function FloatingProfileImage() {
  const { personalInfo } = portfolioData;

  return (
    <div className="relative flex justify-center items-center w-full my-6 lg:my-0 py-2">
      {/* Slow & Elegant Floating Motion Wrapper */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative group w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]"
      >
        {/* Subtle Blue & Purple Dual Ambient Glow Behind Image */}
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/30 via-blue-600/30 to-purple-600/35 blur-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

        {/* Glassmorphism Container Frame */}
        <div className="relative rounded-3xl p-2.5 sm:p-3 bg-slate-900/60 backdrop-blur-2xl border border-slate-700/70 shadow-2xl group-hover:border-cyan-500/40 transition-colors duration-300">

          {/* Inner Image Container Preserving Aspect Ratio */}
          <div className="relative rounded-2xl overflow-hidden bg-[#070c1b] border border-slate-800/90 shadow-inner">

            {/* Real Profile Image from src/assets/images */}
            <img
              src={profileImg}
              alt={personalInfo.name}
              loading="eager"
              decoding="async"
              className="w-full h-auto max-h-[460px] object-cover object-top rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
            />

            {/* Subtle Gradient Overlay at Bottom of Image for Smooth Glass Integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070c1b] via-transparent to-transparent opacity-60" />

            {/* Floating Top Availability Badge inside Glass Frame */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-cyan-300 shadow-lg">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {personalInfo.location.flag} {personalInfo.location.city}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                PRO
              </span>
            </div>

            {/* Floating Bottom Name Overlay inside Glass Frame */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/90 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-white leading-tight">
                  {personalInfo.name}
                </h3>
                <p className="text-[10px] font-mono text-slate-400">
                  {personalInfo.role}
                </p>
              </div>
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center shrink-0">
                <span className="w-full h-full bg-[#070c1b] rounded-[7px] flex items-center justify-center font-display font-bold text-xs text-cyan-400">
                  {personalInfo.monogram}
                </span>
              </span>
            </div>

          </div>
        </div>

        {/* Modular Floating Skill Badges */}
        <FloatingSkillBadges />

      </motion.div>
    </div>
  );
}

export default memo(FloatingProfileImage);
