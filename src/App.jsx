import { useEffect, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import AuroraBackground from './components/AuroraBackground';
import TopFade from './components/TopFade';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';

// Code-split below-the-fold heavy sections
const AboutBento = lazy(() => import('./components/AboutBento'));
const TechStack = lazy(() => import('./components/TechStack'));
const GithubRepos = lazy(() => import('./components/GithubRepos'));
const MobileShowcase = lazy(() => import('./components/MobileShowcase'));
const PhilosophyTimeline = lazy(() => import('./components/PhilosophyTimeline'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Prefetch below-the-fold chunks right after initial hero settles
    const prefetch = () => {
      import('./components/AboutBento');
      import('./components/TechStack');
      import('./components/GithubRepos');
      import('./components/MobileShowcase');
      import('./components/PhilosophyTimeline');
      import('./components/Contact');
      import('./components/Footer');
    };

    const idleCallbackId =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? window.requestIdleCallback(prefetch)
        : setTimeout(prefetch, 1200);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
      } else {
        clearTimeout(idleCallbackId);
      }
    };
  }, []);

  return (
    <>
      {/* Animated Preloader */}
      <Preloader onComplete={() => {}} />

      {/* Main Aurora Background & Content Layer */}
      <AuroraBackground>
        <div className="relative min-h-screen">
          <TopFade />
          <Navbar />
          <main>
            {/* Critical Viewport Hero Content: Loaded Immediately */}
            <Hero />

            {/* Below-the-fold content: Lazy-loaded with seamless background prefetch */}
            <Suspense fallback={<div className="min-h-[40vh]" />}>
              <AboutBento />
              <TechStack />
              <GithubRepos />
              <MobileShowcase />
              <PhilosophyTimeline />
              <Contact />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </AuroraBackground>
    </>
  );
}
