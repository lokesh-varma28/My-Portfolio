import { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../../data/portfolioData';

function AnimatedHeading() {
  const headingRef = useRef(null);
  const [index, setIndex] = useState(0);

  const headlines = portfolioData.hero.animatedHeadlines;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [headlines.length]);

  useEffect(() => {
    if (headingRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 15, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
        );
      });
      return () => ctx.revert();
    }
  }, [index]);

  return (
    <div className="flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
      {/* Primary Display Title */}
      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white max-w-2xl leading-[1.1]">
        {portfolioData.hero.headline.prefix}{' '}
        <span className="gradient-text-cyan-blue inline-block">
          {portfolioData.hero.headline.highlight}
        </span>{' '}
        {portfolioData.hero.headline.suffix}
      </h1>

      {/* Dynamic GSAP Animated Sub-Headline Carousel */}
      <div className="mt-4 h-10 sm:h-12 flex items-center justify-center lg:justify-start overflow-hidden">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 mr-2">
          SPECIALIZING IN
        </span>
        <div ref={headingRef} className="inline-block">
          <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-display font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/10">
            {headlines[index]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(AnimatedHeading);
