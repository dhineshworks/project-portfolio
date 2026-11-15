import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MaajaDeviceFrame({
  src,
  alt = 'Maaja App Screen',
  title = '',
  subtitle = '',
  className = '',
  badge = '',
  interactive = true,
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex flex-col items-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 3D Tilted Device Container (Anodized Dark Titanium) */}
      <motion.div
        animate={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale: isHovered ? 1.015 : 1,
          y: isHovered ? -4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="relative w-full max-w-[280px] sm:max-w-[310px] aspect-[9/19.5] rounded-[42px] p-[9px] transition-shadow duration-300"
        style={{
          background: 'linear-gradient(155deg, #2b2d34 0%, #1e2025 50%, #151619 100%)',
          boxShadow: isHovered
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Exterior Machined Chamfer Bezel */}
        <div className="pointer-events-none absolute inset-0 rounded-[42px] border border-white/10" />

        {/* Screen Bezel & Dynamic Island Frame */}
        <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-black flex flex-col">
          {/* Static Dynamic Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-22 h-4.5 rounded-full bg-black border border-white/10 flex items-center justify-between px-2.5">
            <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
          </div>

          {/* Authentic Flutter Screen Image */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />

          {/* Physical Glass Specular Reflection Sheen */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
            style={{
              background: isHovered
                ? `linear-gradient(${115 + rotateY * 1.5}deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)`
                : 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
              opacity: isHovered ? 0.8 : 0.4,
            }}
          />

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 w-24 h-1 rounded-full bg-neutral-800/90" />
        </div>
      </motion.div>

      {/* Structured Label below device */}
      {(title || subtitle || badge) && (
        <div className="mt-4 text-center flex flex-col items-center max-w-[280px]">
          {badge && (
            <span className="mb-1 inline-block px-2 py-0.5 rounded text-[11px] font-mono tracking-wide text-neutral-500 bg-neutral-100 border border-neutral-200">
              {badge}
            </span>
          )}
          {title && (
            <h4 className="text-sm font-medium text-neutral-900 tracking-tight">
              {title}
            </h4>
          )}
          {subtitle && (
            <p className="mt-0.5 text-xs text-neutral-500 font-mono">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
