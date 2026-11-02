import React, { useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';

const springConfig = { mass: 0.1, damping: 16, stiffness: 71 };

const ArrowIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M6.52182 2.75026L12.8858 9.11422L15.253 0.38299L6.52182 2.75026Z" fill="white" />
    <path d="M0.333095 12.3331L3.30294 15.3029L10.3402 6.56864L9.0674 5.29585L0.333095 12.3331Z" fill="white" />
  </svg>
);

const MemberImage = ({ member, index, onHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="profile-img relative cursor-pointer p-[3px] md:p-[6px] select-none"
      style={{ width: isHovered ? 120 : 64, height: isHovered ? 120 : 64 }}
      animate={{ width: isHovered ? 120 : 64, height: isHovered ? 120 : 64 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      onHoverStart={() => {
        setIsHovered(true);
        onHover(index);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        onHover(null);
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/15 bg-zinc-900 shadow-xl transition-all duration-200">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 hover:opacity-100 flex items-end p-1.5">
          <span className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
            {member.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export function HoverMember({
  teamMembers,
  defaultName = "DHINESH",
  className = "",
  backgroundColor = "#000000",
  textColor = "text-white",
  hoverTextColor = "text-sky-400",
  cursorColor = "bg-sky-500"
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const containerRef = useRef(null);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const cursorScale = useSpring(0, { mass: 0.1, damping: 10, stiffness: 150 });

  const letterVariantsIn = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  };

  const letterVariantsDefault = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: "0%", opacity: 1 },
    exit: { y: "0%", opacity: 0 }
  };

  // Center-out ripple stagger delay (signature Skiper6 / Buzzworthy effect)
  const getDelay = (idx, total) => 0.045 * Math.abs(idx - Math.floor(total / 2));

  return (
    <section
      className={`relative flex min-h-[580px] w-full flex-col items-center justify-center gap-12 overflow-hidden text-white py-20 border-t border-b border-white/10 ${className}`}
      style={{ backgroundColor }}
    >
      {/* Background Ambience Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[350px] w-[600px] rounded-full bg-sky-500/5 blur-[120px]" />
      </div>

      {/* Section Sub-header */}
      <div className="relative z-20 text-center">
        <span className="font-tech text-xs uppercase tracking-[0.25em] text-sky-400 font-bold">
          INTERACTIVE SHOWCASE
        </span>
      </div>

      {/* Interactive Profile Thumbnails Bar with Cursor Follower */}
      <div
        ref={containerRef}
        className="relative z-30 flex min-h-[140px] w-max max-w-[95%] flex-wrap items-center justify-center gap-2 md:max-w-none"
        onPointerMove={(e) => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            cursorX.set(e.clientX - rect.left - 24);
            cursorY.set(e.clientY - rect.top - 24);
          }
        }}
        onPointerEnter={() => cursorScale.set(1)}
        onPointerLeave={() => cursorScale.set(0)}
      >
        {teamMembers.map((member, idx) => (
          <MemberImage
            key={member.name + idx}
            member={member}
            index={idx}
            onHover={setHoveredIndex}
          />
        ))}

        {/* Floating Custom Magnetic Cursor Follower */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            scale: cursorScale,
            transformOrigin: "center center"
          }}
          className={`pointer-events-none absolute left-0 top-0 z-40 flex h-12 w-12 items-center justify-center rounded-full ${cursorColor} shadow-2xl backdrop-blur-md`}
        >
          <ArrowIcon className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Giant Typography Reveal Area */}
      <div className="relative h-[20vw] min-h-[160px] max-h-[300px] w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <AnimatePresence>
          {hoveredIndex === null && (
            <motion.div
              key="default"
              className="absolute w-full text-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
            >
              <h1 className={`font-hero select-none whitespace-nowrap text-[20vw] uppercase leading-none tracking-tight opacity-90 ${textColor}`}>
                {Array.from(defaultName).map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={letterVariantsDefault}
                    transition={{
                      duration: 0.75,
                      ease: [0.19, 1, 0.22, 1],
                      delay: getDelay(i, defaultName.length)
                    }}
                  >
                    {char === " " ? "\u00a0" : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {teamMembers.map((member, idx) => (
          <AnimatePresence key={member.name + idx}>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute w-full text-center"
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
              >
                <h1 className={`font-hero select-none whitespace-nowrap text-[20vw] uppercase leading-none tracking-tight ${hoverTextColor}`}>
                  {Array.from(member.name).map((char, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      variants={letterVariantsIn}
                      transition={{
                        duration: 0.75,
                        ease: [0.19, 1, 0.22, 1],
                        delay: getDelay(i, member.name.length)
                      }}
                    >
                      {char === " " ? "\u00a0" : char}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </section>
  );
}

export default HoverMember;

