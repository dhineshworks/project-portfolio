import React from "react";
import { motion } from "motion/react";

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({
  children,
  href = "#",
  className = "",
  style = {},
  onClick,
  target,
  rel,
  topClassName = "text-neutral-400 group-hover:text-white",
  bottomClassName = "text-sky-400",
}) => {
  const content = typeof children === "string" ? children : String(children ?? "");

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={`group relative block overflow-hidden whitespace-nowrap font-black uppercase transition-colors ${className}`}
      style={{
        lineHeight: 0.88,
        ...style,
      }}
    >
      <div className={topClassName}>
        {content.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
      <div className={`absolute inset-0 ${bottomClassName}`}>
        {content.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l === " " ? "\u00A0" : l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export const RevealLinks = ({
  links = [
    { name: "GITHUB", href: "https://github.com/dhineshworks" },
    { name: "LINKEDIN", href: "https://www.linkedin.com/in/dhineshkumar-r-43baa8253" },
    { name: "EMAIL", href: "mailto:dhineshtn0@gmail.com" },
  ],
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-6 ${className}`}>
      {links.map((link, idx) => (
        <FlipLink
          key={link.name || idx}
          href={link.href}
          target={link.target || (link.href.startsWith("http") ? "_blank" : undefined)}
          rel={link.rel || (link.href.startsWith("http") ? "noopener noreferrer" : undefined)}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight hover:text-white"
        >
          {link.name}
        </FlipLink>
      ))}
    </div>
  );
};

export default RevealLinks;

