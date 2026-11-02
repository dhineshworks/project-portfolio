import React from "react";
import { useAnimate } from "motion/react";
import { Github, Linkedin, Mail, Code, Globe } from "lucide-react";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

export const ClipPathLinkBox = ({
  Icon = Globe,
  label = "",
  href = "#",
  target,
  rel,
  className = "",
  clipBg = "bg-sky-400 text-black",
  baseBg = "bg-neutral-900/60 text-neutral-400 hover:text-white",
}) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    }, { duration: 0.35, ease: "easeInOut" });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    }, { duration: 0.35, ease: "easeInOut" });
  };

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative grid h-24 w-full place-content-center transition-colors border border-neutral-800 ${baseBg} sm:h-28 md:h-36 ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Icon className="text-2xl sm:text-3xl lg:text-4xl" />
        {label && <span className="text-xs uppercase tracking-widest font-mono opacity-80">{label}</span>}
      </div>

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className={`absolute inset-0 grid place-content-center ${clipBg} font-semibold`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Icon className="text-2xl sm:text-3xl md:text-4xl" />
          {label && <span className="text-xs uppercase tracking-widest font-mono font-bold">{label}</span>}
        </div>
      </div>
    </a>
  );
};

export const ClipPathLinks = ({
  links = [
    { Icon: Github, label: "GitHub", href: "https://github.com/dhineshworks" },
    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/dhineshkumar-r-43baa8253" },
    { Icon: Mail, label: "Email", href: "mailto:dhineshtn0@gmail.com" },
    { Icon: Code, label: "Projects", href: "#work" },
  ],
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-4 divide-x divide-neutral-800 border border-neutral-800 ${className}`}>
      {links.map((link, idx) => (
        <ClipPathLinkBox
          key={link.label || idx}
          {...link}
          target={link.target || (link.href.startsWith("http") ? "_blank" : undefined)}
          rel={link.rel || (link.href.startsWith("http") ? "noopener noreferrer" : undefined)}
        />
      ))}
    </div>
  );
};

export default ClipPathLinks;
