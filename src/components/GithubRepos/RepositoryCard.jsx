import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, GitFork, Calendar, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import SpotlightCard from '../SpotlightCard';

// Language Color Mapping Indicators
const LANGUAGE_COLORS = {
  JavaScript: {
    dot: 'bg-amber-400',
    badge: 'text-amber-300 bg-amber-400/10 border-amber-400/30',
  },
  TypeScript: {
    dot: 'bg-blue-400',
    badge: 'text-blue-300 bg-blue-400/10 border-blue-400/30',
  },
  HTML: {
    dot: 'bg-orange-500',
    badge: 'text-orange-300 bg-orange-500/10 border-orange-500/30',
  },
  CSS: {
    dot: 'bg-blue-500',
    badge: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
  },
  Python: {
    dot: 'bg-yellow-400',
    badge: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30',
  },
  Default: {
    dot: 'bg-cyan-400',
    badge: 'text-cyan-300 bg-cyan-400/10 border-cyan-400/30',
  },
};

function formatDate(dateString) {
  if (!dateString) return 'Recently';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recently';
  }
}

function RepositoryCard({ repo }) {
  const langConfig =
    LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default;

  return (
    <SpotlightCard className="p-6 h-full flex flex-col justify-between group">
      <div>
        {/* Card Top Row: Language Indicator & Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="text-xs font-mono text-slate-400">Public Repo</span>
          </div>

          {/* Primary Language Indicator Badge */}
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border ${langConfig.badge}`}>
            <span className={`w-2 h-2 rounded-full ${langConfig.dot}`} />
            <span>{repo.language || 'JavaScript'}</span>
          </div>
        </div>

        {/* Repository Name */}
        <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {repo.displayName || repo.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-3">
          {repo.description}
        </p>
      </div>

      <div>
        {/* Topic Tags */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {repo.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-slate-400"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer: Last Updated & GitHub Button */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
          
          {/* Last Updated Timestamp */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>Updated {formatDate(repo.updated_at)}</span>
          </div>

          {/* GitHub Link Button */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-black border border-slate-700 text-xs font-mono text-cyan-400 font-medium transition-all duration-200 group/btn shadow-md"
          >
            <FaGithub className="w-3.5 h-3.5" />
            <span>View on GitHub</span>
            <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default memo(RepositoryCard);
