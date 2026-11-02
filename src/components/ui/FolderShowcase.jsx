import React from "react";
import IconFolder from "./icon-folder";

/* ------------------------------------------------------------- */
/*  Developer Icons (Official User PNGs from public/logos/)       */
/* ------------------------------------------------------------- */
const developerIcons = [
  {
    src: "/logos/react.png",
    label: "React",
    background: "#0b0e14",
    imgStyle: { transform: "scale(1.22)", objectFit: "cover" },
  },
  {
    src: "/logos/typescript.png",
    label: "TypeScript",
    background: "#007acc",
  },
  {
    src: "/logos/nodejs.png",
    label: "Node.js",
    background: "#022c22",
  },
  {
    label: "Three.js",
    background: "#09090b",
    node: (
      <svg viewBox="0 0 100 100" width="62%" height="62%" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="14,16 86,16 50,86" />
        <line x1="23" y1="33.5" x2="77" y2="33.5" />
        <line x1="32" y1="51" x2="68" y2="51" />
        <line x1="41" y1="68.5" x2="59" y2="68.5" />
        <line x1="32" y1="16" x2="23" y2="33.5" />
        <line x1="50" y1="16" x2="32" y2="51" />
        <line x1="68" y1="16" x2="41" y2="68.5" />
        <line x1="86" y1="16" x2="50" y2="86" />
        <line x1="77" y1="33.5" x2="59" y2="68.5" />
        <line x1="68" y1="51" x2="50" y2="86" />
        <line x1="68" y1="16" x2="77" y2="33.5" />
        <line x1="50" y1="16" x2="68" y2="51" />
        <line x1="32" y1="16" x2="59" y2="68.5" />
        <line x1="14" y1="16" x2="50" y2="86" />
        <line x1="23" y1="33.5" x2="41" y2="68.5" />
        <line x1="32" y1="51" x2="50" y2="86" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------- */
/*  Design Tools Icons (Official User PNGs from public/logos/)    */
/* ------------------------------------------------------------- */
const designIcons = [
  {
    src: "/logos/ps.png",
    label: "Photoshop",
    background: "#001e36",
  },
  {
    src: "/logos/AI.png",
    label: "Illustrator",
    background: "#330000",
  },
  {
    src: "/logos/ae.png",
    label: "After Effects",
    background: "#00005b",
  },
  {
    src: "/logos/pr.png",
    label: "Premiere Pro",
    background: "#00005b",
  },
];

export default function FolderShowcase() {
  return (
    <section
      className="folders-section relative py-24 px-4 md:px-8 border-t border-neutral-900 bg-black/60 overflow-hidden"
      id="toolkit"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(56,189,248,0.06),transparent)]" />

      <div
        style={{
          width: '100%',
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '680px' }}>
          <div className="section-tag" style={{ justifyContent: 'center', display: 'flex', marginBottom: '0.75rem' }}>
            <span>02. TOOLKIT &amp; EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Curated Capabilities.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 auto', lineHeight: '1.6' }}>
            Explore the specialized environments and production tools powering every engineering, design, and motion project. Hover or tap each folder to open.
          </p>
        </div>

        {/* Responsive Grid with 2 Centered Icon Folders */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '3rem',
            width: '100%',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          {/* 1. Developer Folder */}
          <div style={{ display: 'flex', justifyContent: 'center', minWidth: '320px', flex: '1 1 380px', maxWidth: '410px' }}>
            <IconFolder
              title="Developer"
              badge="Tech Stack"
              tags={["React", "TypeScript", "Node.js", "Three.js"]}
              icons={developerIcons}
              spread={66}
              theme="dark"
            />
          </div>

          {/* 2. Design Tools Folder */}
          <div style={{ display: 'flex', justifyContent: 'center', minWidth: '320px', flex: '1 1 380px', maxWidth: '410px' }}>
            <IconFolder
              title="Design Tools"
              badge="UI & Motion"
              tags={["Photoshop", "Illustrator", "After Effects", "Premiere Pro"]}
              icons={designIcons}
              spread={66}
              theme="dark"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
