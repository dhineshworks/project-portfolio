import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DEFAULT_WORDS = [
  'Hello',
  'வணக்கம்',
  'Bonjour',
  'Ciao',
  'Olá',
  'やあ',
  'Hallå',
  'Guten Tag',
  'Welcome'
];

/**
 * WordsPreloader (Skiper UI - skiper8)
 * Inspired by Dennis Snellenberg (dennissnellenberg.com)
 *
 * Features:
 * - Dynamic SVG quadratic bezier curve exit transition
 * - Synchronized staggered word sequence
 * - Custom cubic-bezier curve: [0.76, 0, 0.24, 1]
 * - Smooth -100vh lift-off with liquid bottom bow
 */
export default function WordsPreloader({
  words = DEFAULT_WORDS,
  onComplete,
  onExitStart,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  dotColor = '#38bdf8',
  delayFirstWord = 450,
  wordInterval = 115
}) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Lock scroll while preloader is active
    document.body.style.overflow = 'hidden';

    setDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      // Snappy, natural pause on final greeting before instant lift-off
      const timer = setTimeout(() => {
        setIsExiting(true);
        if (onExitStart) onExitStart();
      }, 160);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? delayFirstWord : index === 1 ? 240 : wordInterval);

    return () => clearTimeout(timer);
  }, [index, words.length, delayFirstWord, wordInterval, onExitStart]);

  // Dennis Snellenberg / Skiper8 curved SVG path logic
  const initialCurve = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetCurve = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  const slideUpVariants = {
    initial: {
      top: 0
    },
    exit: {
      top: '-100vh',
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
        delay: 0
      }
    }
  };

  const curveVariants = {
    initial: {
      d: initialCurve,
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: targetCurve,
      transition: {
        duration: 0.65,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.04
      }
    }
  };

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        document.body.style.overflow = '';
        if (onComplete) onComplete();
      }}
    >
      {!isExiting && (
        <motion.div
          key="skiper8-preloader"
          variants={slideUpVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center pointer-events-auto select-none"
          style={{ backgroundColor }}
        >
          {dimension.width > 0 && (
            <>
              {/* Word Display with Glowing Dot (Skiper8 / Dennis Snellenberg Exact Pattern) */}
              <div className="absolute z-20 flex items-center justify-center pointer-events-none">
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 text-5xl md:text-7xl font-hero tracking-wider uppercase text-white"
                  style={{ color: textColor }}
                >
                  <span
                    className="inline-block w-3.5 h-3.5 rounded-full"
                    style={{
                      backgroundColor: dotColor,
                      boxShadow: `0 0 16px ${dotColor}`
                    }}
                  />
                  <span>{words[index]}</span>
                </motion.p>
              </div>

              {/* Liquid Bowing SVG Curve */}
              <svg
                className="absolute top-0 w-full pointer-events-none"
                style={{ height: 'calc(100% + 300px)' }}
              >
                <motion.path
                  variants={curveVariants}
                  initial="initial"
                  exit="exit"
                  style={{ fill: backgroundColor }}
                />
              </svg>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
