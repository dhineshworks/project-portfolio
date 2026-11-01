import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lanyard from './components/Lanyard';
import { ScrambleText } from './components/TextEffects';
import HoverMember from './components/ui/HoverMember';
import DaveWorkCarousel from './components/ui/DaveWorkCarousel';
import WordsPreloader from './components/ui/WordsPreloader';
import {
  Mail,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Skiper6 showcase images (defaults to /Id.jpg, ready for custom images)
const showcaseMembers = [
  { name: "DHINESH", image: "/Id.jpg" },
  { name: "CREATIVE", image: "/Id.jpg" },
  { name: "DEVELOPER", image: "/Id.jpg" },
  { name: "FULLSTACK", image: "/Id.jpg" },
  { name: "DESIGNER", image: "/Id.jpg" },
  { name: "MOTION", image: "/Id.jpg" }
];

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [heroActive, setHeroActive] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 820 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="portfolio-wrapper">
      {/* ─────────────────────────────────────────────────────────────
          0. SKIPER8 WORDS PRELOADER (Dennis Snellenberg Style)
      ───────────────────────────────────────────────────────────── */}
      {showPreloader && (
        <WordsPreloader
          onExitStart={() => setHeroActive(true)}
          onComplete={() => setShowPreloader(false)}
          dotColor="#38bdf8"
          backgroundColor="#000000"
          textColor="#ffffff"
        />
      )}

      {/* ─────────────────────────────────────────────────────────────
          1. HERO VIEWPORT (Matches Reference Design Pixel-for-Pixel)
      ───────────────────────────────────────────────────────────── */}
      <section className="hero-viewport">
        {/* Top Navigation Bar with Horizontal Divider */}
        <div className="hero-header-wrap">
          <header className="hero-header">
            <a href="#" className="brand-logo">
              <ScrambleText text="PORTFOLIO" onHover autoTrigger delay={200} />
              <sup>®</sup>
            </a>

            <nav>
              <ul className="nav-links">
                <li>
                  <a href="#work" className="nav-link">
                    <span className="nav-num">01.</span> WORK
                  </a>
                </li>
                <li>
                  <a href="#playground" className="nav-link">
                    <span className="nav-num">02.</span> PLAYGROUND
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-link">
                    <span className="nav-num">03.</span> CONTACT ↗
                  </a>
                </li>
              </ul>
            </nav>
          </header>
        </div>

        {/* Full-bleed 3D Lanyard Layer (Spans full hero width so card NEVER clips outside box) */}
        <div className="hero-lanyard-layer">
          <Lanyard
            frontImage="/Id.jpg"
            backImage="/Id.jpg"
            imageFit="cover"
            cardColor="#ffffff"
            orientation="portrait"
            finish="glossy"
            cornerRadius={0.28}
            size={0.6}
            anchor={isMobile ? 0.5 : 0.22}
            strapLength={0.44}
            strapColor="#111111"
            strapWidth={0.65}
            metal="silver"
            gravity={1.6}
            damping={0.62}
            elasticity={0.52}
            breeze={0.14}
            interactive
            intro={true}
            triggerIntro={heroActive || !showPreloader}
          />
        </div>

        {/* Hero Body: Two Columns (Left Spacer + Right Typography) */}
        <div className="hero-body-wrap">
          <div className="hero-body">
            {/* Left Column Spacer (Allows pointer events to pass through to the 3D lanyard) */}
            <div className="hero-lanyard-spacer" />

            {/* Right Column: Hero Typography & Actions (Strict Left Alignment) */}
            <div className="hero-info-slot">
              {/* Eyebrow Label with Hairline Accent */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="hero-eyebrow"
              >
                <span className="hero-eyebrow-text">
                  <ScrambleText text="DESIGN × CODE × EXPERIMENTATION" onHover autoTrigger delay={300} />
                </span>
                <span className="hero-eyebrow-line" />
              </motion.div>

              {/* Giant Punchy Headline with Strict Left Alignment & Matching Baselines */}
              <div className="hero-title-container">
                <div className="hero-title-row">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-title-line hero-line-white"
                  >
                    I TURN
                  </motion.span>
                </div>

                <div className="hero-title-row">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-title-line hero-line-white"
                  >
                    IMAGINATION
                  </motion.span>
                </div>

                <div className="hero-title-row">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                    className="hero-title-line hero-line-muted"
                  >
                    INTO INTERACTION.
                  </motion.span>
                </div>
              </div>

              {/* Bio Description with Left-aligned Fade-up */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="hero-description"
              >
                An all-round creative developer exploring the intersection of design, technology, motion and digital
                experiences.
              </motion.p>

              {/* Action CTAs Matching Reference */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="hero-actions"
              >
                <a href="#contact" className="status-pill">
                  <span className="status-dot-glow"></span>
                  Open to opportunities
                </a>

                <a href="#work" className="explore-btn">
                  <span>EXPLORE MY WORK</span>
                  <span className="explore-arrow-circle">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Hero Footer Ticker Wrapper */}
        <div className="hero-footer-wrap">
          <footer className="hero-footer">
            <div className="footer-statement">
              <span className="pipe">|</span>
              LET'S CREATE SOMETHING GREAT TOGETHER.
            </div>

            <a href="#work" className="footer-scroll-cta">
              <span>SCROLL DOWN</span>
              <span className="pipe">|</span>
              <span className="scroll-arrow">↓</span>
            </a>
          </footer>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. DAVE HOLLOWAY WEBGL PIXEL DISTORTION SHOWCASE (#work)
      ───────────────────────────────────────────────────────────── */}
      <DaveWorkCarousel />

      {/* ─────────────────────────────────────────────────────────────
          3. SKIPER6 INTERACTIVE SHOWCASE STRIP
      ───────────────────────────────────────────────────────────── */}
      <div id="personas">
        <HoverMember
          teamMembers={showcaseMembers}
          defaultName="DHINESH"
          backgroundColor="#000000"
          textColor="text-white"
          hoverTextColor="text-sky-400"
          cursorColor="bg-sky-500"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. PLAYGROUND & EXPERIMENTS (#playground)
      ───────────────────────────────────────────────────────────── */}
      <section className="section-container" id="playground">
        <div className="section-tag">
          <Sparkles size={16} />
          <span>02. CREATIVE EXPERIMENTS</span>
        </div>
        <h2 className="section-heading">Interactive Playground</h2>
        <p className="section-subtext">
          A collection of real-time WebGL experiments, kinetic typography studies, and physics simulations. Grab, rotate, and interact with the 3D ID badge above or explore the motion showcase below.
        </p>
        <div className="about-grid">
          <div className="about-card" style={{ gridColumn: 'span 3' }}>
            <h3 className="about-card-title">
              <Sparkles size={22} style={{ color: 'var(--accent-blue)' }} />
              Typography Preloader (Skiper8)
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Multilingual animated greeting preloader inspired by Dennis Snellenberg with real-time SVG quadratic bezier curve exit transition and liquid slide-up lift.
            </p>
            <button
              onClick={() => {
                setHeroActive(false);
                setShowPreloader(true);
              }}
              className="status-pill"
              style={{ cursor: 'pointer', background: 'rgba(56, 189, 248, 0.1)', borderColor: 'var(--accent-blue)' }}
            >
              <span className="status-dot-glow" />
              Replay Words Preloader (skiper8)
            </button>
          </div>

          <div className="about-card" style={{ gridColumn: 'span 3' }}>
            <h3 className="about-card-title">
              <Sparkles size={22} style={{ color: 'var(--accent-blue)' }} />
              Real-Time Physics Simulation
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              The 3D ID badge on the hero is fully interactive — powered by a custom Verlet integration rope physics engine and Three.js PBR shader pipeline with specular sheen, holographic foil dispersion, and wind dynamics. Drag it with your mouse or swipe on touch devices.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. CONTACT SECTION (#contact)
      ───────────────────────────────────────────────────────────── */}
      <footer className="contact-section" id="contact">
        <div className="section-tag" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>
          <span>03. GET IN TOUCH</span>
        </div>
        <h2 className="contact-headline">Let's create something great together.</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Available for full-time engineering roles, creative collaborations, and high-impact digital projects.
        </p>

        <a href="mailto:dhineshtn0@gmail.com" className="contact-email-btn">
          <Mail size={18} />
          dhineshtn0@gmail.com
        </a>

        <div className="social-links">
          <a
            href="https://github.com/dhineshworks"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/dhineshkumar-r-43baa8253"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
        </div>

        <p className="copyright-text">
          © {new Date().getFullYear()} DHINESH KUMAR R. CRAFTED WITH REACT, THREE.JS &amp; CREATIVITY.
        </p>
      </footer>
    </div>
  );
}
