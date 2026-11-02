"use client";

import React, { useState, useEffect, useRef, useId } from "react";

/* ------------------------------------------------------------------ */
/*  Icon Folder — by Roman Vasnev (@romanvasnev / vasnev.art)         */
/*  A glassmorphism folder with tool icons fanned out on hover/tap.  */
/*  Dual-theme support, SVG path tabs, glass front pocket & tooltips. */
/* ------------------------------------------------------------------ */

const THEMES = {
  dark: {
    ink: "#ffffff",
    chipBg: "rgba(255,255,255,.05)",
    chipBorder: "rgba(255,255,255,.12)",
    chipInk: "#9f9f9f",
    back: "linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01) 60%)",
    backEdge: "rgba(255,255,255,.1)",
    front: "linear-gradient(160deg,rgba(255,255,255,.10),rgba(255,255,255,.02) 55%),rgba(10,12,16,.85)",
    frontEdge: ["rgba(255,255,255,.45)", "rgba(56,189,248,.35)", "rgba(255,255,255,0)"],
    glow: "rgba(56,189,248,.14)",
    pillBg: "rgba(0,0,0,.7)",
    pillBorder: "rgba(255,255,255,.12)",
    tileRing: "rgba(255,255,255,.16)",
    tileShadow: "rgba(0,0,0,.6)",
    focus: "#38bdf8",
  },
  light: {
    ink: "#111111",
    chipBg: "rgba(255,255,255,.7)",
    chipBorder: "#e2e2e2",
    chipInk: "#6b6b6b",
    back: "linear-gradient(180deg,rgba(0,0,0,.05),rgba(0,0,0,.015) 60%)",
    backEdge: "rgba(0,0,0,.08)",
    front: "linear-gradient(160deg,rgba(255,255,255,.95),rgba(255,255,255,.55) 55%),rgba(240,240,238,.7)",
    frontEdge: ["rgba(255,255,255,1)", "rgba(0,0,0,.06)", "rgba(0,0,0,.04)"],
    glow: "rgba(60,44,255,.10)",
    pillBg: "rgba(255,255,255,.8)",
    pillBorder: "rgba(0,0,0,.08)",
    tileRing: "rgba(0,0,0,.08)",
    tileShadow: "rgba(0,0,0,.18)",
    focus: "rgba(0,0,0,.35)",
  },
};

/* Folder tab outlines: front pocket has its tab on left, back plate on right */
const pathL = (w, h, r, d, tw, s) =>
  `M0 ${r}A${r} ${r} 0 0 1 ${r} 0L${tw} 0C${tw + s * 0.55} 0 ${tw + s * 0.45} ${d} ${tw + s} ${d}L${w - r} ${d}A${r} ${r} 0 0 1 ${w} ${d + r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;

const pathR = (w, h, r, d, tw, s) => {
  const x = w - tw;
  return `M0 ${d + r}A${r} ${r} 0 0 1 ${r} ${d}L${x - s} ${d}C${x - s * 0.45} ${d} ${x - s * 0.55} 0 ${x} 0L${w - r} 0A${r} ${r} 0 0 1 ${w} ${r}L${w} ${h - r}A${r} ${r} 0 0 1 ${w - r} ${h}L${r} ${h}A${r} ${r} 0 0 1 0 ${h - r}Z`;
};

function useShape(ref, make) {
  const [d, setD] = useState("");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setD(make(el.offsetWidth, el.offsetHeight));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, make]);
  return d;
}

function Tile({ icon, ring, shadow }) {
  return (
    <div
      className="grid h-full w-full place-items-center overflow-hidden rounded-[inherit]"
      style={{
        background: icon.background ?? (icon.src ? "#141416" : "#2a2a2a"),
        boxShadow: `0 18px 40px ${shadow}, 0 0 0 1px ${ring}`,
      }}
    >
      {icon.src ? (
        <img
          src={icon.src}
          alt={icon.label || ""}
          draggable={false}
          className="h-full w-full object-contain"
          style={icon.imgStyle}
        />
      ) : (
        icon.node
      )}
    </div>
  );
}

export function IconFolder({
  title = "Design",
  tags = ["Figma", "After Effects", "Photoshop", "Blender"],
  icons = [],
  theme = "dark",
  defaultOpen = false,
  spread = 68,
  showPill = true,
  className = "",
  badge = "",
}) {
  const t = THEMES[theme] || THEMES.dark;
  const gid = useId().replace(/:/g, "");

  const rootRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [shown, setShown] = useState(true);
  const [open, setOpen] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const [hi, setHi] = useState(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setOpen(defaultOpen), [defaultOpen]);
  useEffect(() => {
    setReduced(
      typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frontD = useShape(frontRef, (w, h) =>
    pathL(w, h, 22, 22, Math.round(w * 0.42), 44)
  );
  const backD = useShape(backRef, (w, h) =>
    pathR(w, h, 22, 22, Math.round(w * 0.4), 44)
  );

  const n = icons.length;
  const rs = n > 1 ? 24 / (n - 1) : 0; // tilt angle step
  const wide = open || hover;
  const lift = wide;
  const ease = "cubic-bezier(.2,.8,.2,1)";
  const toggle = () => setOpen((o) => !o);

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={`${title}: ${tags.join(", ")}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => {
        setHover(false);
        setHi(null);
      }}
      className={`relative isolate h-[290px] w-full max-w-[410px] cursor-pointer select-none outline-none [-webkit-tap-highlight-color:transparent] focus-visible:rounded-3xl focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 ${className}`}
      style={{
        color: t.ink,
        fontFamily: "'Space Grotesk', 'Geist', system-ui, sans-serif",
        outlineColor: t.focus,
        zIndex: lift ? 10 : 1,
        opacity: shown || reduced ? 1 : 0,
        transform:
          shown || reduced
            ? lift
              ? "translateY(-6px) scale(1.02)"
              : "none"
            : "translateY(32px) scale(.94)",
        transition: reduced ? "none" : `transform .85s ${ease}, opacity .6s ease`,
      }}
    >
      {/* Soft neon glow behind folder */}
      <div
        className="pointer-events-none absolute left-[8%] right-[8%] top-10 -z-10 h-[190px] rounded-full opacity-80 blur-[24px]"
        style={{ background: `radial-gradient(closest-side, ${t.glow}, transparent)` }}
      />

      {/* Back Plate with SVG Tab */}
      <div
        ref={backRef}
        className="absolute inset-x-0 bottom-0 top-[14px]"
        style={{
          background: t.back,
          clipPath: backD ? `path('${backD}')` : undefined,
        }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <path d={backD} fill="none" stroke={t.backEdge} strokeWidth="1.5" />
        </svg>
      </div>

      {/* Fanned Icons Array */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {icons.map((icon, i) => {
          const k = i - (n - 1) / 2;
          const gap = wide ? spread * 1.16 : spread;
          const y = k * k * 8.5 - (wide ? 6 : 0);
          const rot = k * rs * (wide ? 1.25 : 1);
          return (
            <div
              key={i}
              className="absolute left-1/2 top-[40px] -ml-[48px] h-[96px] w-[96px] rounded-[24px] [backface-visibility:hidden]"
              style={{
                zIndex: hi === i ? 25 : undefined,
                opacity: shown || reduced ? 1 : 0,
                transform:
                  shown || reduced
                    ? `translate3d(${k * gap}px, ${y}px, 0) rotate(${rot}deg)`
                    : `translate3d(${k * spread * 0.5}px, 80px, 0)`,
                transition: reduced
                  ? "none"
                  : `transform ${wide ? 0.55 : 0.85}s ${ease}, opacity .5s`,
                transitionDelay: reduced ? "0s" : wide ? `${i * 0.035}s` : `${0.3 + i * 0.07}s`,
              }}
            >
              <div
                className="pointer-events-auto relative h-full w-full rounded-[inherit]"
                onPointerEnter={(e) => e.pointerType === "mouse" && setHi(i)}
                onPointerLeave={() => setHi((h) => (h === i ? null : h))}
                style={{
                  transform:
                    hi === i
                      ? `translateY(-26px) rotate(${-rot}deg) scale(1.12)`
                      : hi !== null
                      ? "scale(.95)"
                      : "none",
                  filter:
                    hi !== null && hi !== i ? "saturate(.7) brightness(.82)" : "none",
                  transition: reduced ? "none" : `transform .4s ${ease}, filter .3s ease`,
                }}
              >
                <Tile icon={icon} ring={t.tileRing} shadow={t.tileShadow} />

                {/* Floating Micro Tooltip */}
                {icon.label && (
                  <span
                    className="pointer-events-none absolute bottom-full left-1/2 mb-2 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-mono font-medium tracking-wide leading-4 backdrop-blur-md"
                    style={{
                      background: t.pillBg,
                      borderColor: hi === i ? t.focus : t.pillBorder,
                      color: hi === i ? "#ffffff" : t.ink,
                      opacity: hi === i ? 1 : 0,
                      transform: `translateX(-50%) translateY(${hi === i ? 0 : 6}px)`,
                      boxShadow: hi === i ? `0 4px 16px rgba(56,189,248,.25)` : undefined,
                      transition: reduced
                        ? "none"
                        : `opacity .22s ease, transform .3s ${ease}`,
                    }}
                  >
                    {icon.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Glass Front Pocket */}
      <div
        ref={frontRef}
        className="absolute inset-x-0 bottom-0 h-[180px] overflow-hidden backdrop-blur-xl backdrop-saturate-150"
        style={{
          background: t.front,
          clipPath: frontD ? `path('${frontD}')` : undefined,
          transform: lift ? "translateY(5px)" : "none",
          transition: reduced ? "none" : `transform .55s ${ease}`,
        }}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`edge-${gid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={t.frontEdge[0]} />
              <stop offset=".4" stopColor={t.frontEdge[1]} />
              <stop offset="1" stopColor={t.frontEdge[2]} />
            </linearGradient>
          </defs>
          <path d={frontD} fill="none" stroke={`url(#edge-${gid})`} strokeWidth="1.5" />
        </svg>

        {/* Header & Category Badge */}
        <div style={{ padding: '38px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: '#ffffff' }}>
            {title}
          </h3>
          {badge && (
            <span
              style={{
                fontSize: '10px',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '9999px',
                border: '1px solid rgba(56,189,248,0.3)',
                color: '#38bdf8',
                backgroundColor: 'rgba(8,47,73,0.4)',
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Interactive Chip Tags */}
        <div style={{ margin: '12px 18px 0', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {tags.map((tag) => {
            const isMatch = hi !== null && icons[hi]?.label === tag;
            return (
              <span
                key={tag}
                style={{
                  height: '24px',
                  whiteSpace: 'nowrap',
                  borderRadius: '9999px',
                  border: `1px solid ${isMatch ? t.focus : t.chipBorder}`,
                  padding: '2px 8px',
                  fontSize: '10.5px',
                  fontFamily: 'monospace',
                  lineHeight: '18px',
                  backdropFilter: 'blur(4px)',
                  background: isMatch ? "rgba(56,189,248,.18)" : t.chipBg,
                  color: isMatch ? "#ffffff" : t.chipInk,
                  boxShadow: isMatch ? "0 0 12px rgba(56,189,248,.3)" : undefined,
                  transition: "all .25s ease",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Small Icon Pill Preview in Bottom-Right Corner */}
        {showPill && (
          <span
            className="absolute bottom-3.5 right-4 flex h-[32px] items-center gap-1.5 rounded-full border px-2 backdrop-blur-md"
            style={{ background: t.pillBg, borderColor: t.pillBorder }}
            aria-hidden="true"
          >
            {icons.map((icon, i) => (
              <span key={i} className="block h-[20px] w-[20px] overflow-hidden rounded-[6px]">
                <span
                  className="grid h-full w-full place-items-center [&_svg]:h-[65%] [&_svg]:w-[65%]"
                  style={{ background: icon.background ?? (icon.src ? "#141416" : undefined) }}
                >
                  {icon.src ? (
                    <img
                      src={icon.src}
                      alt=""
                      className="h-full w-full object-contain p-0.5"
                      style={icon.imgStyle ? { filter: icon.imgStyle.filter } : undefined}
                    />
                  ) : (
                    icon.node
                  )}
                </span>
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}

export default IconFolder;
