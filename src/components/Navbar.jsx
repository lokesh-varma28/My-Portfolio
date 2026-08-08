import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, Sparkles, Send, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Mobile Dev', href: '#mobile' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#"
          className="group flex items-center gap-3 p-1.5 rounded-xl glass-panel-interactive border-slate-800/80 hover:border-cyan-500/50"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#080d1a] rounded-[7px] flex items-center justify-center font-display font-bold text-sm text-cyan-400">
              NL
            </div>
          </div>
          <div className="hidden sm:flex flex-col text-left pr-2">
            <span className="font-display font-bold text-sm text-white tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
              Natra Lokesh
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              Full Stack & Mobile
            </span>
          </div>
        </a>

        {/* Desktop Navigation Navigation Pill (Linear Style) */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-panel border-slate-800/80 shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full border border-cyan-500/40"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Work Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available
          </div>

          {/* Contact Button */}
          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-105 transition-all duration-200"
          >
            <Send className="w-3.5 h-3.5" />
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold"
          >
            Contact
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-20 left-4 right-4 p-5 rounded-2xl glass-panel border-slate-800 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400">NAVIGATION</span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Work
              </div>
            </div>

            <div className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-around">
              <a
                href="https://github.com/lokesh-varma28"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400"
              >
                <FaGithub className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/natra-lokesh-493bb63a2"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400"
              >
                <FaLinkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="mailto:lokeshvarmakshatriya@gmail.com"
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
