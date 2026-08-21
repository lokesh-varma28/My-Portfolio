import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  GitFork,
  RefreshCw,
  Search,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import SpotlightCard from './SpotlightCard';
import { portfolioData } from '../data/portfolioData';

const LANGUAGE_COLORS = {
  JavaScript: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  TypeScript: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  HTML: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  CSS: 'text-blue-500 bg-blue-500/10 border-blue-500/30',
  Python: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Default: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
};

export default function Projects() {
  const { githubConfig } = portfolioData;
  const [repos, setRepos] = useState(githubConfig.initialRepos);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // GitHub REST API Integration Layer
  useEffect(() => {
    let isMounted = true;
    
    const fetchGithubRepos = async () => {
      setLoading(true);
      try {
        const response = await fetch(githubConfig.apiUrl);
        if (!response.ok) {
          throw new Error(`GitHub API HTTP status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          // Map GitHub API response data to repository card schema
          const mappedRepos = data.map((repo) => ({
            id: repo.id,
            name: repo.name,
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            description: repo.description || 'Public GitHub repository by Natra Lokesh.',
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            language: repo.language || 'JavaScript',
            topics: repo.topics && repo.topics.length > 0 ? repo.topics : ['github-repo', 'project'],
            updated_at: repo.updated_at,
          }));
          setRepos(mappedRepos);
        }
      } catch (err) {
        // Fallback to initialRepos if API rate limited or offline
        console.warn('GitHub API fetch fallback:', err.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGithubRepos();
    
    return () => {
      isMounted = false;
    };
  }, [githubConfig.apiUrl]);

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          GITHUB REPOSITORIES
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Open Source <span className="gradient-text-cyan-blue">Repositories</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Explore Natra Lokesh's public GitHub repositories and open-source codebases.
        </p>
      </div>

      {/* GitHub Profile Sync Bar */}
      <SpotlightCard className="p-6 mb-10 bg-slate-950/80 border-slate-800">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-200">
              <FaGithub className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-base">
                  @{githubConfig.username}
                </h3>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  API Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                GitHub REST API Integration Endpoint
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Sync GitHub</span>
            </button>

            <a
              href={githubConfig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold shadow-lg hover:scale-105 transition-all"
            >
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Search & Filter Inputs */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories by title or topic..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </SpotlightCard>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredRepos.map((repo) => {
            const langStyle =
              LANGUAGE_COLORS[repo.language] || LANGUAGE_COLORS.Default;
            return (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SpotlightCard className="p-6 h-full flex flex-col justify-between group">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                        <BookOpen className="w-4 h-4" />
                        <span>Public Repo</span>
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${langStyle}`}>
                        {repo.language || 'JavaScript'}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {repo.title || repo.name}
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                      {repo.description}
                    </p>
                  </div>

                  <div>
                    {/* Topics / Tags */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {repo.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Stats & Link Bar */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {repo.stargazers_count || 0}
                        </span>
                        <span className="flex items-center gap-1 hover:text-cyan-400 transition-colors">
                          <GitFork className="w-3.5 h-3.5" />
                          {repo.forks_count || 0}
                        </span>
                      </div>

                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <span>View Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </section>
  );
}
