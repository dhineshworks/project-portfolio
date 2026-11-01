import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelDistortionCanvas from './PixelDistortionCanvas';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: '01',
    code: 'DKP',
    client: 'DHINESH KUMAR R',
    title: 'Interactive 3D Portfolio & Motion Lab',
    desc: 'High-performance creative developer showcase featuring real-time Verlet physics rope simulation, Three.js PBR shaders, and fluid WebGL distortion.',
    tags: ['REACT', 'THREE.JS', 'VERLET PHYSICS', 'WEBGL', 'GSAP'],
    image: '/Id.jpg',
    color: '#38bdf8',
    link: '#work'
  },
  {
    id: '02',
    code: 'FST',
    client: 'FULL STACK ARCHITECTURE',
    title: 'Modular Web Applications & RESTful APIs',
    desc: 'Production-ready full stack engineering with React, Node.js, Express, MongoDB, and secure authenticated endpoints with microsecond responses.',
    tags: ['NODE.JS', 'EXPRESS', 'MONGODB', 'REST API', 'TAILWIND'],
    image: '/Id.jpg',
    color: '#818cf8',
    link: '#about'
  },
  {
    id: '03',
    code: 'MTN',
    client: 'CREATIVE & MULTIMEDIA',
    title: 'Visual Identity, Motion Graphics & UI/UX',
    desc: 'Bespoke brand storytelling, smooth kinetic typography, design systems, and video production crafted for high-impact digital impressions.',
    tags: ['UI/UX', 'MOTION GRAPHICS', 'BRAND DESIGN', 'AFTER EFFECTS'],
    image: '/Id.jpg',
    color: '#f43f5e',
    link: '#playground'
  },
  {
    id: '04',
    code: 'EXP',
    client: 'WEBGL EXPERIMENTS',
    title: 'Fluid Grid Refraction & Shader Physics',
    desc: 'Interactive shader mathematics mapping cursor velocity to real-time grid refraction, chromatic aberration fringes, and radial shockwave bursts.',
    tags: ['GLSL', 'DATA TEXTURE', 'CHROMATIC ABERRATION', 'MATTER.JS'],
    image: '/Id.jpg',
    color: '#22c55e',
    link: '#playground'
  }
];

export default function DaveWorkCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const current = projects[currentIndex];

  return (
    <section className="dave-work-section" id="work">
      {/* Section Header */}
      <div className="dave-work-header">
        <div className="dave-section-tag">
          <span className="dave-tag-dot" />
          <span>01. SELECTED WORKS</span>
        </div>
        <div className="dave-header-row">
          <h2 className="dave-heading glow-text">Featured Projects</h2>
          
          {/* Carousel Navigation Controls */}
          <div className="dave-nav-controls">
            <span className="dave-slide-counter font-tech">
              <span className="dave-counter-active">0{currentIndex + 1}</span>
              <span className="dave-counter-divider">/</span>
              <span>0{projects.length}</span>
            </span>

            <div className="dave-btn-group">
              <button
                onClick={prevSlide}
                className="dave-carousel-btn"
                aria-label="Previous Project"
                title="Previous Project"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={nextSlide}
                className="dave-carousel-btn"
                aria-label="Next Project"
                title="Next Project"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="dave-stage-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="dave-project-card"
            style={{ '--project-accent': current.color }}
          >
            {/* Left Content Column */}
            <div className="dave-card-left">
              <div className="dave-card-top">
                <div className="dave-code-badge font-hero">
                  <span>{current.code}</span>
                  <span className="dave-code-num">#{current.id}</span>
                </div>

                <div className="dave-client-block">
                  <span className="dave-pretitle font-tech">CLIENT / DOMAIN</span>
                  <div className="dave-client-name font-tech">{current.client}</div>
                </div>

                <h3 className="dave-project-title glow-text">
                  {current.title}
                </h3>

                <p className="dave-project-desc">
                  {current.desc}
                </p>
              </div>

              <div className="dave-card-bottom">
                {/* Dave Holloway Signature Downward Triangle Markers */}
                <div className="dave-markers-row">
                  {current.tags.map((tag, idx) => (
                    <div key={idx} className="dave-marker-item">
                      <svg className="dave-triangle" width="8" height="6" viewBox="0 0 8 6" fill="currentColor">
                        <polygon points="0,0 8,0 4,6" />
                      </svg>
                      <span className="dave-marker-label font-tech">{tag}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="dave-cta-row">
                  <a href={current.link} className="dave-action-pill font-tech">
                    <span>EXPLORE PROJECT</span>
                    <ArrowUpRight size={16} className="dave-action-arrow" />
                  </a>

                  <span className="dave-interactive-hint font-tech">
                    [ HOVER IMAGE FOR FLUID WEBGL DISTORTION ]
                  </span>
                </div>
              </div>
            </div>

            {/* Right Media Column: Three.js Interactive Pixel Distortion Canvas */}
            <div className="dave-card-right">
              <div className="dave-canvas-frame">
                <PixelDistortionCanvas
                  imageSrc={current.image}
                  gridSize={14}
                  strength={0.14}
                  relaxation={0.94}
                  radius={0.34}
                  triggerBurst={true}
                />

                {/* Subtle corner tech markings */}
                <div className="dave-corner-tl" />
                <div className="dave-corner-br" />
                
                {/* Floating badge */}
                <div className="dave-webgl-badge font-tech">
                  <span className="dave-live-dot" />
                  <span>THREE.JS SHADER PIXEL DISTORTION</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Dots Track */}
      <div className="dave-dots-track">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setCurrentIndex(idx)}
            className={`dave-dot-item ${idx === currentIndex ? 'active' : ''}`}
            aria-label={`Jump to slide ${idx + 1}`}
          >
            <span className="dave-dot-bar" />
            <span className="dave-dot-label font-tech">{p.code}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
