import { Download } from 'lucide-react';

export default function ResumeButton({ variant = 'ghost', className = '' }) {
  const baseClasses =
    variant === 'primary'
      ? 'group relative inline-flex items-center gap-2 px-6 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-display font-semibold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300'
      : 'inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-full glass-panel-interactive border-slate-700 text-slate-200 font-display font-semibold text-xs sm:text-sm hover:text-white transition-all';

  return (
    <a
      href="/Natra-Lokesh-Resume.pdf"
      target="_blank"
      rel="noopener noreferrer"
      download="Natra-Lokesh-Resume.pdf"
      aria-label="Download Natra Lokesh resume (PDF)"
      className={`${baseClasses} whitespace-nowrap ${className}`.trim()}
    >
      <Download className="w-4 h-4" />
      <span>Download Resume</span>
    </a>
  );
}
