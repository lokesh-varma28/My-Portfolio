import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import ResumeButton from './ResumeButton';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#030611]/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand Monogram & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#080d1a] rounded-[11px] flex items-center justify-center font-display font-bold text-sm text-cyan-400">
              NL
            </div>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-white">
              Natra Lokesh
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Full Stack Developer & React Native Developer <span className="max-sm:hidden">• </span><span className="max-sm:block">Peravaram, AP, India</span>
            </p>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-6 max-sm:flex-wrap max-sm:justify-center">
          <a
            href="https://github.com/lokesh-varma28"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 max-sm:inline-flex max-sm:items-center max-sm:justify-center max-sm:min-h-11 max-sm:min-w-11"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <FaGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/natra-lokesh-493bb63a2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 max-sm:inline-flex max-sm:items-center max-sm:justify-center max-sm:min-h-11 max-sm:min-w-11"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:lokeshvarmakshatriya@gmail.com"
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 max-sm:inline-flex max-sm:items-center max-sm:justify-center max-sm:min-h-11 max-sm:min-w-11"
            title="Send Email"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <ResumeButton className="max-sm:w-full max-sm:justify-center" />
        </div>

        {/* Right: Back to top button & copyright */}
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>© 2026 Natra Lokesh</span>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl glass-panel-interactive text-slate-300 hover:text-cyan-400 border-slate-800"
            title="Scroll back to top"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
