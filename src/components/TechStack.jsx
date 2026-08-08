import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub
} from 'react-icons/fa6';
import {
  SiTypescript,
  SiExpo,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiSupabase,
  SiMongodb,
  SiPostman
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import SpotlightCard from './SpotlightCard';

const CATEGORIES = ['All', 'Frontend', 'Mobile', 'Backend', 'Database', 'Tools'];

const SKILLS_MATRIX = [
  // Frontend
  {
    name: 'HTML5',
    category: 'Frontend',
    level: 'Advanced',
    icon: FaHtml5,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    desc: 'Semantic web layout, accessibility, and modern HTML5 standards.'
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    level: 'Advanced',
    icon: FaCss3Alt,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    desc: 'Glassmorphism, responsive grids, animations, and flexbox.'
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    level: 'Advanced',
    icon: FaJs,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    desc: 'ES Next syntax, async/await, closures, and modern web APIs.'
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    level: 'Advanced',
    icon: SiTypescript,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    desc: 'Static typing, interface contracts, generics, and type safety.'
  },
  {
    name: 'React.js',
    category: 'Frontend',
    level: 'Advanced',
    icon: FaReact,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    desc: 'React 19, Server Components, custom hooks, and virtual DOM.'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 'Advanced',
    icon: SiTailwindcss,
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    desc: 'Utility-first CSS v4, dark mode styling, and dynamic themes.'
  },
  {
    name: 'Redux Toolkit',
    category: 'Frontend',
    level: 'Advanced',
    icon: SiRedux,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    desc: 'Global state management, RTK Query, slices, and store configuration.'
  },

  // Mobile
  {
    name: 'React Native',
    category: 'Mobile',
    level: 'Advanced',
    icon: FaReact,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    desc: 'Cross-platform mobile apps for iOS & Android with native feel.'
  },
  {
    name: 'Expo',
    category: 'Mobile',
    level: 'Advanced',
    icon: SiExpo,
    color: 'text-slate-200',
    bg: 'bg-slate-700/20',
    border: 'border-slate-700/40',
    desc: 'Expo Router, EAS builds, OTA updates, and native device APIs.'
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    level: 'Proficient',
    icon: FaNodeJs,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    desc: 'Asynchronous event-driven server runtime environment.'
  },
  {
    name: 'Express.js',
    category: 'Backend',
    level: 'Proficient',
    icon: SiExpress,
    color: 'text-slate-300',
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    desc: 'RESTful API routing, middleware architecture, and security.'
  },

  // Database
  {
    name: 'Supabase',
    category: 'Database',
    level: 'Proficient',
    icon: SiSupabase,
    color: 'text-emerald-300',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    desc: 'PostgreSQL database, real-time subscriptions, and auth.'
  },
  {
    name: 'MongoDB',
    category: 'Database',
    level: 'Proficient',
    icon: SiMongodb,
    color: 'text-emerald-500',
    bg: 'bg-emerald-600/10',
    border: 'border-emerald-600/30',
    desc: 'Document-oriented NoSQL database modeling and data queries.'
  },

  // Tools
  {
    name: 'Git',
    category: 'Tools',
    level: 'Advanced',
    icon: FaGitAlt,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    desc: 'Version control, feature branching, merging, and commits.'
  },
  {
    name: 'GitHub',
    category: 'Tools',
    level: 'Advanced',
    icon: FaGithub,
    color: 'text-slate-200',
    bg: 'bg-slate-700/20',
    border: 'border-slate-700/40',
    desc: 'Repository hosting, pull requests, and CI/CD collaboration.'
  },
  {
    name: 'VS Code',
    category: 'Tools',
    level: 'Advanced',
    icon: VscVscode,
    color: 'text-blue-400',
    bg: 'bg-blue-600/10',
    border: 'border-blue-600/30',
    desc: 'Primary IDE environment, extensions, and debugging setup.'
  },
  {
    name: 'Postman',
    category: 'Tools',
    level: 'Proficient',
    icon: SiPostman,
    color: 'text-orange-500',
    bg: 'bg-orange-600/10',
    border: 'border-orange-600/30',
    desc: 'API endpoint testing, environment variables, and debugging.'
  }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_MATRIX
    : SKILLS_MATRIX.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          TECHNICAL STACK
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Core Technologies & <span className="gradient-text-cyan-blue">Tools</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Technologies Natra Lokesh utilizes to build modern full-stack web and cross-platform mobile applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <SpotlightCard className="p-5 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${skill.bg} ${skill.border} border flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                        {skill.level}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Category</span>
                    <span className="text-purple-300">{skill.category}</span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
