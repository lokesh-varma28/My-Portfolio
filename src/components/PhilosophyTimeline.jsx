import {
  Code,
  Layout,
  Zap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const PRINCIPLES = [
  {
    step: '01',
    title: 'Modern Architecture & Clean Code',
    desc: 'Writing maintainable, modular React 19 and React Native code with strict component separation, reusable design systems, and robust error handling.',
    icon: Code,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30'
  },
  {
    step: '02',
    title: 'Mobile-First & Pixel-Perfect Design',
    desc: 'Prioritizing mobile responsiveness, fluid layout breakpoints, glassmorphism visual hierarchy, and 60FPS micro-animations across all device screens.',
    icon: Layout,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  {
    step: '03',
    title: 'High Performance & Optimization',
    desc: 'Ensuring fast page load times, lightweight bundle sizes, smooth Lenis scrolling, lazy loading, and rapid API responses with Node.js & Supabase.',
    icon: Zap,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  {
    step: '04',
    title: 'Continuous Testing & Modern Tooling',
    desc: 'Leveraging Git version control, Postman API testing, VS Code automation, and modern web standards for seamless production releases.',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  }
];

export default function PhilosophyTimeline() {
  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          ENGINEERING STANDARDS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Development <span className="gradient-text-cyan-blue">Philosophy</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Core principles guiding Natra Lokesh's approach to crafting world-class digital applications.
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRINCIPLES.map((item) => {
          const IconComp = item.icon;
          return (
            <SpotlightCard key={item.step} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.border} border flex items-center justify-center ${item.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-extrabold text-slate-700 tracking-wider">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Natra Lokesh Benchmark</span>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
