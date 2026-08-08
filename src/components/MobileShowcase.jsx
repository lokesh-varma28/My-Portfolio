import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Zap,
  Layers,
  ShoppingBag,
  Shield,
  Sparkles,
  Wifi,
  Battery,
  Signal,
  CheckCircle2
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const MOBILE_SCREENS = [
  {
    id: 'storefront',
    title: 'Mobile Catalog UI',
    subtitle: 'Expo & React Native',
    content: {
      header: 'PulseStore Mobile',
      banner: '⚡ Summer Tech Deals - 40% Off',
      items: [
        { name: 'Wireless Headphones', price: '₹4,999', rating: '4.9 ★' },
        { name: 'Smart Fitness Watch', price: '₹7,499', rating: '4.8 ★' },
        { name: 'Mechanical Keyboard', price: '₹3,299', rating: '4.9 ★' },
      ],
    },
  },
  {
    id: 'checkout',
    title: 'Smooth Checkout Flow',
    subtitle: 'Native Gestures & State',
    content: {
      header: 'Order Summary',
      banner: '✅ Express Shipping Included',
      items: [
        { name: 'Subtotal (3 items)', price: '₹15,797' },
        { name: 'GST & Taxes', price: '₹1,421' },
        { name: 'Total Payable', price: '₹17,218' },
      ],
    },
  },
  {
    id: 'auth',
    title: 'Supabase Mobile Auth',
    subtitle: 'Secure OAuth & Biometrics',
    content: {
      header: 'Secure Sign In',
      banner: '🔒 Encrypted Session Token',
      items: [
        { name: 'Biometric Touch ID / Face ID', price: 'Active' },
        { name: 'Supabase JWT Auth', price: 'Verified' },
      ],
    },
  },
];

export default function MobileShowcase() {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const activeScreen = MOBILE_SCREENS[activeScreenIndex];

  return (
    <section id="mobile" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-mono text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
          REACT NATIVE & EXPO
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-4">
          Mobile App <span className="gradient-text-purple-pink">Engineering</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3">
          Delivering 60FPS native mobile experiences for iOS and Android with React Native, Expo, and modern native module integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Mobile Capability Highlights */}
        <div className="lg:col-span-6 space-y-6">
          <SpotlightCard className="p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Cross-Platform iOS & Android
                </h3>
                <p className="text-xs text-slate-400">Single Codebase • Native Performance</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Crafting mobile applications with Expo Router for file-based navigation, smooth gesture handler interactions, and custom native device features.
            </p>
          </SpotlightCard>

          {/* Interactive Screen Selector Buttons */}
          <div className="space-y-3">
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              INTERACT WITH MOBILE SCREENS:
            </p>
            {MOBILE_SCREENS.map((screen, idx) => {
              const isActive = idx === activeScreenIndex;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between border ${
                    isActive
                      ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/10'
                      : 'glass-panel border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className={`font-display text-sm font-bold ${isActive ? 'text-purple-300' : 'text-white'}`}>
                      {screen.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {screen.subtitle}
                    </p>
                  </div>
                  <span className={`w-3 h-3 rounded-full ${isActive ? 'bg-purple-400 animate-ping' : 'bg-slate-700'}`} />
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> 60 FPS Native Motion
            </span>
            <span className="flex items-center gap-1 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" /> Expo EAS Ready
            </span>
          </div>
        </div>

        {/* Right Column: 3D-feeling Mobile Device Frame */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[300px] h-[580px] rounded-[48px] bg-slate-950 border-[6px] border-slate-800 shadow-2xl shadow-purple-500/20 p-3 overflow-hidden"
          >
            {/* Phone Notch & Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-slate-950 z-30 flex items-center justify-between px-6">
              <span className="text-[10px] font-mono text-slate-400 font-bold">9:41</span>
              {/* Dynamic Island Notch */}
              <div className="w-20 h-4 bg-black rounded-full" />
              <div className="flex items-center gap-1 text-slate-400">
                <Signal className="w-2.5 h-2.5" />
                <Wifi className="w-2.5 h-2.5" />
                <Battery className="w-3 h-3" />
              </div>
            </div>

            {/* Phone Screen Container */}
            <div className="w-full h-full rounded-[38px] bg-[#070b15] border border-slate-800 pt-8 px-4 pb-4 flex flex-col justify-between overflow-hidden relative">
              
              {/* Dynamic Screen Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-white">
                      {activeScreen.content.header}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>

                  <div className="p-2.5 rounded-lg bg-gradient-to-r from-purple-900/60 to-blue-900/60 border border-purple-500/30 text-[10px] font-mono text-purple-200">
                    {activeScreen.content.banner}
                  </div>

                  <div className="space-y-2 pt-1">
                    {activeScreen.content.items.map((item, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-200 text-[11px] font-medium">
                          {item.name}
                        </span>
                        <span className="font-mono text-cyan-400 text-[11px] font-bold">
                          {item.price || item.rating}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Mobile Action */}
              <div className="pt-3 border-t border-slate-800 text-center">
                <div className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-display font-semibold text-xs shadow-lg">
                  Execute Action
                </div>
                <div className="w-28 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
