import { useMotionValue, motion, useSpring, useTransform } from "motion/react";
import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export interface HoverImageLinkItem {
  heading: string;
  subheading?: string;
  imgSrc?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
}

export const HoverImageLink: React.FC<HoverImageLinkItem> = ({
  heading,
  imgSrc,
  subheading,
  href = "#",
  target,
  rel,
  className = "",
}) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className={`group relative flex items-center justify-between border-b border-neutral-800 py-6 transition-colors duration-500 hover:border-neutral-500 md:py-8 ${className}`}
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.04,
            delayChildren: 0.1,
          }}
          className="relative z-10 block text-3xl font-bold uppercase tracking-tight text-neutral-400 transition-colors duration-500 group-hover:text-white sm:text-4xl md:text-5xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          ))}
        </motion.span>
        {subheading && (
          <span className="relative z-10 mt-1 block text-sm text-neutral-500 transition-colors duration-500 group-hover:text-neutral-400">
            {subheading}
          </span>
        )}
      </div>

      {imgSrc && (
        <motion.img
          style={{
            top,
            left,
            translateX: "-50%",
            translateY: "-50%",
          }}
          variants={{
            initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
            whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
          }}
          transition={{ type: "spring" }}
          src={imgSrc}
          className="pointer-events-none absolute z-0 h-24 w-36 rounded-xl object-cover shadow-2xl md:h-40 md:w-56"
          alt={heading}
        />
      )}

      <motion.div
        variants={{
          initial: { x: "25%", opacity: 0 },
          whileHover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <ArrowUpRight className="text-3xl text-neutral-100 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.div>
    </motion.a>
  );
};

export interface HoverImageLinksProps {
  links?: HoverImageLinkItem[];
  className?: string;
}

export const HoverImageLinks: React.FC<HoverImageLinksProps> = ({
  links = [
    {
      heading: "Dave Holloway Showcase",
      subheading: "WebGL Pixel Distortion Experience",
      imgSrc: "/Id.jpg",
      href: "#work",
    },
    {
      heading: "3D Verlet Lanyard",
      subheading: "Interactive physics & Three.js",
      imgSrc: "/Id.jpg",
      href: "#",
    },
    {
      heading: "Swiss Motion Typography",
      subheading: "Design × Code × Motion",
      imgSrc: "/Id.jpg",
      href: "#contact",
    },
  ],
  className = "",
}) => {
  return (
    <section className={`w-full max-w-5xl px-4 py-8 mx-auto ${className}`}>
      {links.map((link, idx) => (
        <HoverImageLink key={link.heading || idx} {...link} />
      ))}
    </section>
  );
};

export default HoverImageLinks;

