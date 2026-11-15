import React from 'react';
import { ArrowDown, ArrowUpRight, Code2, Smartphone, Sparkles, MapPin } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050608] border-b border-neutral-900 text-neutral-100 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,rgba(56,189,248,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ─────────────────────────────────────────────────────────
              Left Column: Architectural Portrait Card (5 cols)
          ───────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[390px] rounded-3xl p-3 bg-gradient-to-b from-white/10 to-white/5 border border-white/15 shadow-2xl backdrop-blur-xl">
              {/* Corner Hardware Crosshairs */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-neutral-500">⌜</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-neutral-500">⌝</div>
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-500">⌞</div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-500">⌟</div>

              {/* Portrait Container */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-white/10">
                <img
                  src="/Id.jpg"
                  alt="Dhinesh Kumar R"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />

                {/* Ambient vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Bottom Stamp */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-neutral-300 backdrop-blur-md bg-black/60 px-3 py-2 rounded-xl border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open to roles</span>
                  </span>
                  <span className="text-neutral-400">DEV × DESIGN</span>
                </div>
              </div>

              {/* Location & Quick Meta Strip */}
              <div className="mt-3.5 px-2 py-1 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <MapPin size={13} className="text-sky-400" />
                  <span>India (IST)</span>
                </span>
                <span>Available Worldwide</span>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-6 w-full max-w-[390px] grid grid-cols-3 gap-2.5">
              <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center">
                <span className="block text-xl font-bold font-mono text-white tabular-nums">04+</span>
                <span className="text-[11px] font-mono text-neutral-400">Years Exp</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center">
                <span className="block text-xl font-bold font-mono text-white">Flutter</span>
                <span className="text-[11px] font-mono text-neutral-400">Mobile Dev</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 text-center">
                <span className="block text-xl font-bold font-mono text-white">Three.js</span>
                <span className="text-[11px] font-mono text-neutral-400">3D WebGL</span>
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
