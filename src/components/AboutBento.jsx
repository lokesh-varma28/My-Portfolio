import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Terminal,
  Copy,
  Check,
  Smartphone,
  Globe,
  Database,
  Award,
  Zap,
  Code
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

export default function AboutBento() {
  const [istTime, setIstTime] = useState('');
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyNpxCommand = () => {
    navigator.clipboard.writeText('npx natralokesh');
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Title Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          ABOUT & INSIGHTS
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Architecting Products That{' '}
          <span className="gradient-text-cyan-blue">Inspire</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Full-Stack & Mobile Developer based in Andhra Pradesh, India — bridging user interface design with rock-solid engineering.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Bio Highlight (Spans 2 cols) */}
        <SpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Full Stack & Mobile Engineer
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              I specialize in end-to-end software development, delivering high-speed web apps with React 19 and Tailwind CSS alongside native-feel mobile applications with React Native and Expo.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              My engineering stack covers modern state management, RESTful APIs with Node.js & Express, cloud databases like Supabase & MongoDB, and smooth UI motion with Framer Motion & GSAP.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Zap className="w-4 h-4" /> Production Ready
            </span>
            <span>•</span>
            <span>Clean Code Philosophy</span>
          </div>
        </SpotlightCard>

        {/* Card 2: Location Card (Peravaram, AP, India with Live IST Clock) */}
        <SpotlightCard className="p-6 flex flex-col justify-between bg-gradient-to-b from-slate-900/80 to-slate-950/80">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-mono">
                LOCATION & TIME
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="flex items-start gap-3 my-2">
              <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
              <div>
                <h4 className="font-display font-bold text-white text-base">
                  Peravaram
                </h4>
                <p className="text-xs text-slate-400">
                  Andhra Pradesh, India 🇮🇳
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              Local Time (IST)
            </div>
            <div className="font-mono text-xl font-bold text-white tracking-wider">
              {istTime || '06:30:00 PM'}
            </div>
          </div>
        </SpotlightCard>

        {/* Card 3: Mobile Engineering Focus Card */}
        <SpotlightCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-white mb-2">
              React Native & Expo
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Building smooth cross-platform mobile apps for iOS & Android with native navigation, offline caching, and responsive UI components.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {['Expo Router', 'Native Modules', 'Gesture Handler', 'AsyncStorage'].map((item) => (
              <span key={item} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-purple-300">
                {item}
              </span>
            ))}
          </div>
        </SpotlightCard>

        {/* Card 4: Terminal Command Box (Spans 2 cols) */}
        <SpotlightCard className="md:col-span-2 p-6 bg-[#040814] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>INTERACTIVE CLI PROFILE</span>
              </div>
              <button
                onClick={copyNpxCommand}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                {copiedTerminal ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>npx natralokesh</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#02050c] border border-slate-800/90 font-mono text-xs text-slate-300 space-y-1.5">
              <p className="text-slate-500"># Run in your local terminal to view developer card</p>
              <p className="text-cyan-400">
                $ <span className="text-white font-semibold">npx natralokesh</span>
              </p>
              <div className="pt-2 text-slate-400 border-t border-slate-800/60 leading-relaxed">
                <p>✔ Fetching Natra Lokesh developer profile...</p>
                <p className="text-emerald-400">✔ Full Stack Developer & React Native Developer</p>
                <p className="text-purple-300">✔ GitHub: github.com/lokesh-varma28</p>
                <p className="text-cyan-300">✔ Contact: lokeshvarmakshatriya@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-[11px] font-mono text-slate-500 text-right">
            Node.js & NPM Ecosystem Compatible
          </div>
        </SpotlightCard>

        {/* Card 5: Full Stack Backend & DB Focus */}
        <SpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Backend & Cloud Infrastructure
                </h3>
                <p className="text-xs text-slate-400 font-mono">Node.js • Express • MongoDB • Supabase</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Designing scalable RESTful APIs, securing authentication flows, and building real-time databases using Supabase and MongoDB to power modern frontend and mobile clients.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-cyan-400 font-bold">Node / Express</div>
              <div className="text-[10px] text-slate-400 mt-0.5">REST APIs</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-emerald-400 font-bold">Supabase</div>
              <div className="text-[10px] text-slate-400 mt-0.5">PostgreSQL & Auth</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <div className="text-xs text-purple-400 font-bold">MongoDB</div>
              <div className="text-[10px] text-slate-400 mt-0.5">NoSQL DB</div>
            </div>
          </div>
        </SpotlightCard>

      </div>
    </section>
  );
}
