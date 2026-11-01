import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrambleText } from '../TextEffects';

const SLIDES = [
  {
    id: 'dev',
    num: '01',
    category: 'CREATIVE DEVELOPER',
    line1: 'MODULAR WEB',
    line2: 'APPLICATIONS &',
    line3: 'RESTFUL APIS.',
    description: 'Production-ready full stack engineering with React, Node.js, Express, MongoDB, and secure authenticated endpoints.',
    image: '/hero_dev_composition.png',
    alt: 'Modular Web Applications and 3D ID Badge Showcase',
    accentColor: '#1e68ff',
    badgeGlow: 'rgba(30, 104, 255, 0.45)'
  },
  {
    id: 'design',
    num: '02',
    category: 'BRAND × MOTION × INTERACTION',
    line1: 'VISUAL IDENTITY,',
    line2: 'MOTION GRAPHICS &',
    line3: 'UI/UX.',
    description: 'Crafting meaningful visual experiences through brand design, motion and intuitive interfaces.',
    image: '/hero_design_composition.png',
    alt: 'Visual Identity, Motion Graphics and 3D UI/UX Studio',
    accentColor: '#1e68ff',
    badgeGlow: 'rgba(30, 104, 255, 0.45)'
  }
];

export default function ShowcaseHero({ onExploreWork }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const currentSlide = SLIDES[activeIdx];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="showcase-hero-root relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden bg-black select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          TECH GRID & AMBIENT BLUE NEON AURA
      ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle coordinate grid lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '90px 90px'
          }}
        />

        {/* Dynamic Blue Radial Glow Behind 3D Composition */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[65vw] max-w-[850px] h-[650px] rounded-full pointer-events-none blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #1e68ff 0%, rgba(30, 104, 255, 0.15) 50%, transparent 80%)'
          }}
        />

        {/* Tech Coordinate Crosshairs matching reference layout */}
        <span className="absolute top-[28%] right-[46%] text-white/20 font-mono text-xs">+</span>
        <span className="absolute top-[68%] right-[42%] text-white/20 font-mono text-xs">+</span>
        <span className="absolute top-[18%] right-[14%] text-white/20 font-mono text-xs">+</span>
        <span className="absolute bottom-[22%] right-[10%] text-white/20 font-mono text-xs">+</span>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN TWO-COLUMN HERO CONTENT
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-12 lg:px-16 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8">
          
          {/* ─────── LEFT COLUMN: TYPOGRAPHY & CTAs ─────── */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Category Eyebrow with Hairline Divider Rule */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${currentSlide.id}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4 w-full mb-5"
              >
                <span className="font-tech text-xs sm:text-sm font-semibold tracking-[0.22em] text-zinc-400 uppercase whitespace-nowrap">
                  <ScrambleText text={currentSlide.category} onHover autoTrigger delay={200} />
                </span>
                <span className="flex-1 max-w-[180px] sm:max-w-[260px] h-[1px] bg-white/20" />
              </motion.div>
            </AnimatePresence>

            {/* Giant Punchy Headline with Vibrant Electric Blue Line 3 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`headline-${currentSlide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="hero-headline-block mb-6"
              >
                <div className="overflow-hidden leading-[0.92]">
                  <span className="block font-hero text-[clamp(2.8rem,5.6vw,5.5rem)] font-normal uppercase text-white tracking-[0.012em] whitespace-nowrap">
                    {currentSlide.line1}
                  </span>
                </div>
                <div className="overflow-hidden leading-[0.92]">
                  <span className="block font-hero text-[clamp(2.8rem,5.6vw,5.5rem)] font-normal uppercase text-white tracking-[0.012em] whitespace-nowrap">
                    {currentSlide.line2}
                  </span>
                </div>
                <div className="overflow-hidden leading-[0.92] mt-1">
                  <span
                    className="block font-hero text-[clamp(2.8rem,5.6vw,5.5rem)] font-normal uppercase tracking-[0.012em] whitespace-nowrap"
                    style={{
                      color: currentSlide.accentColor,
                      textShadow: '0 0 35px rgba(30, 104, 255, 0.5)'
                    }}
                  >
                    {currentSlide.line3}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtitle Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-[480px] mb-8 font-normal"
              >
                {currentSlide.description}
              </motion.p>
            </AnimatePresence>

            {/* Action Bar matching screenshot: [EXPLORE PROJECT ↗] | SCROLL DOWN 🖱️ */}
            <div className="flex items-center flex-wrap gap-5 sm:gap-7">
              <a
                href="#work"
                onClick={onExploreWork}
                className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full border border-[#1e68ff]/40 bg-black/60 backdrop-blur-md text-white font-tech text-xs sm:text-sm font-bold tracking-[0.16em] uppercase transition-all duration-300 hover:border-[#1e68ff] hover:bg-[#1e68ff]/10 hover:shadow-[0_0_25px_rgba(30,104,255,0.4)] hover:-translate-y-0.5"
              >
                <span>EXPLORE PROJECT</span>
                <span className="text-sm font-normal transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>

              <span className="h-5 w-[1px] bg-white/20 hidden sm:block" />

              <a
                href="#work"
                className="inline-flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors duration-200 font-tech text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase"
              >
                <span>SCROLL DOWN</span>
                {/* Outline Mouse with Scroll Wheel */}
                <svg
                  width="14"
                  height="20"
                  viewBox="0 0 14 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-400"
                >
                  <rect x="1" y="1" width="12" height="18" rx="6" />
                  <line x1="7" y1="5" x2="7" y2="8" className="animate-bounce" />
                </svg>
              </a>
            </div>

            {/* Slide Switcher Controls */}
            <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 w-full max-w-[420px]">
              <span className="text-zinc-500 font-tech text-xs uppercase tracking-wider mr-2">Discipline:</span>
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`px-3.5 py-1 rounded-full font-tech text-xs tracking-wider transition-all duration-200 cursor-pointer ${
                    activeIdx === idx
                      ? 'bg-[#1e68ff] text-white font-bold shadow-[0_0_15px_rgba(30,104,255,0.6)]'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {slide.num}. {slide.id === 'dev' ? 'ENGINEERING' : 'DESIGN & UI'}
                </button>
              ))}
            </div>
          </div>

          {/* ─────── RIGHT COLUMN: 3D COMPOSITION VISUAL ─────── */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[420px] lg:min-h-[540px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`visual-${currentSlide.id}`}
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 9}deg) rotateX(${-mousePos.y * 9}deg)`,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="relative w-full max-w-[620px] flex items-center justify-center"
              >
                {/* 3D Visual Artwork with soft edge blending */}
                <img
                  src={currentSlide.image}
                  alt={currentSlide.alt}
                  className="w-full h-auto object-contain max-h-[530px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-float-gentle"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 100%)'
                  }}
                />

                {/* Ambient Blue Pulse Glow Behind Subject */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none blur-3xl opacity-35"
                  style={{
                    background: 'radial-gradient(circle, #1e68ff 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Vertical Tech Stamp on far right edge (from screenshot: 01) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right text-white/20 font-tech text-[10px] tracking-[0.25em] uppercase pointer-events-none hidden xl:block">
              {currentSlide.num} — CREATIVE ARCHITECTURE
            </div>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM CORNER HAZARD STRIPES (/////// from reference)
      ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1540px] mx-auto px-6 sm:px-12 lg:px-16 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 opacity-75">
          <svg width="54" height="14" viewBox="0 0 54 14" fill="none" className="text-white">
            <path
              d="M4 14L10 0H7L1 14H4ZM11 14L17 0H14L8 14H11ZM18 14L24 0H21L15 14H18ZM25 14L31 0H28L22 14H25ZM32 14L38 0H35L29 14H32ZM39 14L45 0H42L36 14H39ZM46 14L52 0H49L43 14H46Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Status indicator on right */}
        <div className="flex items-center gap-2 text-zinc-500 font-tech text-xs tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>AVAILABLE FOR NEW PROJECTS</span>
        </div>
      </div>
    </div>
  );
}

