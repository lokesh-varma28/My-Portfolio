import { useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import AboutBento from './components/AboutBento';
import TechStack from './components/TechStack';
import GithubRepos from './components/GithubRepos';
import MobileShowcase from './components/MobileShowcase';
import PhilosophyTimeline from './components/PhilosophyTimeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
    useEffect(() => {
        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 1.5,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            {/* 2026 Animated Preloader */}
            <Preloader onComplete={() => {}} />

            {/* Main Aurora Background & Content Layer */}
            <AuroraBackground>
                <div className="relative min-h-screen">
                    <Navbar />
                    <main>
                        <Hero />
                        <AboutBento />
                        <TechStack />
                        <GithubRepos />
                        <MobileShowcase />
                        <PhilosophyTimeline />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </AuroraBackground>
        </>
    );
}
