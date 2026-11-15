import React from 'react';

export default function AboutMarquee() {
  // Repeated units to guarantee a seamless, infinite loop across any ultra-wide screen
  const items = Array.from({ length: 8 });

  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/20 bg-black select-none z-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
      }}
      aria-label="About Me Marquee"
    >
      <div className="flex w-max animate-marquee-infinite py-3.5 sm:py-4">
        {/* Set 1 */}
        <div className="flex items-center shrink-0">
          {items.map((_, i) => (
            <div key={`m1-${i}`} className="flex items-center">
              <span
                className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.16em] leading-none"
                style={{
                  fontFamily: "'Chakra Petch', 'Space Grotesk', monospace, sans-serif",
                }}
              >
                ABOUT ME
              </span>
              <span className="text-white text-lg sm:text-xl md:text-2xl mx-6 sm:mx-8 md:mx-10 select-none tracking-widest flex items-center gap-1.5 opacity-95">
                <span>♣</span>
                <span>♦</span>
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Exact duplicate for seamless infinite loop) */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {items.map((_, i) => (
            <div key={`m2-${i}`} className="flex items-center">
              <span
                className="text-white text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-[0.16em] leading-none"
                style={{
                  fontFamily: "'Chakra Petch', 'Space Grotesk', monospace, sans-serif",
                }}
              >
                ABOUT ME
              </span>
              <span className="text-white text-lg sm:text-xl md:text-2xl mx-6 sm:mx-8 md:mx-10 select-none tracking-widest flex items-center gap-1.5 opacity-95">
                <span>♣</span>
                <span>♦</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
