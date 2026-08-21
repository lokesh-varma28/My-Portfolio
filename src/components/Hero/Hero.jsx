import { memo } from 'react';
import { motion } from 'framer-motion';
import HeroBadges from './HeroBadges';
import AnimatedHeading from './AnimatedHeading';
import FloatingProfileImage from './FloatingProfileImage';
import HeroCTAs from './HeroCTAs';
import HeroCodeWindow from './HeroCodeWindow';
import HeroStatsPills from './HeroStatsPills';
import MouseSpotlight from './MouseSpotlight';
import { portfolioData } from '../../data/portfolioData';

function Hero() {
  const { subheadline } = portfolioData.hero;

  return (
    <section className="relative min-h-screen pt-28 pb-20 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decoupled Interactive Mouse Glow Spotlight Overlay */}
      <MouseSpotlight />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full z-10">

        {/* Balanced Responsive Grid: Text Left, Image Right on Desktop; Image Below Text on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">


          {/* Left Column: Badges, Heading, Subheadline & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <HeroBadges />

            <AnimatedHeading />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed pt-1"
            >
              {subheadline}
            </motion.p>

            <HeroCTAs />
          </div>

          {/* Right Column: Floating Profile Image from src/assets/images */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <FloatingProfileImage />
          </div>

        </div>

        {/* Full-Width Section Below Grid: Interactive IDE Code Window & Stats */}
        <div className="mt-14 max-w-4xl mx-auto">
          <HeroCodeWindow />
          <HeroStatsPills />
        </div>

      </div>
    </section>
  );
}

export default memo(Hero);
