import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GLYPHS = 'XYZ0123456789!<>[]*#+=~';

/**
 * ScrambleText - High-tech glyph decryption effect on hover or load
 */
export function ScrambleText({ text, className = '', onHover = true, autoTrigger = false, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iteration = 0;
    const totalFrames = text.length * 2.5;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '×' || char === '®' || char === '↗') return char;
            if (index < iteration / 2.5) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 28);
  };

  useEffect(() => {
    if (autoTrigger) {
      const timeout = setTimeout(triggerScramble, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, autoTrigger, delay]);

  return (
    <span
      className={`inline-block select-none ${className}`}
      onMouseEnter={onHover ? triggerScramble : undefined}
    >
      {displayText}
    </span>
  );
}

/**
 * TextMorphTicker - Rotating keyword ticker with exact baseline lock
 */
export function TextMorphTicker({ words, interval = 3400, className = '' }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || words.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval, isPaused]);

  return (
    <span
      className={`inline-block overflow-hidden align-baseline ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ verticalAlign: 'baseline', height: '1.02em', lineHeight: '0.95' }}
      title="Click or hover to pause"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="inline-block select-none"
          style={{ verticalAlign: 'baseline' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * MaskedRevealLine - Cinematic line-by-line masked entrance
 */
export function MaskedRevealLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`overflow-hidden block text-left ${className}`}>
      <motion.span
        initial={{ y: '115%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="block text-left"
      >
        {children}
      </motion.span>
    </span>
  );
}
