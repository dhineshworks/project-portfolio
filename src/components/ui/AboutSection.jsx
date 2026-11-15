import React from 'react';
import { ArrowDown, ArrowUpRight, Code2, Smartphone, Sparkles, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-b border-neutral-900 text-neutral-100 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(56,189,248,0.04),transparent)]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ─────────────────────────────────────────────────────────
              Left Column: Standalone 3D Character Turntable (No Box/Card Container)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] flex flex-col items-center">
              
              {/* Standalone 3D Turntable Video - Unconstrained, Free-Standing */}
              <div className="relative w-full aspect-[9/16] max-h-[620px] flex items-center justify-center">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/videos/character_turntable_poster.jpg"
                  className="w-full h-full object-contain pointer-events-none select-none"
                >
                  <source src="/videos/character_turntable.webm" type="video/webm" />
                  <source src="/videos/character_turntable.mp4" type="video/mp4" />
                </video>

                {/* Ambient Floor Pedestal Glow under feet */}
                <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-56 h-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.22)_0%,rgba(147,51,234,0.12)_45%,transparent_70%)] blur-lg" />

                {/* Floating Status Pill */}
                <div className="absolute top-4 left-2 sm:left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-mono text-neutral-300 shadow-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Open to roles</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-neutral-400">DEV × DESIGN</span>
                </div>

                {/* 360° Turntable Mode Indicator */}
                <div className="absolute top-4 right-2 sm:right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[10px] font-mono text-neutral-400 uppercase tracking-wider shadow-xl">
                  <span className="text-sky-400 font-bold">360°</span>
                  <span>TURNTABLE</span>
                </div>
              </div>

              {/* Location Strip */}
              <div className="w-full mt-1 px-3 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <MapPin size={13} className="text-sky-400" />
                  <span>India (IST)</span>
                </span>
                <span>Available Worldwide</span>
              </div>

              {/* Quick Metrics Bar */}
              <div className="mt-4 w-full grid grid-cols-3 gap-2.5">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-center backdrop-blur-sm">
                  <span className="block text-xl font-bold font-mono text-white tabular-nums">04+</span>
                  <span className="text-[11px] font-mono text-neutral-400">Years Exp</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-center backdrop-blur-sm">
                  <span className="block text-xl font-bold font-mono text-white">Flutter</span>
                  <span className="text-[11px] font-mono text-neutral-400">Mobile Dev</span>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-center backdrop-blur-sm">
                  <span className="block text-xl font-bold font-mono text-white">Three.js</span>
                  <span className="text-[11px] font-mono text-neutral-400">3D WebGL</span>
                </div>
              </div>

            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────
              Right Column: Editorial Narrative & Pillars (7 cols)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Section Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span>01. BIOGRAPHY &amp; PHILOSOPHY</span>
            </div>

            {/* Main Punchy Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[1.08]">
              Engineering High-Performance Code With Cinematic Motion Design.
            </h2>

            {/* Editorial Bio Copy */}
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am <span className="text-white font-semibold">Dhinesh Kumar R</span>, a creative developer
                and mobile software engineer specializing in turning abstract concepts into tactile,
                responsive digital applications.
              </p>
              <p className="text-neutral-400">
                My work bridges the gap between software engineering and creative direction: from architecting
                offline-first Flutter apps with on-device computer vision and encrypted SQLite ledgers, to authoring
                interactive 3D WebGL Three.js scenes and crafting polished motion graphics in After Effects.
              </p>
            </div>

            {/* 3 Core Pillars of Practice */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3">
                    <Smartphone size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Mobile Engineering</h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Flutter, Dart null-safety, BLoC architecture, on-device OCR, and encrypted SQLite.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3">
                    <Code2 size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Creative Frontend</h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    React.js, Three.js 3D shaders, Tailwind CSS, Node.js, and fluid physics micro-interactions.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-3">
                    <Sparkles size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">Visual &amp; Motion</h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    Figma design systems, Premiere Pro, After Effects kinetic motion, and brand identities.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="px-5 py-3 rounded-xl bg-white text-neutral-900 hover:bg-neutral-200 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>EXPLORE FEATURED WORK</span>
                <ArrowDown size={14} />
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-neutral-200 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium transition-all active:scale-[0.98] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
