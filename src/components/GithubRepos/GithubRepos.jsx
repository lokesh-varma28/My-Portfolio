import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Search, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import SpotlightCard from '../SpotlightCard';
import RepositoryCard from './RepositoryCard';
import { githubReposData } from '../../data/githubReposData';

export default function GithubRepos() {
  // 1. Render real fallback repositories immediately without waiting for API
  const [repos, setRepos] = useState(githubReposData.repositories);
  const [loading, setLoading] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // 3. Start background sync after component mounts
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 6000);

    const fetchGithubRepos = async () => {
      setLoading(true);

      try {
        const response = await fetch(githubReposData.apiUrl, {
          signal: abortController.signal,
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`GitHub API status ${response.status}`);
        }

        const data = await response.json();

        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((r) => ({
            id: r.id,
            name: r.name,
            displayName: r.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            description: r.description || 'Public GitHub repository.',
            html_url: r.html_url,
            language: r.language || 'JavaScript',
            stargazers_count: r.stargazers_count,
            forks_count: r.forks_count,
            updated_at: r.updated_at,
            topics: r.topics || [],
          }));
          // Update with live data on background sync success
          setRepos(mapped);
          setIsSynced(true);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          console.warn('GitHub API background sync timed out or aborted.');
        } else {
          console.warn('GitHub API background sync warning:', err);
        }
        // Silently keep existing fallback repositories; do not clear state or show error banner
      } finally {
        clearTimeout(timeoutId);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGithubRepos();
    
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, []);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const languages = ['All', ...new Set(repos.map((r) => r.language).filter(Boolean))];

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.displayName && r.displayName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLang = activeFilter === 'All' || r.language === activeFilter;
    return matchesSearch && matchesLang;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          GITHUB REPOSITORIES
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          GitHub <span className="gradient-text-cyan-blue">Repositories</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Explore Natra Lokesh's code repositories and open-source contributions.
        </p>
      </div>

      {/* GitHub Profile Sync Glass Banner */}
      <SpotlightCard className="p-6 mb-10 bg-slate-950/80 border-slate-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white shrink-0">
              <FaGithub className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base">
                  @{githubReposData.username}
                </h3>
                {isSynced ? (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Synced
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    GitHub Profile
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Public Code Repositories & Contributions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Syncing...' : 'Sync Repos'}</span>
            </button>

            <a
              href={githubReposData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-lg hover:scale-105 transition-all"
            >
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repository by name or tag..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveFilter(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors shrink-0 ${
                  activeFilter === lang
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </SpotlightCard>

      {/* Repositories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredRepos.map((repo) => (
            <motion.div
              key={repo.id || repo.name}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <RepositoryCard repo={repo} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
}


