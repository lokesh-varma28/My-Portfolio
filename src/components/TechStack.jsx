import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaVialCircleCheck,
  FaRobot,
  FaFlask
} from 'react-icons/fa6';
import {
  SiTypescript,
  SiExpo,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiSupabase,
  SiMongodb,
  SiPostman,
  SiPython,
  SiDjango,
  SiFirebase,
  SiMysql
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { FaWandMagicSparkles, FaCube, FaBoltLightning, FaBoxArchive, FaTerminal } from 'react-icons/fa6';
import {
  SiThreedotjs,
  SiCursor,
  SiWindsurf,
  SiClaude,
  SiGooglegemini,
  SiGithubcopilot,
  SiCline,
  SiBruno,
  SiBootstrap,
  SiVercel,
  SiNetlify,
  SiRender,
  SiRailway,
  SiCloudflare
} from 'react-icons/si';
import SpotlightCard from './SpotlightCard';

const CATEGORIES = ['All', 'Frontend', 'Mobile', 'Backend', 'Database', 'Testing', 'Tools', 'AI Tools'];

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
  {
    name: 'Python',
    category: 'Backend',
    level: 'Proficient',
    icon: SiPython,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    desc: 'Scripting, automation, backend logic, and data processing.'
  },
  {
    name: 'Django',
    category: 'Backend',
    level: 'Proficient',
    icon: SiDjango,
    color: 'text-green-400',
    bg: 'bg-green-700/10',
    border: 'border-green-700/30',
    desc: 'Full-stack web framework with ORM, admin panel, and auth.'
  },
  {
    name: 'Django REST Framework',
    category: 'Backend',
    level: 'Proficient',
    icon: SiDjango,
    color: 'text-green-300',
    bg: 'bg-green-600/10',
    border: 'border-green-600/30',
    desc: 'Serializers, ViewSets, and RESTful API design with DRF.'
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
  {
    name: 'SQL',
    category: 'Database',
    level: 'Proficient',
    icon: SiMysql,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    desc: 'Relational database queries, joins, indexing, and schema design.'
  },
  {
    name: 'Firebase',
    category: 'Database',
    level: 'Proficient',
    icon: SiFirebase,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    desc: 'Google Firebase platform for auth, hosting, and cloud functions.'
  },
  {
    name: 'Firebase Firestore',
    category: 'Database',
    level: 'Proficient',
    icon: SiFirebase,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    desc: 'NoSQL cloud database with real-time sync and offline support.'
  },

  // Testing
  {
    name: 'Playwright',
    category: 'Testing',
    level: 'Proficient',
    icon: FaVialCircleCheck,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    desc: 'Cross-browser end-to-end test automation with Playwright.'
  },
  {
    name: 'E2E & API Testing',
    category: 'Testing',
    level: 'Proficient',
    icon: FaFlask,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    desc: 'End-to-end and API test coverage using structured test flows.'
  },
  {
    name: 'AI-assisted Testing',
    category: 'Testing',
    level: 'Proficient',
    icon: FaRobot,
    color: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/10',
    border: 'border-fuchsia-500/30',
    desc: 'AI-assisted test generation, debugging, and automated workflows.'
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
  ,
  // Frontend
  {
    name: 'Three.js',
    category: 'Frontend',
    level: 'Proficient',
    icon: SiThreedotjs,
    color: 'text-slate-200',
    bg: 'bg-slate-700/20',
    border: 'border-slate-700/40',
    desc: '3D graphics for the web, scenes, cameras, lighting, and interactive WebGL experiences.'
  },

  // AI Tools
  {
    name: 'Cursor',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiCursor,
    image: '/tools/cursor.svg',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    desc: 'AI-first code editor for fast refactors, multi-file edits, and pair programming.'
  },
  {
    name: 'Kiro',
    category: 'AI Tools',
    level: 'Proficient',
    icon: FaWandMagicSparkles,
    image: '/tools/kiro.svg',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    desc: 'Spec-driven AI IDE for planning features and generating structured code.'
  },
  {
    name: 'Antigravity',
    category: 'AI Tools',
    level: 'Proficient',
    icon: FaCube,
    image: '/tools/antigravity.svg',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    desc: 'Agent-first AI IDE for delegating coding tasks and automating workflows.'
  },
  {
    name: 'Windsurf',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiWindsurf,
    image: '/tools/windsurf.svg',
    color: 'text-cyan-300',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/30',
    desc: 'Agentic AI IDE for context-aware coding and rapid prototyping.'
  },
  {
    name: 'ChatGPT',
    category: 'AI Tools',
    level: 'Proficient',
    icon: FaRobot,
    image: '/tools/chatgpt.svg',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    desc: 'Prompt-driven debugging, code generation, and learning new concepts quickly.'
  },
  {
    name: 'Claude',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiClaude,
    image: '/tools/claude.svg',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    desc: 'Code review, architecture discussions, and long-context problem solving.'
  },
  {
    name: 'Gemini',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiGooglegemini,
    image: '/tools/gemini.svg',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    desc: 'Multimodal AI for research, code assistance, and content generation.'
  },
  {
    name: 'Grok AI',
    category: 'AI Tools',
    level: 'Proficient',
    icon: FaRobot,
    image: '/tools/grok.svg',
    url: 'https://grok.com/',
    color: 'text-slate-100',
    bg: 'bg-slate-800/40',
    border: 'border-slate-700/60',
    desc: 'Real-time reasoning, deep technical analysis, and code generation powered by Grok by xAI.'
  },
  {
    name: 'Thunder Client',
    category: 'Tools',
    level: 'Proficient',
    icon: FaBoltLightning,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    desc: 'Lightweight REST API client inside VS Code for testing endpoints, collections, and environments.'
  }
  ,
  {
    name: 'GitHub Copilot',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiGithubcopilot,
    image: '/tools/githubcopilot.svg',
    color: 'text-slate-200',
    bg: 'bg-slate-700/20',
    border: 'border-slate-700/40',
    desc: 'AI pair programmer inside the editor for completions, chat, and quick boilerplate.'
  },
  {
    name: 'Cline',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiCline,
    image: '/tools/cline.svg',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    desc: 'Autonomous AI coding agent for VS Code that edits files and runs commands with approval.'
  }
  ,
  {
    name: 'Bruno',
    category: 'Tools',
    level: 'Proficient',
    icon: SiBruno,
    image: '/tools/bruno.svg',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    desc: 'Open-source, offline-first API client for testing endpoints with Git-friendly collections.'
  },
  {
    name: 'Zustand',
    category: 'Frontend',
    level: 'Proficient',
    icon: FaBoxArchive,
    image: '/tools/zustand.svg',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    desc: 'Minimal, hook-based global state management for React without boilerplate.'
  },
  {
    name: 'Bootstrap',
    category: 'Frontend',
    level: 'Proficient',
    icon: SiBootstrap,
    image: '/tools/bootstrap.svg',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    desc: 'Responsive CSS framework for building clean, mobile-first layouts quickly.'
  },
  {
    name: 'Gemini CLI',
    category: 'AI Tools',
    level: 'Proficient',
    icon: SiGooglegemini,
    image: '/tools/geminicli.svg',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    desc: 'Terminal-based AI agent for coding, debugging, and automating tasks from the command line.'
  },
  {
    name: 'Agy CLI',
    category: 'AI Tools',
    level: 'Proficient',
    icon: FaTerminal,
    image: '/tools/agy.svg',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    desc: 'Antigravity command-line agent for delegating coding tasks and running workflows from the terminal.'
  },
  {
    name: 'Vercel',
    category: 'Tools',
    level: 'Proficient',
    icon: SiVercel,
    image: '/tools/vercel.svg',
    color: 'text-slate-200',
    bg: 'bg-slate-700/20',
    border: 'border-slate-700/40',
    desc: 'Frontend and serverless deployment with preview builds, environment variables, and edge functions.'
  },
  {
    name: 'Netlify',
    category: 'Tools',
    level: 'Proficient',
    icon: SiNetlify,
    image: '/tools/netlify.svg',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    desc: 'Static site hosting with Git-based deploys, forms, and serverless functions.'
  },
  {
    name: 'Render',
    category: 'Tools',
    level: 'Proficient',
    icon: SiRender,
    image: '/tools/render.svg',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    desc: 'Cloud platform for hosting web services, APIs, background workers, and databases.'
  },
  {
    name: 'Railway',
    category: 'Tools',
    level: 'Proficient',
    icon: SiRailway,
    image: '/tools/railway.svg',
    color: 'text-violet-300',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    desc: 'Instant deployment for backends and databases with simple environment management.'
  },
  {
    name: 'Cloudflare',
    category: 'Tools',
    level: 'Proficient',
    icon: SiCloudflare,
    image: '/tools/cloudflare.svg',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    desc: 'DNS, CDN, and edge platform for fast, secure delivery with Pages and Workers.'
  }
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS_MATRIX
    : SKILLS_MATRIX.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-0 py-12 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10 scroll-mt-28 sm:scroll-mt-28">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
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
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 sm:mb-12">
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
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
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
                <SpotlightCard className="p-3.5 sm:p-5 h-full flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      {skill.url ? (
                        <a
                          href={skill.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${skill.name} website`}
                          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${skill.bg} ${skill.border} border flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform duration-300 hover:border-cyan-400`}
                        >
                          {skill.image ? (
                            <img
                              src={skill.image}
                              alt={`${skill.name} logo`}
                              className={`w-4 h-4 sm:w-5 sm:h-5 object-contain ${['Zustand', 'Bootstrap'].includes(skill.name) ? 'brightness-125 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]' : ''}`}
                              loading="lazy"
                            />
                          ) : (
                            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${skill.name === 'Three.js' ? 'brightness-125 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]' : ''}`} />
                          )}
                        </a>
                      ) : (
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${skill.bg} ${skill.border} border flex items-center justify-center ${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                          {skill.image ? (
                            <img
                              src={skill.image}
                              alt={`${skill.name} logo`}
                              className={`w-4 h-4 sm:w-5 sm:h-5 object-contain ${['Zustand', 'Bootstrap'].includes(skill.name) ? 'brightness-125 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]' : ''}`}
                              loading="lazy"
                            />
                          ) : (
                            <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${skill.name === 'Three.js' ? 'brightness-125 drop-shadow-[0_1px_4px_rgba(255,255,255,0.25)]' : ''}`} />
                          )}
                        </div>
                      )}
                      <span className="flex items-center gap-1 text-[9px] sm:text-[11px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-slate-800">
                        <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-cyan-400" />
                        {skill.level}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-white text-sm sm:text-base mb-1 group-hover:text-cyan-400 transition-colors truncate sm:whitespace-normal">
                      {skill.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-500">
                    <span>Category</span>
                    <span className="text-purple-300 truncate ml-1">{skill.category}</span>
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
